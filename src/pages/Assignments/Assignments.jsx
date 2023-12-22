import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Assignments = () => {
  const { data } = useLoaderData();
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    // Get the data according to the difficulty
    console.log(difficulty);
  }, [difficulty]);

  return (
    <div className="max-w-7xl mx-auto my-20 px-10 lg:px-0 space-y-8">
      <div className="flex justify-end">
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          className="input input-bordered w-32"
        >
          <option value="">Select</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((assignment) => (
          <div className="card bg-base-100 shadow-xl">
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
                <div className="badge badge-sm badge-secondary capitalize">
                  {assignment.difficulty}
                </div>
                <div className="badge badge-sm badge-success text-white capitalize">
                  {assignment.status}
                </div>
              </h2>
              <p>{assignment.description}</p>
              <div className="card-actions my-5">
                <Link to={`/assignment/${assignment._id}`}>
                  <button className="btn btn-sm btn-secondary text-white hover:bg-black">
                    View
                  </button>
                </Link>
                <Link to={`/update/${assignment._id}`}>
                  <button className="btn btn-sm bg-primary text-white hover:bg-black">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
