from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import cv2
from skimage.feature import local_binary_pattern
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load trained ML model
model_path = "iris_liveness_model.pkl"
try:
    model = joblib.load(model_path)
    print(f"Model loaded successfully from {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Create Gabor filters (ensure correct number)


def create_gabor_filters(num_filters=20):
    filters = []
    ksize = 31

    for theta in np.arange(0, np.pi, np.pi / 4):  # 4 orientations
        for sigma in [3, 5]:  # 2 scales
            for lambd in [10, 15, 20]:  # 3 wavelengths
                for gamma in [0.3, 0.5]:  # 2 aspect ratios
                    kernel = cv2.getGaborKernel(
                        (ksize, ksize), sigma, theta, lambd, gamma, 0, ktype=cv2.CV_32F
                    )
                    kernel /= 1.5 * kernel.sum()
                    filters.append(kernel)

                    if len(filters) >= num_filters:
                        return filters

    return filters


gabor_filters = create_gabor_filters()  # Generate filters once

# Extract LBP Features


# Feature Extraction Functions
def extract_lbp_features(image, radius=3, n_points=24):
    if image is None:
        return np.zeros(n_points + 2)

    try:
        lbp = local_binary_pattern(image, n_points, radius, method="uniform")

        # Calculate the histogram of LBP
        n_bins = n_points + 2
        hist, _ = np.histogram(lbp.ravel(), bins=n_bins, range=(0, n_bins))

        # Normalize the histogram
        hist = hist.astype("float")
        hist /= (hist.sum() + 1e-7)

        return hist
    except Exception as e:
        print(f"Error extracting LBP features: {e}")
        return np.zeros(n_points + 2)

# Extract Gabor Features


def extract_gabor_features(image, filters):
    if image is None or len(filters) == 0:
        return np.zeros(len(filters) * 2)  # Return zeros if image is None

    try:
        features = []

        for kernel in filters:
            # Apply filter
            filtered = cv2.filter2D(image, cv2.CV_8UC3, kernel)

            # Calculate mean and variance
            mean = np.mean(filtered)
            var = np.var(filtered)

            features.extend([mean, var])

        return np.array(features)
    except Exception as e:
        print(f"Error extracting Gabor features: {e}")
        return np.zeros(len(filters) * 2)

# Extract Combined Features


def extract_features(image, gabor_filters):
    # Handle color images
    if image is not None and len(image.shape) == 3:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    preprocessed = image

    if preprocessed is None:
        # Return zero features if preprocessing failed
        lbp_size = 24 + 2  # n_points + 2
        gabor_size = len(gabor_filters) * 2
        return np.zeros(lbp_size + gabor_size)

    # Extract LBP features
    lbp_features = extract_lbp_features(preprocessed)

    # Extract Gabor features
    gabor_features = extract_gabor_features(preprocessed, gabor_filters)

    # Combine features
    combined_features = np.concatenate([lbp_features, gabor_features])

    return combined_features
# API Endpoint for Prediction


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read())).convert(
        "L")  # Convert to grayscale
    image = np.array(image)  # Convert to NumPy array

    # Extract features
    feature_vector = extract_features(image, gabor_filters)

    if not np.any(feature_vector):  # If all features are zero
        return jsonify({"error": "Feature extraction failed"}), 400

    feature_vector = feature_vector.reshape(1, -1)  # Reshape for prediction

    prediction = model.predict(feature_vector)[0]
    confidence = model.predict_proba(feature_vector)[0]

    result = "Real" if prediction == 0 else "Spoofed"
    confidence_real = confidence[0]
    confidence_spoof = confidence[1]

    return jsonify({
        "prediction": result,
        "confidence_real": confidence_real,
        "confidence_spoof": confidence_spoof
    })


if __name__ == "__main__":
    app.run(debug=True)
