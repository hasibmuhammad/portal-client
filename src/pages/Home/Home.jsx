import { Link } from "react-router-dom";
import image1 from "/1.avif";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-10 lg:px-0">
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
    </div>
  );
};

export default Home;
