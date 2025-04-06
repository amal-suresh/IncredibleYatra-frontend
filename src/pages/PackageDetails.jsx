import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const dummyPackages = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  title: `Tour Package ${i + 1}`,
  description:
    "Discover the best of nature, culture, and adventure with our specially crafted tour package.",
  details:
    "This package includes transportation, meals, guided tours, and accommodation. Experience unforgettable destinations with professional service and comfort.",
  price: `₹${(i + 1) * 1500}`,
  duration: `${2 + i % 5} days / ${1 + i % 4} nights`,
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
}));

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");

  const selectedPackage = dummyPackages.find((pkg) => pkg.id === id);

  if (!selectedPackage) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg font-semibold">
        Package not found!
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#f4f7fb] min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#191970] mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Go Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <img
          src={selectedPackage.image}
          alt={selectedPackage.title}
          className="w-full lg:w-1/2 h-72 lg:h-auto object-cover"
        />
        <div className="p-6 flex flex-col gap-4 lg:w-1/2">
          <h2 className="text-3xl font-bold text-[#191970]">
            {selectedPackage.title}
          </h2>
          <p className="text-gray-600">{selectedPackage.description}</p>
          <p className="text-gray-800">{selectedPackage.details}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-semibold text-[#191970]">
              {selectedPackage.duration}
            </span>
            <span className="text-xl font-bold text-green-600">
              {selectedPackage.price}
            </span>
          </div>

          {/* Date Picker */}
          <div className="mt-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>

          <button
            className="mt-4 w-full bg-[#191970] text-white py-2 rounded-xl hover:bg-[#0f154b] transition"
            onClick={() =>
              alert(
                selectedDate
                  ? `Booking for ${selectedPackage.title} on ${selectedDate}`
                  : "Please select a date."
              )
            }
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
