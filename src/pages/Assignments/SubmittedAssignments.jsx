import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoMdCloseCircle } from "react-icons/io";

const SubmittedAssignments = () => {
  const { user, loading } = useAuthContext();
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/submitted?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setAssignments(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleMarking = (submittedBy, id) => {
    if (submittedBy === user?.email) {
      notifyError("Grading thyself is a crime!");
      return;
    } else {
      document.getElementById(id).showModal();
    }
  };

  const handleMarkSubmission = (e, id, marks) => {
    e.preventDefault();

    setError("");

    const form = e.target;
    const givenMark = form.marks.value;
    const gradedBy = user?.email;
    const feedback = form.feedback.value;

    console.log(givenMark > marks);

    if (parseInt(givenMark) > parseInt(marks)) {
      setError("Marking should be out of 100");
      return;
    }

    axios
      .patch(
        `http://localhost:8000/mark/${id}?email=${user?.email}`,
        {
          givenMark,
          feedback,
          gradedBy,
          status: "completed",
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          notifySuccess("Graded Successfully!");
          return navigate("/assignments");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-10 lg:px-0 space-y-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-extrabold text-2xl text-primary uppercase">
          Submitted Assignments
        </h1>
        <hr className="border border-b-4 border-primary rounded-lg w-24" />
      </div>
      {assignments.length === 0 && (
        <div className="flex justify-center items-center">
          <p className="mt-24">No Assignments Available!</p>
        </div>
      )}
      {loading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="card bg-base-100 shadow-xl">
            <div className="card-body space-y-1">
              <h2 className="card-title">{assignment.title}</h2>
              <div className="flex gap-1 flex-wrap">
                <div className="badge badge-sm badge-success text-white capitalize">
                  {assignment.status}
                </div>
                <div className="badge badge-sm badge-warning text-white capitalize font-bold">
                  Marks: {assignment.marks}
                </div>
                <div className="badge badge-sm badge-accent text-white capitalize">
                  Examinee: {assignment.examinee}
                </div>
              </div>

              <div className="card-actions">
                <button
                  onClick={() =>
                    handleMarking(assignment.submittedBy, assignment._id)
                  }
                  type="button"
                  className="mt-2 btn btn-sm btn-primary text-white hover:bg-black"
                >
                  Give Marks
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
                  <div className="card-body pb-0">
                    <Link
                      className="text-primary font-semibold"
                      to={assignment.pdf}
                      target="_blank"
                    >
                      Click here to see the submission of pdf.
                    </Link>
                    <p>
                      <span className="text-primary font-bold">Note:</span> "
                      {assignment.note}"
                    </p>
                  </div>
                  <form
                    className="card-body"
                    onSubmit={(e) =>
                      handleMarkSubmission(e, assignment._id, assignment.marks)
                    }
                  >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Marks</span>
                      </label>
                      <input
                        name="marks"
                        type="number"
                        min={0}
                        placeholder={`Enter Marks(out of ${assignment.marks})`}
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Feedback</span>
                      </label>
                      <textarea
                        name="feedback"
                        className="textarea textarea-bordered textarea-md"
                        placeholder="Feedback"
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
          </div>
        ))}
      </div>
      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default SubmittedAssignments;
