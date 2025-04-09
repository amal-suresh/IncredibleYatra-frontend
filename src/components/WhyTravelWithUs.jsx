import React from "react";
import {
  FaShieldAlt,
  FaHeadset,
  FaMapMarkedAlt,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-[#00BFFF]" />,
    title: "Safe & Secure",
    desc: "Your safety is our priority. Travel with confidence knowing everything is verified and secure.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-[#00BFFF]" />,
    title: "Customized Packages",
    desc: "Get personalized travel plans tailored to your interests, budget, and schedule.",
  },
  {
    icon: <FaHeadset className="text-4xl text-[#00BFFF]" />,
    title: "24/7 Support",
    desc: "We’re always here for you. Reach us anytime for assistance before, during, or after your trip.",
  },
  {
    icon: <FaStar className="text-4xl text-[#00BFFF]" />,
    title: "Top-rated Experiences",
    desc: "Join thousands of happy travelers who love our well-curated and memorable packages.",
  },
];

const WhyTravelWithUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#f0f8ff] to-white">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#191970] mb-14">
        🌟 Why Travel With Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 max-w-7xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-lg border border-gray-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center"
          >
            <div className="mb-4 flex justify-center animate-bounce-slow">{item.icon}</div>
            <h3 className="text-xl font-semibold text-[#191970] mb-3">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyTravelWithUs;
