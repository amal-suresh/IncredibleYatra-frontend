import React from "react";
import { FaSearch } from "react-icons/fa";

const PackageFilters = ({ search, setSearch, sort, setSort }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search by location or package title..."
          className="w-full border border-gray-300 rounded-xl py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#191970]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
      </div>

      {/* Sort Dropdown */}
      <div className="w-full sm:w-1/4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#191970]"
        >
          <option value="">Sort by</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default PackageFilters;
