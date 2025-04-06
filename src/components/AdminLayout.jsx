import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 sm:ml-64 mb-16 sm:mb-0">
        <Outlet /> {/* All admin pages render here */}
      </main>
    </div>
  );
};

export default AdminLayout;


