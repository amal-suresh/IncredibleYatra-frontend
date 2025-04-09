export const uploadImagesToCloudinary = async (files) => {
  const uploads = await Promise.all(
    Array.from(files).map(async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "tour_packages_preset");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });

      console.log(res,"res");
      

      const result = await res.json();

      return {
        url: result.secure_url,
        public_id: result.public_id,
        alt: file.name,
      };
    })
  );

  return uploads;
};
