import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Assignments from "../pages/Assignments/Assignments";
import CreateAssignment from "../pages/Assignments/CreateAssignment";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";
import Details from "../pages/Assignments/Details";
import Update from "../pages/Assignments/Update";
import NotFound from "../pages/NotFound/NotFound";
import { useAuthContext } from "../hooks/useAuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/assignments",
        element: <Assignments />,
        loader: () => axios.get(`http://localhost:8000/assignments`),
      },
      {
        path: "/assignment/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        ),
      },
      {
        path: "/create",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
