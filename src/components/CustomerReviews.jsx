import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Best trip ever! Everything was organized and smooth. Loved every moment!",
  },
  {
    name: "John Smith",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Highly recommend! Great service, amazing team, and truly unforgettable places.",
  },
  {
    name: "Emily Carter",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    review:
      "Such a memorable experience. The planning, the support — everything was top-notch!",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#f0f8ff] to-white">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#191970]">
        💬 What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-lg border border-gray-200 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <FaQuoteLeft className="text-2xl text-[#00BFFF] mb-4" />
            <p className="text-gray-700 italic mb-6">"{r.review}"</p>
            <div className="flex items-center gap-4">
              <img
                src={r.image}
                alt={r.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#00BFFF]"
              />
              <div>
                <h4 className="font-semibold text-[#191970]">{r.name}</h4>
                <div className="flex text-yellow-400 text-sm mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
