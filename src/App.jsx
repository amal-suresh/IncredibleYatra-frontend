import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import UserProfile from "./pages/user/UserProfile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/Layout";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import DashboardHome from "./pages/admin/DashboardHome";
import UserManagement from "./pages/admin/UserManagement";
import PackageManagement from "./pages/admin/PackageManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />

        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="packages" element={<PackageManagement />} />
          <Route path="orders" element={<BookingManagement />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
