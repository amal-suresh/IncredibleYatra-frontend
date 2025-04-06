import React, { useState } from "react";
import PackageFilters from "../components/PackageFilters";
import PackageCard from "../components/PackageCard";


const dummyPackages = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Tour Package ${i + 1}`,
  description:
    "Explore beautiful destinations with our all-inclusive tour packages.",
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
}));

const Packages = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 6;

  // Search + Sort
  const filteredPackages = dummyPackages
    .filter((pkg) =>
      pkg.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") return a.title.localeCompare(b.title);
      if (sort === "desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const indexOfLast = currentPage * packagesPerPage;
  const indexOfFirst = indexOfLast - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  return (
    <div className="bg-[#f4f7fb] min-h-screen p-4 sm:p-6 lg:p-10">
      <h2 className="text-3xl font-bold text-center text-[#191970] mb-6">
        Tour Packages
      </h2>

      <PackageFilters
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            image={pkg.image}
            title={pkg.title}
            description={pkg.description}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-9 h-9 rounded-full text-white font-semibold ${
              currentPage === i + 1
                ? "bg-[#191970]"
                : "bg-gray-300 text-[#191970]"
            } hover:scale-105 transition-transform`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Packages;
