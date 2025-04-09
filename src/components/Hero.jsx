import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 md:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Discover Your Next
          <span className="block text-[#FFA500]">Adventure</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mt-4 text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Unforgettable experiences await. Find the perfect tour package and start your journey today.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 text-lg font-semibold bg-[#FFA500] text-white rounded-full hover:bg-[#ffb347] shadow-lg transition"
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/packages">Explore Packages</Link>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
