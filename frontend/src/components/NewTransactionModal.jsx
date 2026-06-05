import React, { useState } from "react";
import axios from "axios";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  zIndex: 1000,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 999,
};

function NewTransactionModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Uploaded successfully!");
      console.log(res.data);
      setTimeout(() => {
        onClose(); // Close the modal
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <h2 className="font-bold">Upload New Transaction</h2>
        <div className="bg-gray-300 ">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <br />
        <br />
        <button
          onClick={handleUpload}
          className="bg-orange-400 p-2 rounded text-white"
        >
          Upload Image
        </button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
        <p>{message}</p>
      </div>
    </>
  );
}

export default NewTransactionModal;
