import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { addImageDetail } from "../../redux/action/form/collegeForm";

const ImageUpload: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const imageArray = useAppSelector((state) => state.form?.imageArray);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        // Dispatch the action for each selected file
        dispatch(addImageDetail(file));
      });
      const imageFiles = Array.from(files);
      setSelectedImages(imageFiles);

      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(imageUrls);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedImages.length > 0) {
      const formData = new FormData();
      selectedImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      // Call the uploadResult function with formData
      try {
        const result = await uploadResult(formData);
        console.log("Upload successful", result);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={styles.input}
        />
        {/* <button type="submit" style={styles.button}>
          Upload Images
        </button> */}
      </form>
      {/* {previewUrls.length > 0 && (
        <div style={styles.previewContainer}>
          <h4 style={styles.previewTitle}>Image Previews:</h4>
          <div style={styles.previewImagesContainer}>
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Selected ${index}`}
                style={styles.previewImage}
              />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  input: {
    // marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  previewContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  previewTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#333",
  },
  previewImage: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default ImageUpload;
function uploadResult(formData: FormData) {
  throw new Error("Function not implemented.");
}
