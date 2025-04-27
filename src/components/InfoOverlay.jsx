import { useState, useEffect } from "react";

function InfoOverlay() {
  const [countdown, setCountdown] = useState(10);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-close after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 10) * 100}%` }}
          ></div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
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
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Important Notice
            </h2>
          </div>

          <div className="space-y-3 text-gray-700">
            <p className="font-medium">
              This application's backend is hosted on Render's free tier, which
              means:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-medium">Initial delay:</span> The first
                analysis may take 30-60 seconds as the server "wakes up" from
                sleep mode.
              </li>
              <li>
                <span className="font-medium">Sleep mode:</span> The backend
                goes to sleep after 15 minutes of inactivity to conserve
                resources.
              </li>
              <li>
                <span className="font-medium">Processing time:</span> Please be
                patient during the first request while the server initializes.
              </li>
              <li>
                <span className="font-medium">Subsequent requests:</span> After
                the initial wake-up, all following requests will be much faster.
              </li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              This is a limitation of the free hosting tier and not an issue
              with the application itself.
            </p>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleClose}
              className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center"
            >
              <span>I understand</span>
              <span className="ml-2 bg-white bg-opacity-30 rounded-full h-6 w-6 flex items-center justify-center text-xs">
                {countdown}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoOverlay;
