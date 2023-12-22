import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateAssignment = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleCreateAssignment = (e) => {
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
      // create the assignment
      axios
        .post(
          `http://localhost:8000/create?email=${user.email}`,
          {
            title,
            photo,
            marks,
            difficulty,
            due,
            description,
            status: "pending",
            createdBy: user.email,
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="px-10 lg:px-0 hero min-h-screen bg-base-100">
      <div className="card shrink-0 w-full max-w-2xl mx-auto shadow-2xl bg-base-100 my-20 md:my-10">
        <h3 className="font-bold text-2xl text-center mt-5 text-primary">
          Create Assignment
        </h3>
        <form className="card-body" onSubmit={handleCreateAssignment}>
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
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered textarea-lg"
            ></textarea>
          </div>

          {error && <p className="text-error mt-3">{error}</p>}

          <div className="form-control mt-3">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-black"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateAssignment;
