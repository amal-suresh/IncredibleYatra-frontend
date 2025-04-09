import React, { useState, useEffect } from "react";
import PackageFormModal from "../../components/PackageFormModal";
import Pagination from "../../components/Pagination";
import PackageCardAdmin from "../../components/PackageCardAdmin";
import {
  addNewPackage,
  deletePackageById,
  getPackages,
  togglePackageVisibility,
} from "../../api/apis";
import { uploadImagesToCloudinary } from "../../../utils/cloudinaryUpload";
import toast, { Toaster } from "react-hot-toast";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    pricePerPerson: "",
    location: "",
    images: [],
  });
  const [totalPages, setTotalPages] = useState(1);
  const [editingPackage, setEditingPackage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await getPackages({
        search: searchTerm,
        location: "",
        sort: sortOrder === "asc" ? "price_asc" : "price_desc",
        page: currentPage,
        limit: 6,
      });
      setPackages(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [searchTerm, sortOrder, currentPage]);

  const toggleVisibility = async (id) => {
    const toastId = toast.loading("Toggling visibility...");
    try {
      const res = await togglePackageVisibility(id);
      const updatedVisibility = res.data.isVisible;
  
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg._id === id ? { ...pkg, isVisible: updatedVisibility } : pkg
        )
      );
  
      toast.success("Visibility updated", { id: toastId });
    } catch (error) {
      console.error("Error toggling visibility:", error);
      toast.error("Failed to update visibility", { id: toastId });
    }
  };
  
  

  const deletePackage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting package...");
    try {
      await deletePackageById(id);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete package", { id: toastId });
    }
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setFormData({
      title: "",
      pricePerPerson: "",
      description: "",
      duration: "",
      location: "",
      images: [],
    });
    setModalOpen(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setModalOpen(true);
  };

  const handleSave = async () => {
    const toastId = toast.loading(editingPackage ? "Updating package..." : "Creating package...");
    try {
      let updatedImages = [];

      if (editingPackage) {
        const newImages = formData.images.filter((img) => img instanceof File);
        const existingImages = formData.images.filter((img) => !(img instanceof File));
        const uploadedNewImages = await uploadImagesToCloudinary(newImages);
        updatedImages = [...existingImages, ...uploadedNewImages];

        const updatedPackageData = {
          ...formData,
          images: updatedImages,
          _id: editingPackage._id,
        };

        await addNewPackage(updatedPackageData);
        toast.success("Package updated successfully", { id: toastId });
      } else {
        const uploadedImages = await uploadImagesToCloudinary(formData.images);
        const newPackageData = { ...formData, images: uploadedImages };
        await addNewPackage(newPackageData);
        toast.success("Package created successfully", { id: toastId });
      }

      fetchPackages();
    } catch (error) {
      toast.error("Failed to save package", { id: toastId });
    } finally {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [searchTerm, totalPages]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <Toaster position="top-right" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold text-[#191970]">
          Package Management
        </h2>
        <button
          className="bg-[#191970] text-white px-4 py-2 rounded-xl hover:bg-[#15155c]"
          onClick={handleAdd}
        >
          + Add Package
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="px-4 py-2 border rounded-xl w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-xl"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading packages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <PackageCardAdmin
              key={pkg._id}
              pkg={pkg}
              onEdit={() => handleEdit(pkg)}
              onDelete={() => deletePackage(pkg._id)}
              onToggleVisibility={() => toggleVisibility(pkg._id)}
            />
          ))}
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <PackageFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingPackage}
      />
    </div>
  );
};

export default PackageManagement;
