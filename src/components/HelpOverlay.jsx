import { useEffect } from "react";

function HelpOverlay({ isOpen, onClose }) {
  // Close on escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            How to Use Presentation Attack Detection
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
            aria-label="Close help overlay"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Start Guide */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-3">
              Quick Start Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-3 mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h4 className="font-medium text-center mb-2">Upload Image</h4>
                <p className="text-sm text-gray-600 text-center">
                  Click or tap the upload area to select an iris image from your
                  device.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-3 mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h4 className="font-medium text-center mb-2">Analyze Image</h4>
                <p className="text-sm text-gray-600 text-center">
                  Click "Analyze Image" button to run the presentation attack
                  detection algorithm.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-3 mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h4 className="font-medium text-center mb-2">View Results</h4>
                <p className="text-sm text-gray-600 text-center">
                  View the prediction result showing whether the iris image is
                  "Real" or "Fake".
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Instructions */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-3">
              Detailed Instructions
            </h3>
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  Uploading Images
                </h4>
                <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-1">
                  <li>
                    Click on the designated upload area to open file explorer
                  </li>
                  <li>
                    Select an iris image from your device (JPG, PNG, or JPEG
                    formats)
                  </li>
                  <li>A preview of your selected image will appear</li>
                  <li>To change image, click on the preview image again</li>
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Processing & Results
                </h4>
                <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-1">
                  <li>
                    Click the "Analyze Image" button to submit the image for
                    processing
                  </li>
                  <li>
                    Wait while the system analyzes the image (typically a few
                    seconds)
                  </li>
                  <li>
                    Results will appear showing "Real" (authentic iris) or
                    "Fake" (presentation attack)
                  </li>
                  <li>
                    All results are automatically saved to your history for
                    reference
                  </li>
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  History Management
                </h4>
                <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-1">
                  <li>
                    Previous detection results are stored in the "Previous
                    Detections" section
                  </li>
                  <li>
                    Each entry includes the image, filename, detection result,
                    and timestamp
                  </li>
                  <li>
                    Click the trash icon to delete any unwanted history entry
                  </li>
                  <li>History is maintained during your current session</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test Dataset Section */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-3">
              Test Dataset
            </h3>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                You can access test images from our GitHub repository. The
                dataset contains both real iris images and various presentation
                attack samples.
              </p>
              <div className="bg-white p-3 rounded border border-gray-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <a
                  href="https://github.com/yourusername/presentation-attack-detection/tree/main/test-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-medium break-all"
                >
                  https://github.com/yourusername/presentation-attack-detection/tree/main/test-images
                </a>
              </div>
            </div>
          </div>

          {/* Understanding Results */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-3">
              Understanding Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-green-700">Real</h4>
                </div>
                <p className="text-sm text-gray-700">
                  A "Real" result indicates that the system detected a live,
                  authentic iris scan. This suggests the image is of a real
                  person's eye captured during a genuine iris scanning process.
                </p>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-red-700">Fake</h4>
                </div>
                <p className="text-sm text-gray-700">
                  A "Fake" result indicates a possible presentation attack. This
                  could be a printed image, display screen, prosthetic eye,
                  contact lens, or other artificial representation of an iris.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-2xl border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Close Help
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpOverlay;
