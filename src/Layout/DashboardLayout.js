import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content bg-secondary p-5">
          {/* <!-- Page content here --> */}

          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content bg-accent text-white">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>
            {
              isAdmin && <> <li>
              <Link to="/dashboard/allUsers">All Users</Link>
            </li>
            <li>
              <Link to="/dashboard/manageDoctor">Manage Doctor</Link>
            </li>
            <li>
              <Link to="/dashboard/addDoctor">Add Doctor</Link>
            </li>
            </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
