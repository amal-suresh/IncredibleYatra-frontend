import axios from "../lib/axiosInstance";


export const userRegister = (data) => axios.post("/user/register", data);
export const userLogin = (data) => axios.post("/user/login", data);

export const getBookingDetails = async (bookingId) => {
  return await axios.get(`/user/booking/${bookingId}`);
};

export const createRazorpayOrder = (amount) => {
  return axios.post("/payment/create-order", { amount });
};

export const sentContactMail = (data) => {
  return axios.post("/user/send",data);
};


export const verifyPaymentAndCreateBooking = (data) => {
  return axios.post("/payment/verifyPayment-createOrder", data);
};

export const getUserProfile = () => axios.get("/user/profile");

export const updateUserProfile = (data) => axios.put("/user/profile", data);

export const getVisiblePackages = ({ search = "", location = "", sort = "", page = 1, limit = 6 }) =>
  axios.get("/user/packages", {
    params: {
      search,
      location,
      sort,
      page,
      limit,
    },
  });

export const getSinglePackage = async (id) => {
  return await axios.get(`/user/package/${id}`);
};

export const getProfileAndBookings = async () => {
  return await axios.get(`/user/my-bookings`);
};


export const getAllUsers = (page, limit, search) =>
  axios.get("/admin/getUsers", {
    params: {
      page,
      limit,
      search,
    },
  });

export const toggleBlockUser = (userId) => {
  return axios.post(`/admin/toggle-block/${userId}`);
};

export const addNewPackage = (data) => axios.post("/admin/packages", data);

export const getPackages = ({ search = "", location = "", sort = "", page = 1, limit = 6 }) =>
  axios.get("/admin/packages", {
    params: {
      search,
      location,
      sort,
      page,
      limit,
    },
  });


export const deletePackageById = (id) =>
  axios.delete(`/admin/delete-package/${id}`);

export const deletePackageImage = (packageId, public_id) =>
  axios.delete('/admin/delete-package-image', {
    params: { packageId, public_id },
  });
export const togglePackageVisibility = async (id) => {
  return await axios.post("/admin/packages/toggle-visibility", { id });
};

export const fetchAdminBookings = async (search = "", page = 1) => {
  return await axios.get("/admin/bookings", {
    params: { search, page },
  });
};

export const updateBookingStatus = async (bookingId, bookingStatus) => {
  return await axios.put(`/admin/bookings/${bookingId}/status`, {
    bookingStatus,
  });
};
export const getDashboardStats = async () => {
  const response = await axios.get("/admin/dashboard");
  return response.data;
};