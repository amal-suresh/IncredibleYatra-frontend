import React, { useEffect, useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { deletePackageImage } from "../api/apis";
import toast from "react-hot-toast";

const PackageFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing,
}) => {
  const fileInputRef = useRef();


  useEffect(() => {
    if (!isOpen) {
      setFormData((prev) => ({ ...prev, images: [] }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && (!formData.images || !Array.isArray(formData.images))) {
      setFormData((prev) => ({ ...prev, images: [] }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
  };

  const handleDeleteImage = async (index, e, img) => {
    e.preventDefault();
  
    const isUploadedImage = img?.url && img?.public_id;
  
    await toast.promise(
      (async () => {
        if (isUploadedImage) {
          await deletePackageImage(formData._id, img.public_id);
        }
  
        const newImages = Array.isArray(formData.images)
          ? formData.images.filter((_, i) => i !== index)
          : [];
  
        setFormData((prev) => ({ ...prev, images: newImages }));
      })(),
      {
        loading: 'Deleting image...',
        success: 'Image deleted successfully!',
        error: 'Failed to delete image.',
      }
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.title || !formData.pricePerPerson) return;
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Package" : "Add New Package"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
              placeholder="Enter package title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Price per Person (₹)
            </label>
            <input
              type="number"
              name="pricePerPerson"
              value={formData.pricePerPerson || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
              placeholder="Enter price"
              required
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
              placeholder="e.g. 3 hours, 1 day"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
              placeholder="e.g. Kochi, Kerala"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl mt-1"
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Images</label>
            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 px-4 py-2 bg-[#191970] text-white rounded-xl hover:bg-[#15155c] transition"
              >
                <FiUpload /> Choose Images
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {Array.isArray(formData.images) && formData.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.images.map((img, index) => {
                  const isFile = img instanceof File;
                  const url = isFile ? URL.createObjectURL(img) : img.url;
                  return (
                    <div
                      key={index}
                      className="relative w-20 h-20 border rounded-lg overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={(e) => handleDeleteImage(index, e, img)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#191970] text-white px-4 py-2 rounded-xl hover:bg-[#15155c]"
            >
              {isEditing ? "Save Changes" : "Add Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageFormModal;
