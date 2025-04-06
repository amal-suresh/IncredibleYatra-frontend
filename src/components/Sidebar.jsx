import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaBox, FaClipboardList, FaHome } from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <FaHome /> },
  { name: "Users", path: "/admin/users", icon: <FaUsers /> },
  { name: "Packages", path: "/admin/packages", icon: <FaBox /> },
  { name: "Orders", path: "/admin/orders", icon: <FaClipboardList /> },
];

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:block bg-[#191970] text-white h-screen w-64 p-4 fixed">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/admin"} // exact match for dashboard
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                    isActive ? "bg-white text-[#191970]" : "hover:bg-[#2b2bb2]"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#191970] text-white flex justify-around py-2 z-50 shadow-md">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"} // exact match for dashboard
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-yellow-300" : "text-white"
              }`
            }
          >
            <div className="text-lg">{item.icon}</div>
            {item.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;

