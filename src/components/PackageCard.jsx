import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";

const PackageCard = ({ id, title, description, images, location, duration, pricePerPerson }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300"
    >
      <img
        src={images?.[0]?.url || "https://via.placeholder.com/400x250"}
        alt={images?.[0]?.alt || title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#191970]">{title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaMapMarkerAlt className="text-[#191970]" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <BsClock className="text-[#191970]" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#191970]">
              <MdCurrencyRupee />
              <span>{pricePerPerson} / person</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/packages/${id}`)}
          className="mt-4 bg-[#191970] text-white py-2 rounded-xl hover:bg-[#15155c] transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
