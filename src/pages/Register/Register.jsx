import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState("");
  const { register, logout, update } = useAuthContext();
  const navigate = useNavigate();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    if (!name) {
      setError("Please provide your name!");
      return;
    }
    if (!photo) {
      setError("Please provide your photo!");
      return;
    }
    const emailReg = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!emailReg.test(email)) {
      setError("Pleaes Enter a valid email!");
      return;
    }
    if (!password) {
      setError("Please provide password!");
      return;
    }
    if (!(password.length >= 6)) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (!/[a-z]/g.test(password)) {
      setError("Password must includes lowercase character");
      return;
    }
    if (!/[A-Z]/g.test(password)) {
      setError("Password must includes uppercase character");
      return;
    }
    const specialReg = /(?=.*[!@#$%^&*])/g;
    if (!specialReg.test(password)) {
      setError("Password must includes special characters(i.e: !@#$%^&*)");
      return;
    }

    if (error.length === 0) {
      console.log("it's time to register :D");

      register(email, password)
        .then((res) => {
          if (res.user) {
            notifySuccess("Rgistration Successful!");

            // Update the meta information
            update({
              displayName: name,
              photoURL: photo,
            })
              .then(() => {
                form.reset();
                logout().then().catch();
                navigate("/login");
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => setError(error));
    }
  };
  return (
    <div className="px-10 lg:px-0 hero min-h-screen bg-base-100">
      <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              //   required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photo"
              type="url"
              placeholder="Enter photo url"
              className="input input-bordered"
              //   required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              //   required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              //   required
            />
          </div>

          {error && <p className="text-error mt-3">{error}</p>}

          <div className="form-control mt-3">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-black"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mb-6">
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-primary" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
