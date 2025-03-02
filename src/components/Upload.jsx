import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]); // Store previous predictions

  // Handle File Selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle Image Upload and Prediction
  const handleUpload = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data.prediction);

      // Save result in history
      setHistory((prevHistory) => [
        {
          image: preview,
          name: fileName,
          prediction: response.data.prediction,
        },
        ...prevHistory,
      ]);

      // Clear file input
      setFile(null);
      setPreview(null);
      setFileName("");
    } catch (error) {
      console.error("Error uploading image:", error);
      setResult("Error occurred!");
    }
  };

  // Delete an image from history
  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Detect Image</h1>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 bg-gray-200 cursor-pointer rounded-lg border border-gray-400 text-center"
      />

      {/* Image Name */}
      {fileName && <p className="mb-2 text-gray-700">{fileName}</p>}

      {/* Image Preview */}
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Uploaded Preview"
            className="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-lg"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Predict
      </button>

      {/* Prediction Result */}
      {result && (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg w-80 text-center">
          <p className="text-xl font-semibold">
            Prediction:{" "}
            <span
              className={`${
                result === "Real" ? "text-green-600" : "text-red-600"
              }`}
            >
              {result}
            </span>
          </p>
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-8 w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-3">
            Previous Predictions
          </h2>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={`Prediction ${index}`}
                    className="w-16 h-16 object-cover rounded-lg border mr-4"
                  />
                  <div>
                    <p className="text-gray-700 font-medium">{item.name}</p>
                    <p
                      className={`text-lg font-semibold ${
                        item.prediction === "Real"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.prediction}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
