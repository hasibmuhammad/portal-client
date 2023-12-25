import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const handleLogin = (e) => {
    setError("");

    e.preventDefault();

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

    if (!error) {
      login(email, password)
        .then((res) => {
          if (res.user) {
            form.reset();
            notifySuccess("Logged in successfully!");

            // set the jwt token
            axios
              .post(
                `https://assignment-portal-backend.vercel.app/jwt`,
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
              .catch((error) => setError(error.message));
          }
        })
        .catch((error) => setError(error.message));
    }
  };

  // Login with google
  const loginWithGoogleHandler = () => {
    loginWithGoogle()
      .then((res) => {
        if (res.user) {
          notifySuccess("Logged in successfully!");

          // set the jwt token
          axios
            .post(
              `https://assignment-portal-backend.vercel.app/jwt`,
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
            .catch((error) => setError(error.message));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="px-10 lg:px-0 hero min-h-screen bg-base-100"
    >
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
          </div>
          {error && (
            <div>
              <p className="text-error">{error}</p>
            </div>
          )}
          <div className="form-control mt-3">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-black"
            >
              Login
            </button>
          </div>
          <div className="form-control">
            <button
              onClick={loginWithGoogleHandler}
              type="button"
              className="btn btn-outline border-primary"
            >
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
      <ScrollRestoration />
    </motion.div>
  );
};

export default Login;
