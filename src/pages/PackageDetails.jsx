import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { createRazorpayOrder, getSinglePackage, verifyPaymentAndCreateBooking } from "../api/apis";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalPersons, setTotalPersons] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [personLimitError, setPersonLimitError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const fetchPackage = async () => {
    try {
      const res = await getSinglePackage(id);
      setSelectedPackage(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch package details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const handlePersonChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;
    if (Number(value) > 50) {
      setPersonLimitError("Maximum 50 persons allowed per booking.");
    } else {
      setPersonLimitError("");
    }
    setTotalPersons(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (!/^[6-9]\d{9}$/.test(value)) {
      setPhoneError("Enter a valid 10-digit Indian phone number.");
    } else {
      setPhoneError("");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const baseAmount = selectedPackage?.pricePerPerson * Number(totalPersons || 1);
  const paymentFee = (baseAmount * 0.02).toFixed(2);
  const tourismTax = (baseAmount * 0.05).toFixed(2);
  const totalAmount = (baseAmount + Number(paymentFee) + Number(tourismTax)).toFixed(2);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    if (!selectedDate) return toast.error("Please select a date.");
    if (Number(totalPersons) < 1) return toast.error("Minimum 1 person is required.");
    if (Number(totalPersons) > 50) return toast.error("Maximum 50 persons allowed.");
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) return toast.error("Please enter a valid phone number.");

    const res = await loadRazorpay();
    if (!res) {
      toast.error("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    let orderData;
    try {
      const orderRes = await createRazorpayOrder(Number(totalAmount))
      orderData = orderRes.data;
    } catch (err) {
      toast.error("Error creating Razorpay order.", err.message);
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: orderData.amount,
      currency: "INR",
      name: "IncredibleYatra",
      description: "Tour Package Booking",
      image: "/logo.png",
      order_id: orderData.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
      
        let data = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          phoneNumber,
          totalPersons,
          selectedDate,
          packageId: selectedPackage._id,
          total: orderData.amount
        }
        try {
          const verifyRes = await verifyPaymentAndCreateBooking(data)

          if (verifyRes.data.success) {
            toast.success(verifyRes.data.message);
            const bookingId = verifyRes?.data?.booking?._id;
            navigate(`/payment-success/${bookingId}`);

          } else {
            toast.error("Payment verification failed.");
          }
        } catch (err) {
          console.error("Verification failed", err);
          toast.error("Error verifying payment.");
        }
      },
      prefill: {
        contact: phoneNumber,
      },
      theme: {
        color: "#191970",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  if (loading) {
    return <div className="text-center mt-10 text-[#191970] font-semibold">Loading package details...</div>;
  }

  if (!selectedPackage) {
    return <div className="text-center mt-10 text-red-600 text-lg font-semibold">Package not found!</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-[#eef2f3] to-[#cfd9df] min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-[#191970] mb-6 hover:underline">
        <FaArrowLeft className="mr-2" /> Go Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-all duration-300">
        <div className="w-full lg:w-1/2">
          <Swiper autoplay={{ delay: 4000 }} loop navigation pagination={{ clickable: true }} modules={[Autoplay, Pagination, Navigation]} className="h-[320px] lg:h-full">
            {selectedPackage.images?.length > 0 ? (
              selectedPackage.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img.url} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img src="https://via.placeholder.com/800x400?text=No+Image+Available" alt="No image" className="w-full h-full object-cover" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <div className="p-8 flex flex-col gap-5 lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-[#191970]">{selectedPackage.title}</h2>
          <div className="flex items-center text-gray-700 gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="font-medium">{selectedPackage.location}</span>
          </div>
          <p className="text-gray-600 text-base">{selectedPackage.description}</p>
          <p className="text-gray-800 text-sm">{selectedPackage.details}</p>

          <div className="flex justify-between items-center bg-[#f1f5f9] p-3 rounded-xl shadow-inner">
            <span className="text-lg font-medium text-[#374151]">{selectedPackage.duration}</span>
            <span className="text-2xl font-bold text-green-600">₹{selectedPackage.pricePerPerson} / person</span>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Select Date:</label>
            <input type="date" min={today} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#191970]" />
          </div>

          {/* Person Count */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Total Persons:</label>
            <input type="number" min={1} max={50} value={totalPersons} onChange={handlePersonChange} className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#191970]" />
            {personLimitError && <p className="text-red-500 mt-1 text-sm">{personLimitError}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={handlePhoneChange} placeholder="Enter 10-digit mobile number" className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#191970]" />
            {phoneError && <p className="text-red-500 mt-1 text-sm">{phoneError}</p>}
          </div>

          {/* Invoice Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4 shadow-sm">
            <h3 className="font-semibold text-lg text-[#191970] mb-2">Price Breakdown</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span>Base Amount ({totalPersons} x ₹{selectedPackage.pricePerPerson})</span><span>₹{baseAmount}</span></div>
              <div className="flex justify-between"><span>Payment Gateway Fee (2%)</span><span>₹{paymentFee}</span></div>
              <div className="flex justify-between"><span>Tourism Tax (5%)</span><span>₹{tourismTax}</span></div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg text-[#191970]"><span>Total Amount</span><span>₹{totalAmount}</span></div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">We use <span className="font-semibold">Razorpay</span> as our secure payment gateway.</p>

          <button disabled={Number(totalPersons) > 50 || phoneError} className={`mt-4 w-full py-3 rounded-xl text-white font-semibold transition-all ${Number(totalPersons) > 50 || phoneError ? "bg-gray-400 cursor-not-allowed" : "bg-[#191970] hover:bg-[#0f154b]"}`} onClick={handleBooking}>
            Pay & Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
