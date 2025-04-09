import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { sentContactMail } from "../api/apis";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Validation
    if (!name || !email || !message) {
      return toast.error("Please fill in all fields.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    try {
      toast.loading("Sending message...", { id: "sending" });
      await sentContactMail(formData);
      toast.success("Message sent successfully!", { id: "sending" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message.", { id: "sending" },error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f0f8ff] to-[#e0f7ff]" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-[#191970] mb-4">
          📬 Contact Us
        </h2>
        <div className="w-24 h-1 bg-[#00BFFF] mx-auto rounded-full mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-8 text-[#191970]">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-[#00BFFF]" />
              <div>
                <h4 className="font-semibold text-lg">Our Office</h4>
                <p>123 Beachside Lane, Maldives</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhone className="text-3xl text-[#00BFFF]" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p>+1 (800) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-3xl text-[#00BFFF]" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p>support@travelhub.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] shadow-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] shadow-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] shadow-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00BFFF] hover:bg-[#0099cc] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
