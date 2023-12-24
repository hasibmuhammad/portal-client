import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";
import { ScrollRestoration } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const MyAssignments = () => {
  const { user, loading } = useAuthContext();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/myassignments?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setAssignments(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-20 px-10 lg:px-0 space-y-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-extrabold text-2xl text-primary uppercase">
          My Assignments
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
                <div className="badge badge-sm badge-primary font-bold text-white capitalize">
                  {assignment.status}
                </div>
                <div className="badge badge-sm badge-accent font-bold text-white capitalize">
                  Marks: {assignment.marks}
                </div>
                {/* <div className="badge badge-sm badge-info font-bold text-white">
                  Graded By: {assignment?.gradedBy}
                </div> */}
              </div>
              {assignment.status === "completed" && (
                <div className="space-y-2">
                  <p>
                    <span className="text-primary font-semibold">
                      Feedback:{" "}
                    </span>
                    {assignment?.feedback}
                  </p>
                  <p>
                    <span className="text-primary font-semibold">
                      You Got:{" "}
                    </span>
                    {assignment?.givenMark}/{assignment.marks}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default MyAssignments;
