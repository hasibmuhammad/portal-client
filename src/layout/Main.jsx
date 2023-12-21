import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-10 lg:px-0">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
