import React, { useEffect, useState } from "react";
import { fetchAdminBookings, updateBookingStatus } from "../../api/apis";
import Pagination from "../../components/Pagination";
import { FaEyeSlash, FaEye, FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hideFields, setHideFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminBookings(searchTerm, currentPage);
      const allBookings = res?.data?.bookings || [];
      const pages = res?.data?.totalPages || 1;

      const filtered =
        sortStatus === "all"
          ? allBookings
          : allBookings.filter((b) => b.bookingStatus === sortStatus);

      setBookings(filtered);
      setTotalPages(pages);

      const initialHide = {};
      filtered.forEach((b) => {
        initialHide[b._id] = true;
        initialHide[b.razorpay_order_id] = true;
        initialHide[b.razorpay_payment_id] = true;
      });
      setHideFields(initialHide);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      toast.error("Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdating(id);
    try {
      await updateBookingStatus(id, newStatus);
      toast.success("Booking status updated");
      fetchBookings();
    } catch (err) {
      console.error("Failed to update booking status", err);
      toast.error("Failed to update status");
    } finally {
      setStatusUpdating("");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const toggleHide = (key) => {
    setHideFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    fetchBookings();
  }, [searchTerm, currentPage, sortStatus]);

  const renderCopyField = (label, value, key) => (
    <div className="flex items-center gap-2 mt-1">
      <strong>{label}:</strong>
      <span>{hideFields[key] ? "••••••••••" : value}</span>
      <button onClick={() => toggleHide(key)} title={hideFields[key] ? "Show" : "Hide"}>
        {hideFields[key] ? <FaEyeSlash className="text-blue-500" /> : <FaEye className="text-blue-500" />}
      </button>
      <button onClick={() => handleCopy(value)} title="Copy">
        <FaCopy className="text-green-500" />
      </button>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-[#191970] mb-4">Order Management</h2>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by user or package"
          className="px-4 py-2 border rounded-xl w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-4 py-2 border rounded-xl"
          value={sortStatus}
          onChange={(e) => {
            setSortStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full border rounded-xl">
              <thead className="bg-[#191970] text-white">
                <tr>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Package</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((order) => (
                    <tr key={order._id} className="border-t text-left">
                      <td className="py-2 px-4">{order.userId?.name || "N/A"}</td>
                      <td className="py-2 px-4">{order.packageId?.title || "N/A"}</td>
                      <td className="py-2 px-4">{order.selectedDate}</td>
                      <td className="py-2 px-4">{order.phoneNumber}</td>
                      <td className="py-2 px-4">₹{order.total}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            order.bookingStatus === "Confirmed"
                              ? "bg-green-600"
                              : order.bookingStatus === "Pending"
                              ? "bg-yellow-500"
                              : order.bookingStatus === "Cancelled"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {order.bookingStatus}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <select
                          value={order.bookingStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="px-2 py-1 border rounded-xl"
                          disabled={statusUpdating === order._id}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden flex flex-col gap-4">
            {bookings.map((order) => (
              <div key={order._id} className="border rounded-xl p-4 shadow">
                <p><strong>User:</strong> {order.userId?.name || "N/A"}</p>
                <p><strong>Package:</strong> {order.packageId?.title || "N/A"}</p>
                <p><strong>Date:</strong> {order.selectedDate}</p>
                <p><strong>Phone:</strong> {order.phoneNumber}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>

                {renderCopyField("Booking ID", order._id, order._id)}
                {renderCopyField("Razorpay Order", order.razorpay_order_id, order.razorpay_order_id)}
                {renderCopyField("Payment ID", order.razorpay_payment_id, order.razorpay_payment_id)}

                <div className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      order.bookingStatus === "Confirmed"
                        ? "bg-green-600"
                        : order.bookingStatus === "Pending"
                        ? "bg-yellow-500"
                        : order.bookingStatus === "Cancelled"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.bookingStatus}
                  </span>
                  <select
                    value={order.bookingStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="mt-1 w-full border rounded px-2 py-1"
                    disabled={statusUpdating === order._id}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default BookingManagement;
