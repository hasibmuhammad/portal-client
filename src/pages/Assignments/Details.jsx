import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [assignment, setAssignment] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    axios
      .get(
        `https://assignment-portal-backend.vercel.app/assignment/${id}?email=${user.email}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          setAssignment(res.data.assignment);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmitAssignment = (e) => {
    e.preventDefault();

    const form = e.target;
    const pdf = form.pdf.value;
    const note = form.note.value;

    if (!pdf) {
      setError("You must provide pdf url!");
      return;
    }
    if (!note) {
      setError("You must provide note!");
      return;
    }

    if (!error) {
      const submittedBy = user?.email;
      const title = assignment.title;
      const marks = assignment.marks;
      const status = assignment.status;
      const examinee = user?.displayName;

      // Create submitted assignment
      axios
        .post(
          `https://assignment-portal-backend.vercel.app/createSubmitted?email=${user?.email}`,
          {
            title,
            marks,
            status,
            examinee,
            submittedBy,
            pdf,
            note,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.insertedId) {
            notifySuccess("Submitted Successfully!");
            navigate("/submitted");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-10 lg:px-0 my-20">
      <div className="flex flex-col md:flex-row gap-10 justify-around">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-2/3 mt-10 rounded-md"
        >
          <img
            className="w-full h-96 object-cover rounded-md"
            src={assignment.photo}
            alt=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-10 space-y-7"
        >
          <h1 className="font-extrabold text-5xl">{assignment.title}</h1>
          <p>{assignment.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="badge badge-lg badge-secondary capitalize">
              {assignment.difficulty}
            </div>
            <div className="badge badge-lg badge-success capitalize text-white">
              {assignment.status}
            </div>
            <div className="badge badge-lg badge-accent capitalize text-white">
              Due - {assignment.due}
            </div>
            <div className="badge badge-outline">
              Author: {user?.email === assignment.createdBy ? "You" : "Other"}
            </div>
          </div>
          <h4 className="font-bold ">Marks: {assignment.marks}</h4>
          <button
            onClick={() => document.getElementById(assignment._id).showModal()}
            className="btn btn-outline"
          >
            Take Assignment
          </button>
        </motion.div>

        {/* Modal */}
        <dialog
          id={assignment._id}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="flex justify-end">
              <form method="dialog">
                <button>
                  <IoMdCloseCircle
                    className="text-3xl text-error"
                    type="button"
                  />
                </button>
              </form>
            </div>
            <form className="card-body" onSubmit={handleSubmitAssignment}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PDF URL</span>
                </label>
                <input
                  name="pdf"
                  type="url"
                  placeholder="pdf url"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Note</span>
                </label>
                <textarea
                  name="note"
                  className="textarea textarea-bordered textarea-md"
                  placeholder="Special Note"
                  required
                ></textarea>
              </div>
              {error && (
                <div>
                  <p className="text-error">{error}</p>
                </div>
              )}
              <div className="form-control mt-3">
                <button
                  type="submit"
                  className="btn bg-primary text-white hover:bg-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default Details;
