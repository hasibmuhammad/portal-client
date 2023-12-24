import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { ScrollRestoration, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [assignment, setAssignment] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/assignment/${id}?email=${user.email}`, {
        withCredentials: true,
      })
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

    console.log(pdf, note);
  };

  return (
    <div className="max-w-7xl mx-auto px-10 lg:px-0 my-20">
      <div className="flex flex-col md:flex-row gap-10 justify-around">
        <div className="w-full lg:w-2/3 mt-10 rounded-md">
          <img
            className="w-full h-96 object-cover rounded-md"
            src={assignment.photo}
            alt=""
          />
        </div>
        <div className="mt-10 space-y-7">
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
        </div>

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
      <ScrollRestoration />
    </div>
  );
};

export default Details;
