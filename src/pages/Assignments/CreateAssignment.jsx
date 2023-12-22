import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
const CreateAssignment = () => {
  const [error, setError] = useState("");
  return (
    <div className="px-10 lg:px-0 hero min-h-screen bg-base-100">
      <div className="card shrink-0 w-full max-w-2xl mx-auto shadow-2xl bg-base-100 my-20 md:my-10">
        <h3 className="font-bold text-2xl text-center mt-5 text-primary">
          Create Assignment
        </h3>
        <form className="card-body">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="title"
                className="input input-bordered"
                //   required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <input
                name="photo"
                type="url"
                placeholder="Enter photo url"
                className="input input-bordered"
                //   required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Marks</span>
              </label>
              <input
                name="marks"
                type="number"
                placeholder="marks"
                className="input input-bordered"
                //   required
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Difficulty</span>
              </label>
              <select className="px-4 py-3 form-control input input-bordered">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea className="textarea textarea-bordered textarea-lg"></textarea>
          </div>

          {error && <p className="text-error mt-3">{error}</p>}

          <div className="form-control mt-3">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-black"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateAssignment;
