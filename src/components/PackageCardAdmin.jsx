import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const PackageCardAdmin = ({ pkg, onEdit, onDelete, onToggleVisibility }) => {
  const images = pkg.images?.length ? pkg.images : [
    { url: "https://via.placeholder.com/300x200", alt: "placeholder" }
  ];

  return (
    <div className="border rounded-2xl shadow-md p-4 bg-white flex flex-col justify-between">
      {/* Swiper Image Slider */}
      <div className="relative mb-3">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="rounded-xl"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.url}
                alt={img.alt || `Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Info */}
      <div className="mb-3 space-y-1">
        <h3 className="text-lg font-bold text-[#191970] truncate">{pkg.title}</h3>
        <p className="text-sm text-gray-600">📍 {pkg.location}</p>
        <p className="text-sm text-gray-600">🕒 {pkg.duration}</p>
        <p className="text-md font-semibold text-green-600">₹{pkg.pricePerPerson}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`flex-1 py-1 px-2 text-sm rounded-lg text-white ${
            pkg.isVisible ? "bg-green-600" : "bg-gray-500"
          }`}
          onClick={() => onToggleVisibility(pkg._id)}
        >
          {pkg.isVisible ? "Visible" : "Hidden"}
        </button>

        <button
          className="flex-1 py-1 px-2 text-sm rounded-lg bg-yellow-500 text-white"
          onClick={() => onEdit(pkg)}
        >
          Edit
        </button>

        <button
          className="flex-1 py-1 px-2 text-sm rounded-lg bg-red-600 text-white"
          onClick={() => onDelete(pkg._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PackageCardAdmin;
