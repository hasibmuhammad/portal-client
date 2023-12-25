import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout()
      .then(() => {
        axios
          .get("https://assignment-portal-backend.vercel.app/logout", {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              navigate("/login");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  const menus = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <details>
          <summary>Assignment</summary>
          <ul className="p-2">
            <li>
              <NavLink to={"/assignments"}>All</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={"/create"}>Create</NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to={"/submitted"}>Submitted</NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to={"/myassignments"}>My Assignemnts</NavLink>
              </li>
            )}
          </ul>
        </details>
      </li>
      {user ? (
        ""
      ) : (
        <li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2"
          >
            {menus}
          </ul>
        </div>
        <Link to={"/"}>
          <h1 className="text-2xl font-extrabold text-primary uppercase tracking-widest">
            portal
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal z-[1] px-1 gap-2">{menus}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                src={
                  user && user?.photoURL
                    ? user?.photoURL
                    : "https://res.cloudinary.com/hasibmuhammad/image/upload/v1703178219/assignment-portal/avatar.webp"
                }
              />
            </div>
          </div>
          {user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between capitalize">
                  Hi, {user?.displayName}
                  <span className="badge">New</span>
                </a>
              </li>
              {user && (
                <li onClick={logoutHandler}>
                  <a>Logout</a>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
