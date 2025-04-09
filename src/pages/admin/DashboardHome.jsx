// components/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { getDashboardStats } from "../../api/apis";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load dashboard stats", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (!stats) return <div className="p-4 text-red-500">No data found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Packages" value={stats.totalPackages} />
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
      </div>

      {/* Recent Bookings */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📋 Recent Bookings</h3>
        <div className="space-y-4">
          {stats.recentBookings.length === 0 ? (
            <p className="text-gray-500">No recent bookings found.</p>
          ) : (
            stats.recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 border rounded-lg shadow bg-white space-y-1"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    👤 {booking.userId?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    🕒 {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>

                <p className="text-gray-700">
                  📦 <strong>Package:</strong> {booking.packageId?.title || "N/A"}
                </p>
                <p className="text-gray-700">
                  📅 <strong>Selected Date:</strong> {booking.selectedDate}
                </p>
                <p className="text-gray-700">
                  👥 <strong>Total Persons:</strong> {booking.totalPersons}
                </p>
                <p className="text-gray-700">
                  💰 <strong>Total:</strong> ₹{booking.total}
                </p>
                <p
                  className={`font-medium ${booking.bookingStatus === "Confirmed"
                      ? "text-green-600"
                      : booking.bookingStatus === "Cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                >
                  📌 <strong>Status:</strong> {booking.bookingStatus}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <h4 className="text-xl font-bold mt-1">{value}</h4>
  </div>
);

export default AdminDashboard;
