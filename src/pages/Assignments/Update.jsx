import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { motion } from "framer-motion";

const Update = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [selectedDiff, setSelectedDiff] = useState("");

  const notifyError = (msg) => {
    toast.error(msg);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/assignment/${id}?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data?.success) {
          setAssignment(res.data?.assignment);
          setStartDate(new Date(res.data?.assignment?.due));
          setSelectedDiff(res.data?.assignment?.difficulty);
        } else {
          notifyError("Assignment Not Found!");
          navigate("/assignments");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateAssignment = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const photo = form.photo.value;
    const marks = form.marks.value;
    const difficulty = form.difficulty.value;
    const description = form.description.value;
    const due = form.date.value;

    setError("");

    if (!title) {
      setError("Please provide your title!");
      return;
    }
    if (!photo) {
      setError("Please provide photo URL!");
      return;
    }
    if (!marks) {
      setError("Please provide your marks!");
      return;
    }
    if (!difficulty) {
      setError("Please provide your difficulty!");
      return;
    }
    if (!description) {
      setError("Please provide your description!");
      return;
    }
    if (!due) {
      setError("Please provide a due date!");
      return;
    }

    if (!error) {
      // update the assignment
      axios
        .put(
          `http://localhost:8000/update/${id}?email=${user.email}`,
          {
            title,
            photo,
            marks,
            difficulty,
            due,
            description,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            notifySuccess("Updated Successfully!");
            navigate("/assignments");
          } else {
            notifyError("You didn't modify anything!");
          }
          // if (res.data) {
          //   notifySuccess("Assignment Created Successfully!");
          //   setTimeout(() => navigate("/assignments", 1000));
          // }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="px-10 lg:px-0 hero min-h-screen bg-base-100"
    >
      <div className="card shrink-0 w-full max-w-2xl mx-auto shadow-2xl bg-base-100 my-20 md:my-10">
        <h3 className="font-bold text-2xl text-center mt-5 text-primary">
          Update Assignment
        </h3>
        <form className="card-body" onSubmit={handleUpdateAssignment}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="title"
                className="input input-bordered"
                defaultValue={assignment.title}
                //   required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <input
                name="photo"
                type="url"
                placeholder="Enter photo url"
                className="input input-bordered"
                defaultValue={assignment.photo}
                //   required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Marks</span>
              </label>
              <input
                name="marks"
                type="number"
                placeholder="marks"
                className="input input-bordered"
                defaultValue={assignment.marks}
                //   required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Difficulty</span>
              </label>
              <select
                name="difficulty"
                className="px-4 py-3 form-control input input-bordered"
                value={selectedDiff}
                onChange={(e) => setSelectedDiff(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Date</span>
            </label>
            <DatePicker
              name="date"
              className="input input-bordered w-full"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              defaultValue={assignment.due}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered textarea-lg"
              defaultValue={assignment.description}
            ></textarea>
          </div>

          {error && <p className="text-error mt-3">{error}</p>}

          <div className="form-control mt-3">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-black"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Toaster />
      <ScrollRestoration />
    </motion.div>
  );
};
export default Update;
