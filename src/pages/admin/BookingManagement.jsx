import React, { useState } from "react";

const dummyOrders = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  user: `User ${i + 1}`,
  package: `Tour Package ${((i % 5) + 1)}`,
  status: ["Pending", "Confirmed", "Cancelled"][i % 3],
  date: `2025-04-${(i % 28) + 1}`.padStart(2, "0"),
}));

const ITEMS_PER_PAGE = 5;

const BookingManagement = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.package.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      sortStatus === "all" || order.status === sortStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
          onChange={(e) => setSearchTerm(e.target.value)}
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
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl">
          <thead className="bg-[#191970] text-white">
            <tr>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Package</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => (
              <tr key={order.id} className="border-t text-center">
                <td className="py-2 px-4 text-left">{order.user}</td>
                <td className="py-2 px-4 text-left">{order.package}</td>
                <td className="py-2 px-4 text-left">{order.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      order.status === "Confirmed"
                        ? "bg-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 space-x-1">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-2 py-1 border rounded-xl"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
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

export default BookingManagement;
