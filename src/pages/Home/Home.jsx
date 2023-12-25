import { Link } from "react-router-dom";
import image1 from "/1.avif";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
const Home = () => {
  const [featured, setFeatured] = useState([]);
  const { user, loading } = useAuthContext();
  useEffect(() => {
    axios
      .get("https://assignment-portal-backend.vercel.app/featured")
      .then((res) => {
        if (res.data) {
          setFeatured(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-10 lg:px-0 place-content-center">
      {/* Banner or Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 my-10 md:my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 space-y-4"
        >
          <h1 className="font-bold text-5xl leading-snug">
            Submit <span className="text-primary">Assignment</span>
            <br /> And Get Evaluation <br /> From{" "}
            <span className="text-primary underline">Expert.</span>
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img className="w-full" src={image1} alt="" />
        </motion.div>
      </div>

      {/* Featured Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="font-extrabold text-2xl text-primary uppercase">
            Featured
          </h1>
          <hr className="border border-b-4 border-primary rounded-lg w-24" />
        </motion.div>

        {loading && <Loader />}
        <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((assignment) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={assignment._id}
              className="card bg-base-100 shadow-xl"
            >
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
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to={"/assignments"}>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="btn btn-outline border-primary text-primary"
            >
              Browse More
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 mb-20"
        >
          <h1 className="font-extrabold text-2xl text-primary uppercase">
            Feedback
          </h1>
          <hr className="border border-b-4 border-primary rounded-lg w-24" />
        </motion.div>
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-md border "
          >
            <p className="italic text-gray-500">
              <span className="text-5xl">"</span>The assignment portal provided
              a seamless experience. Timely feedback from experts enhanced my
              understanding, making it a valuable tool for academic growth.
            </p>
            <br />
            <p className="italic text-gray-500">-Maria Kate, Photographer</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-md border "
          >
            <p className="italic text-gray-500">
              <span className="text-5xl">"</span>The platform's efficiency and
              expert feedback significantly contributed to my learning. It's a
              valuable resource for students seeking improvement.
            </p>
            <br />
            <p className="italic text-gray-500">-John Doe, Web Developer</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-md border "
          >
            <p className="italic text-gray-500">
              <span className="text-5xl">"</span>The assignment portal's
              personalized feedback and collaborative environment positively
              impacted my academic performance. Highly recommended!
            </p>
            <br />
            <p className="italic text-gray-500">-Anna Deynah, UX Designer</p>
          </motion.div>
        </div>
      </div>

      {/* Faq section */}
      <div className="my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 mb-20"
        >
          <h1 className="font-extrabold text-2xl text-primary uppercase">
            FAQ
          </h1>
          <hr className="border border-b-4 border-primary rounded-lg w-24" />
        </motion.div>

        <div>
          <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-md border p-6"
            >
              <dt className="text-lg font-semibold leading-6 text-gray-900">
                How do I get started?
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                Getting started is so easy. Just visit assignment and create
                assignment.
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-md border p-6"
            >
              <dt className="text-lg font-semibold leading-6 text-gray-900">
                Can i grade myself?
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                No! Grading thyself is a crime. You shouldn't do that!
              </dd>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-md border p-6"
            >
              <dt className="text-lg font-semibold leading-6 text-gray-900">
                Can anyone create account here?
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                Yes, if you someone interested about the assignment evaluation!
              </dd>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
