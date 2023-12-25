import { Link } from "react-router-dom";
import image1 from "/1.avif";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const { user, loading } = useAuthContext();
  useEffect(() => {
    axios
      .get("http://localhost:8000/featured")
      .then((res) => {
        if (res.data) {
          setFeatured(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(featured);

  return (
    <div className="max-w-7xl mx-auto px-10 lg:px-0">
      {/* Banner or Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 my-10 md:my-20">
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="font-bold text-5xl leading-snug">
            Submit Assignment
            <br /> And Get Evaluation <br /> From Expert.
          </h1>
          <p className="text-pretty text-gray-500">
            Welcome to our Assignment Portal - Bridging Knowledge and Expertise!
            <br />
            Explore a seamless platform where students can submit their
            assignments, and our team of experts is ready to provide insightful
            evaluations.
          </p>
          <Link className="block" to={"/assignments"}>
            <button className="btn btn-outline border-primary text-primary">
              Visit Assignments
            </button>
          </Link>
        </div>
        <div>
          <img className="w-full" src={image1} alt="" />
        </div>
      </div>

      {/* Featured Section */}
      <div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-extrabold text-2xl text-primary uppercase">
            Featured
          </h1>
          <hr className="border border-b-4 border-primary rounded-lg w-24" />
        </div>

        {loading && <Loader />}
        <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((assignment) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to={"/assignments"}>
            <button className="btn btn-outline border-primary text-primary">
              Browse More
            </button>
          </Link>
        </div>
      </div>
      {/* Faq section */}
      <div className="my-20">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-extrabold text-2xl text-primary uppercase">
            FAQ
          </h1>
          <hr className="border border-b-4 border-primary rounded-lg w-24" />
        </div>
      </div>
    </div>
  );
};

export default Home;
