import os
from processing.ocr_module import preprocessingAndOCR
from processing.extraction import information_Extraction
from processing.prediction import vectorizer_CategoryPredictor
from PIL import Image


def process_path(input_path):
    print("📡 Watching for new uploads...")
    if os.path.isdir(input_path):
        image_files = [
            os.path.join(input_path, f)
            for f in os.listdir(input_path)
            if f.lower().endswith((".png", ".jpg", ".jpeg"))
        ]
    else:
        image_files = [input_path]

    for image_path in image_files:

        img = Image.open(image_path)

        # Step 1: OCR
        text = preprocessingAndOCR(img)
        print(f"✅ OCR Done")

        # Step 2: Extract info
        extracted_info = information_Extraction(
            "Amazon 12 Jan 2025 total 5000 this is description "
        )
        print("✅ Info Extracted")

        # Step 3: Predict + Write to CSV

        desc = extracted_info.get("description")
        source = extracted_info.get("source")
        vectorizer_CategoryPredictor(desc, source)
        print(f"✅ Prediction & CSV Updated")


if __name__ == "__main__":

    upload_path = "uploads"

    process_path(upload_path)
