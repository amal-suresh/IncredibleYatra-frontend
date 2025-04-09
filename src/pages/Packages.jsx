import React, { useEffect, useState } from "react";
import PackageFilters from "../components/PackageFilters";
import PackageCard from "../components/PackageCard";
import { getVisiblePackages } from "../api/apis";
import toast from "react-hot-toast";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const packagesPerPage = 6;

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await getVisiblePackages({
        search,
        sort,
        page: currentPage,
        limit: packagesPerPage,
      });
      setPackages(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to load packages");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [search, sort, currentPage]);

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

      {loading ? (
        <div className="text-center text-[#191970] mt-8 font-semibold">
          Loading packages...
        </div>
      ) : packages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              id={pkg._id}
              images={pkg.images}
              location={pkg.location}
              duration={pkg.duration}
              title={pkg.title}
              description={pkg.description}
              pricePerPerson={pkg.pricePerPerson}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No packages found.
        </div>
      )}

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
