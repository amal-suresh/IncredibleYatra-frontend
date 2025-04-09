// src/pages/UserManagement.js
import React, { useState, useEffect } from "react";
import { getAllUsers, toggleBlockUser } from "../../api/apis";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const USERS_PER_PAGE = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getAllUsers(currentPage, USERS_PER_PAGE, searchTerm);
      setUsers(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const toggleBlock = async (id) => {
    try {
      const response = await toggleBlockUser(id);
      const { isBlocked } = response.data;

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked } : user
        )
      );

      toast.success(`User has been ${isBlocked ? "blocked" : "unblocked"}`);
    } catch (err) {
      toast.error("Failed to toggle user status");
      console.error("Error toggling block:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-[#191970] mb-4">
        User Management
      </h2>

      <input
        type="text"
        placeholder="Search by name or email"
        className="w-full sm:w-1/2 px-4 py-2 mb-4 border rounded-xl focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl">
            <thead className="bg-[#191970] text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 text-center">
                    {user.isBlocked ? (
                      <span className="text-red-600 font-medium">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-medium">Active</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => toggleBlock(user._id)}
                      className={`px-3 py-1 rounded-lg text-white ${
                        user.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserManagement;
