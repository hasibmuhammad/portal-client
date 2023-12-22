import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email) {
      setError("Please provide email!");
      return;
    }
    if (!password) {
      setError("Please provide password!");
      return;
    }

    if (error.length === 0) {
      login(email, password)
        .then((res) => {
          if (res.user) {
            form.reset();
            notifySuccess("Logged in successfully!");

            // set the jwt token
            axios
              .post(
                `http://localhost:8000/jwt`,
                { email: res.user?.email },
                { withCredentials: true }
              )
              .then((res) => {
                if (res.data.success) {
                  setTimeout(
                    () => navigate(location?.state ? location?.state : "/"),
                    1000
                  );
                }
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => setError(error));
    }
  };
  return (
    <div className="px-10 lg:px-0 hero min-h-screen bg-base-100">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
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
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-3">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-black"
            >
              Login
            </button>
          </div>
          <div className="form-control">
            <button type="button" className="btn btn-outline border-primary">
              <FcGoogle className="text-xl" />
              Continue With Google
            </button>
          </div>
        </form>
        <div className="mb-6">
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="text-primary" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
