import React, { useState, useEffect } from "react";

const dummyUsers = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  isBlocked: false,
}));

const USERS_PER_PAGE = 5;

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const toggleBlock = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [searchTerm, totalPages]);

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
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-t">
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
                    onClick={() => toggleBlock(user.id)}
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

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-full border ${
              currentPage === i + 1
                ? "bg-[#191970] text-white"
                : "text-[#191970] border-[#191970]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
