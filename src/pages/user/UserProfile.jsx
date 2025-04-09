import React, { useEffect, useState } from "react";
import { getProfileAndBookings } from "../../api/apis";
import {
  FaUserCircle,
  FaEnvelope,
  FaSearch,
  FaFilter,
  FaPhone,
  FaUserFriends,
  FaRupeeSign,
  FaCalendarAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom"; // or use Next.js `next/link`

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfileAndBookings();
        const data = res.data;
        setUser(data.user);
        setBookings(data.bookings);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBookings = bookings
    .filter((b) =>
      b.packageId?.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => (status === "All" ? true : b.bookingStatus === status));

  const paginatedBookings = filteredBookings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-8">
      {/* User Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
        <FaUserCircle size={64} className="text-[#191970]" />
        <div>
          <h2 className="text-2xl font-bold text-[#191970] mb-1">User Profile</h2>
          <p className="text-gray-700 flex items-center gap-2">
            <FaUserCircle />{user.name}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaEnvelope />{user.email}
          </p>
        </div>
      </div>

      {/* Booking Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#191970] mb-1">My bookings</h2>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search bookings..."
              className="border w-full px-4 py-2 rounded-xl pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>

          <div className="relative w-full sm:w-1/4">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="border w-full px-4 py-2 rounded-xl pl-10"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
              <option>Completed</option>
            </select>
            <FaFilter className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>

        {/* Booking Cards */}
        {loading ? (
          <p className="text-gray-600 text-center py-10">Loading...</p>
        ) : paginatedBookings.length === 0 ? (
          <p className="text-gray-600 text-center py-10">No bookings found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {paginatedBookings.map((b) => (
              <div
                key={b._id}
                className="bg-[#f9f9ff] border rounded-2xl p-4 shadow-md space-y-2 hover:shadow-lg transition"
              >
                {/* Package Image */}
                {b.packageId?.images?.[0] && (
                  <img
                    src={b.packageId.images[0].url}
                    alt={b.packageId.title}
                    className="w-full h-40 object-cover rounded-xl mb-2"
                  />
                )}

                {/* Package Title with Link */}
                <h3 className="font-semibold text-lg text-[#191970] flex items-center gap-2">
                  <MdEventAvailable className="text-[#191970]" />
                  <Link
                    to={`/packages/${b.packageId._id}`}
                    className="hover:underline"
                  >
                    {b.packageId.title}
                  </Link>
                </h3>

                <div className="text-sm text-gray-700 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <strong>Date:</strong>{" "}
                    {new Date(b.selectedDate).toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaUserFriends className="text-indigo-500" />
                    <strong>Total Persons:</strong> {b.totalPersons}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaRupeeSign className="text-green-600" />
                    <strong>Total:</strong> ₹{b.total}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaPhone className="text-pink-500" />
                    <strong>Phone:</strong> {b.phoneNumber}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaMoneyCheckAlt className="text-purple-500" />
                    <strong>Payment:</strong>
                    <span
                      className={`font-medium ${
                        b.paymentStatus === "Success"
                          ? "text-green-600"
                          : b.paymentStatus === "Failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <GiConfirmed className="text-yellow-500" />
                    <strong>Booking:</strong>
                    <span
                      className={`font-medium ${
                        b.bookingStatus === "Confirmed"
                          ? "text-green-600"
                          : b.bookingStatus === "Pending"
                          ? "text-yellow-600"
                          : b.bookingStatus === "Cancelled"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </p>
                </div>

                <p className="text-xs text-gray-500 pt-1">
                  Booked on: {new Date(b.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
