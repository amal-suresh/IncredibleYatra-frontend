import React, { useState, useEffect } from "react";

const dummyPackages = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Tour Package ${i + 1}`,
  price: Math.floor(Math.random() * 5000 + 1000),
  isVisible: true,
}));

const ITEMS_PER_PAGE = 5;

const PackageManagement = () => {
  const [packages, setPackages] = useState(dummyPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const filtered = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleVisibility = (id) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === id ? { ...pkg, isVisible: !pkg.isVisible } : pkg
      )
    );
  };

  const deletePackage = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const startEdit = (pkg) => {
    setEditingId(pkg.id);
    setEditTitle(pkg.title);
    setEditPrice(pkg.price);
  };

  const saveEdit = () => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === editingId
          ? { ...pkg, title: editTitle, price: parseFloat(editPrice) }
          : pkg
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleAdd = () => {
    const newId = packages.length + 1;
    setPackages([
      ...packages,
      {
        id: newId,
        title: `New Package ${newId}`,
        price: 2000,
        isVisible: true,
      },
    ]);
  };

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [searchTerm, totalPages]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold text-[#191970]">Package Management</h2>
        <button
          className="bg-[#191970] text-white px-4 py-2 rounded-xl hover:bg-[#15155c]"
          onClick={handleAdd}
        >
          + Add Package
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="px-4 py-2 border rounded-xl w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-xl"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl">
          <thead className="bg-[#191970] text-white">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4 text-center">Visibility</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((pkg) => (
              <tr key={pkg.id} className="border-t text-center">
                <td className="py-2 px-4">
                  {editingId === pkg.id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    pkg.title
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === pkg.id ? (
                    <input
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="border px-2 py-1 rounded"
                      type="number"
                    />
                  ) : (
                    `₹${pkg.price}`
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => toggleVisibility(pkg.id)}
                    className={`px-3 py-1 rounded-xl text-white ${
                      pkg.isVisible ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {pkg.isVisible ? "Visible" : "Hidden"}
                  </button>
                </td>
                <td className="py-2 px-4 space-x-2">
                  {editingId === pkg.id ? (
                    <>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => startEdit(pkg)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => deletePackage(pkg.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
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

export default PackageManagement;
