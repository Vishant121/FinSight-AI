import cv2
import numpy as np
from datetime import datetime
import pandas as pd


from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential

import os

endpoint = os.getenv("AZURE_ENDPOINT")
key = os.getenv("AZURE_KEY")

if not endpoint or not key:
    raise ValueError(
        "AZURE_ENDPOINT and AZURE_KEY must be set in environment variables."
    )

def preprocessingAndOCR(img):
    """Input : Image
    Processing: Image Preprocessing and OCR
    Output : OCR text"""

    # image preprocessing

    # Step 1: Read the input image
    image = cv2.imread(img)  # Replace with your image path
    # cv2.imshow('Original', image)
    # cv2.waitKey(0)

    # Step 2: Convert to Grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Step 3: Noise Removal using bilateral filter (preserves edges)
    denoised = cv2.bilateralFilter(gray, d=9, sigmaColor=75, sigmaSpace=75)

    # Step 4: Contrast Enhancement using CLAHE (Contrast Limited Adaptive Histogram Equalization)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    contrast_enhanced = clahe.apply(denoised)

    def deskew(image):
        # Convert to grayscale if it's a color image
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image

        # Threshold the image (binary inverse: text = white, background = black)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

        # Get image moments
        moments = cv2.moments(thresh)

        # Calculate skew based on central moments
        if moments["mu02"] == 0:
            return image  # No skew detected

        skew = moments["mu11"] / moments["mu02"]

        # Compute affine transform to deskew
        M = np.float32([[1, skew, -0.5 * skew * image.shape[0]], [0, 1, 0]])
        deskewed = cv2.warpAffine(
            image, M, (image.shape[1], image.shape[0]), flags=cv2.INTER_LINEAR
        )

        return deskewed

    deskewed = deskew(contrast_enhanced)

    # Optional: Save the processed image
    cv2.imwrite("processed_for_ocr.jpg", deskewed)

    # Create an Image Analysis client
    client = ImageAnalysisClient(endpoint=endpoint, credential=AzureKeyCredential(key))

    # [START read]
    # Load image to analyze into a 'bytes' object
    image = "processed_for_ocr.jpg"
    with open(image, "rb") as f:
        image_data = f.read()

    # Extract text (OCR) from an image stream. This will be a synchronously (blocking) call.
    result = client.analyze(
        image_data=image_data, visual_features=[VisualFeatures.READ]
    )

    # OCR text
    cell_counter = 0
    line_text = ""
    full_text = ""
    if result.read is not None:
        for line in result.read.blocks[0].lines:
            full_text += line.text + "\n"  # Append each line on a new line
            cell_text = f"{line.text},"
            line_text = line_text + cell_text
            cell_text = ""
            cell_counter += 1
    return full_text
