import os
import time
from gemini_script import generate_json_from_image, extract_json_from_response, normalize_transaction_data, save_json_to_csv

UPLOAD_DIR = "uploads"
PROCESSED_DIR = "processed"

# Ensure processed folder exists
os.makedirs(PROCESSED_DIR, exist_ok=True)

def get_unprocessed_images():
    images = [f for f in os.listdir(UPLOAD_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    unprocessed = [img for img in images if not os.path.exists(os.path.join(PROCESSED_DIR, img))]
    return unprocessed

def process_image(image_file):
    image_path = os.path.join(UPLOAD_DIR, image_file)
    print(f"✅ OCR Done")
    try:
        json_result = generate_json_from_image(image_path)
        print("\n✅ Info Extracted\n")
        parsed_result = extract_json_from_response(json_result)
        json_data = normalize_transaction_data(parsed_result)
        save_json_to_csv(json_data)
        # Move to processed folder to avoid reprocessing
        os.rename(image_path, os.path.join(PROCESSED_DIR, image_file))
        print(f"✅ Prediction & CSV Updated\n")
    except Exception as e:
        print(f"❌ Error processing {image_file}: {e}")

def watch_folder(poll_interval=5):
    print("📡 Watching for new uploads...")
    while True:
        unprocessed_images = get_unprocessed_images()
        for img in unprocessed_images:
            process_image(img)
        time.sleep(poll_interval)

if __name__ == "__main__":
    watch_folder()
