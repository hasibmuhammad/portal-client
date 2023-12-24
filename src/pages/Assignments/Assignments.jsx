import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Assignments = () => {
  const { data } = useLoaderData();

  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const pages = [...Array(totalPage).keys()];

  useEffect(() => {
    // Get the data according to the difficulty, currentpage and itemsperpage
    axios
      .get(
        `http://localhost:8000/assignmentsbydifficulty?difficulty=${difficulty}&page=${currentPage}&size=${itemsPerPage}`
      )
      .then((res) => {
        setAssignments(res.data);

        window.scrollTo(0, 100);
      })
      .catch((error) => console.log(error));
  }, [difficulty, currentPage, itemsPerPage]);

  // Get the data according to only difficulty
  useEffect(() => {
    setCurrentPage(0);

    if (difficulty === "") {
      setTotalPage(Math.ceil(data.length / itemsPerPage));
    } else {
      axios
        .get(`http://localhost:8000/assignmentbydiff?difficulty=${difficulty}`)
        .then((res) => {
          setTotalPage(Math.ceil(res.data.length / itemsPerPage));
        })
        .catch((error) => console.log(error));
    }
  }, [difficulty, itemsPerPage]);

  const notifyError = (msg) => {
    toast.error(msg);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/delete/${id}?email=${user?.email}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Assignment deleted successfully!",
                icon: "success",
              });

              // For UI update after deleting
              setAssignments(assignments.filter((ass) => ass._id !== id));
            } else {
              Swal.fire({
                title: "Not Deleted!",
                text: "Assignment wasn't deleted!",
                icon: "error",
              });
            }
          });
      } else {
        Swal.fire({
          title: "Not Deleted!",
          text: "Assignment wasn't deleted!",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-10 lg:px-0 space-y-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-extrabold text-2xl text-primary uppercase">
          Assignments
        </h1>
        <hr className="border border-b-4 border-primary rounded-lg w-24" />
      </div>
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
                className="w-full h-52 object-cover"
                src={assignment.photo}
                alt={assignment.title}
              />
            </figure>
            <div className="card-body space-y-1">
              <h2 className="card-title">{assignment.title}</h2>
              <div className="flex gap-1 flex-wrap">
                <div className="badge badge-sm badge-secondary capitalize">
                  {assignment.difficulty}
                </div>
                <div className="badge badge-sm badge-success text-white capitalize">
                  {assignment.status}
                </div>
              </div>
              <p>{assignment.description.slice(0, 80)}...</p>

              <div className="flex flex-col gap-1">
                <small className="badge  badge-outline text-primary">
                  Due: {assignment.due}
                </small>
                {user && (
                  <small className="badge  badge-outline text-primary">
                    Author:{" "}
                    {assignment.createdBy === user?.email ? "You" : "Other"}
                  </small>
                )}
              </div>

              <div className="card-actions my-5">
                <Link to={`/assignment/${assignment._id}`}>
                  <button className="btn btn-sm btn-outline border border-primary text-primary">
                    View
                  </button>
                </Link>
                {user && user?.email === assignment.createdBy && (
                  <Link to={`/update/${assignment._id}`}>
                    <button
                      type="button"
                      className="btn btn-sm bg-primary text-white hover:bg-black"
                    >
                      Update
                    </button>
                  </Link>
                )}
                {user && user?.email === assignment.createdBy && (
                  <button
                    onClick={() => handleDelete(assignment._id)}
                    type="button"
                    className="btn btn-sm btn-error border-none text-white hover:bg-black"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="text-center">
        <div className="join">
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`join-item btn ${
                currentPage === page ? "bg-primary text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        {assignments.length !== 0 && (
          <select
            onChange={(e) => {
              setItemsPerPage(e.target.value);
              setCurrentPage(0);
            }}
            className=" py-3 rounded-md outline-none"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        )}
      </div>

      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default Assignments;
