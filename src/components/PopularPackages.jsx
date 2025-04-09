import React, { useEffect, useState } from "react";
import { getVisiblePackages } from "../api/apis";
import toast from "react-hot-toast";
import PackageCard from "./PackageCard";


const PopularPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await getVisiblePackages({
        search: "",
        sort: "popular", // adjust if you have sorting
        page: 1,
        limit: 3, // ✅ only 3 packages
      });
      setPackages(res.data.data);
    } catch (error) {
      toast.error("Failed to load packages");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-[#191970] mb-10">Popular Tour Packages</h2>

      {loading ? (
        <p className="text-[#191970]">Loading packages...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              id={pkg._id}
              title={pkg.title}
              description={pkg.description}
              images={pkg.images}
              location={pkg.location}
              duration={pkg.duration}
              pricePerPerson={pkg.pricePerPerson}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularPackages;
