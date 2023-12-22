import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader";

const Assignments = () => {
  const { data } = useLoaderData();
  const [assignments, setAssignments] = useState(data);
  const [difficulty, setDifficulty] = useState("");
  const { user, loading } = useAuthContext();

  useEffect(() => {
    // Get the data according to the difficulty
    axios
      .get(
        `http://localhost:8000/assignmentsbydifficulty?difficulty=${difficulty}`
      )
      .then((res) => {
        if (difficulty !== "") {
          setAssignments(res.data);
        }
        if (difficulty === "") {
          setAssignments(data);
        }
      })
      .catch((error) => console.log(error));
  }, [difficulty]);

  return (
    <div className="max-w-7xl mx-auto my-20 px-10 lg:px-0 space-y-8">
      <div className="flex md:justify-end">
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          className="input input-bordered w-full md:w-32"
        >
          <option value="">Select</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
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
            <figure>
              <img
                className="w-full h-64 object-cover"
                src={assignment.photo}
                alt={assignment.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {assignment.title}
                <div className="flex gap-1 flex-wrap">
                  <div className="badge badge-sm badge-secondary capitalize">
                    {assignment.difficulty}
                  </div>
                  <div className="badge badge-sm badge-success text-white capitalize">
                    {assignment.status}
                  </div>
                </div>
              </h2>
              <p>{assignment.description}</p>

              <div>
                <small className="font-semibold">Due: {assignment.due}</small>
              </div>

              <div className="card-actions my-5">
                <Link to={`/assignment/${assignment._id}`}>
                  <button className="btn btn-sm btn-outline border border-primary text-primary">
                    View
                  </button>
                </Link>
                {
                  <Link to={`/update/${assignment._id}`}>
                    <button className="btn btn-sm bg-primary text-white hover:bg-black">
                      Update
                    </button>
                  </Link>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
