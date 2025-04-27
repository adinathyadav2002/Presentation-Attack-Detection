import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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

      // Show toast for successful file selection
      showToast("Image selected successfully!", "success");
    }
  };

  // Show toast notification
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Handle Image Upload and Prediction
  const handleUpload = async () => {
    if (!file) {
      showToast("Please upload an image first.", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://presentation-attack-detection-rrwl.onrender.com/predict",
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
          timestamp: new Date().toLocaleString(),
        },
        ...prevHistory,
      ]);

      // Show success toast
      showToast(`Prediction complete: ${response.data.prediction}`, "success");

      // Clear file input
      setFile(null);
      setPreview(null);
      setFileName("");
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Error processing image. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete an image from history
  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
    showToast("Record deleted successfully", "info");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Iris Liveness Detection
        </h1>

        {/* File Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center ${
              file ? "border-indigo-400 bg-indigo-50" : "border-gray-300"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              {!preview ? (
                <>
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-700">
                    Drag & Drop or Click to Upload
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports JPG, PNG, JPEG files
                  </p>
                </>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg border shadow-md mx-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white font-medium">Change Image</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {fileName && (
            <div className="mt-3 flex items-center justify-center text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="truncate max-w-xs">{fileName}</p>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`px-8 py-3 rounded-lg font-medium text-white shadow-md flex items-center justify-center w-48 transition-all ${
              loading || !file
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Analyze Image"
            )}
          </button>
        </div>

        {/* Prediction Result */}
        {result && (
          <div className="mb-8 p-5 bg-white border shadow-md rounded-xl overflow-hidden transform transition-all">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Analysis Result
            </h2>
            <div
              className={`text-center p-3 rounded-lg ${
                result === "Real"
                  ? "bg-green-100 border border-green-200"
                  : "bg-red-100 border border-red-200"
              }`}
            >
              <p className="text-xl font-bold">
                <span
                  className={
                    result === "Real" ? "text-green-600" : "text-red-600"
                  }
                >
                  {result === "Real" ? "✓ Real" : "✗ Fake"}
                </span>
              </p>
              <p className="text-sm mt-1 text-gray-600">
                {result === "Real"
                  ? "This appears to be a real, live iris scan."
                  : "This appears to be a presentation attack."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl mt-6 p-6 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Previous Detections
          </h2>

          <div className="overflow-y-auto max-h-80 pr-2 space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={`Detection ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border shadow-sm"
                  />
                  <div>
                    <p className="text-sm text-gray-500">{item.timestamp}</p>
                    <p className="text-gray-800 font-medium truncate max-w-xs">
                      {item.name}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.prediction === "Real"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.prediction}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete record"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white flex items-center animate-fade-in-up ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          <span className="mr-2">
            {toast.type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : toast.type === "error" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          {toast.message}
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Upload;
