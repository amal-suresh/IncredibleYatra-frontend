import { useNavigate } from "react-router-dom";

const PackageCard = ({ image, title, description, id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-[#191970]">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <button
          onClick={() => navigate(`/packages/${id}`)}
          className="mt-4 bg-[#191970] text-white py-2 rounded-xl hover:bg-[#15155c] transition-colors"
        >
          View Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
