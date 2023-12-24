import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { ScrollRestoration, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [assignment, setAssignment] = useState([]);

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

  console.log(assignment);
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
          <button className="btn btn-outline">Take Assignment</button>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Details;
