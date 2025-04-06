import React, { useState, useEffect } from "react";

// Dummy data
const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+91 9876543210",
};

const dummyBookings = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  package: `Trip to Paradise ${i + 1}`,
  date: `2024-0${(i % 9) + 1}-15`,
  status: ["Pending", "Confirmed", "Cancelled"][i % 3],
}));

const UserProfile = () => {
  const [bookings, setBookings] = useState(dummyBookings);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const filteredBookings = bookings
    .filter((b) =>
      b.package.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => (status === "All" ? true : b.status === status));

  const paginatedBookings = filteredBookings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* User Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#191970] mb-4">User Profile</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          </div>
          <div>
            <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-4">
          <input
            type="text"
            placeholder="Search bookings..."
            className="border px-4 py-2 rounded-xl w-full sm:w-1/3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border px-4 py-2 rounded-xl w-full sm:w-1/4"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {paginatedBookings.length === 0 ? (
          <p className="text-gray-600 text-center py-10">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#191970] text-white">
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="py-2 px-4">{b.package}</td>
                    <td className="py-2 px-4">{b.date}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          b.status === "Confirmed"
                            ? "bg-green-500"
                            : b.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-xl border ${
                  page === i + 1
                    ? "bg-[#191970] text-white"
                    : "bg-white text-[#191970]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
