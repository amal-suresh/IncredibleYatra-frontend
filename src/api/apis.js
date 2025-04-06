import axios from "../lib/axiosInstance";


export const userRegister = (data) => axios.post("/user/register",data);
export const userLogin = (data) => axios.post("/user/login",data);



export const getUserProfile = () => axios.get("/user/profile");

export const updateUserProfile = (data) => axios.put("/user/profile", data);
