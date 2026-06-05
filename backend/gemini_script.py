import os
import json
import pandas as pd
from dotenv import load_dotenv
from google import genai
from google.genai import types
from datetime import datetime
import json
import re
import csv

# Load environment variables
load_dotenv()

def load_image(image_path):
    with open(image_path, "rb") as f:
        return f.read()

def generate_json_from_image(image_path):
    image_data = load_image(image_path)

    prompt = """
You are a financial document processor. Extract the following fields from the image:
- date (write date in DD/MM/YYYY format)
- amount
- year (from the date)
- type: one of [income, saving, expense]
- category (based on type): Write the sub type of 'type of document' 

Return the output as valid JSON.
"""

    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part(text=prompt),
                types.Part(
                    inline_data=types.Blob(
                        mime_type="image/jpeg",
                        data=image_data
                    )
                )
            ]
        )
    ]

    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
    )

    full_response = ""
    for chunk in client.models.generate_content_stream(
        model="gemini-1.5-flash",
        contents=contents,
        config=generate_content_config,
    ):
        full_response += chunk.text
    return full_response.strip()



def extract_json_from_response(response_text: str) -> dict:
    try:
        # Extract JSON between ```json and ```
        match = re.search(r"```json\s*(\{.*?\})\s*```", response_text, re.DOTALL)
        if match:
            json_str = match.group(1)
            return json.loads(json_str)
        else:
            # Fallback: Try to load any valid JSON directly if no code block found
            return json.loads(response_text.strip())
    except Exception as e:
        print("❌ Failed to extract or parse JSON:", e)
        return None
    


def normalize_transaction_data(data):
    """
    Converts 'date' from string (e.g. '05.08.2024') to datetime.date,
    and 'amount' from string (e.g. '349.00') to int.
    
    Args:
        data (dict): Dictionary with keys like 'date', 'amount', etc.
    
    Returns:
        dict: Normalized dictionary with correct data types.
    """
    result = data.copy()
    
    # Normalize date
    try:
        result['date'] = datetime.strptime(result['date'], "%d.%m.%Y").date()
    except Exception as e:
        print(f"⚠️ Could not convert date: {result.get('date')}, error: {e}")

    # Normalize amount
    try:
        result['amount'] = int(float(result['amount']))
    except Exception as e:
        print(f"⚠️ Could not convert amount: {result.get('amount')}, error: {e}")
    
    return result






def save_json_to_csv(json_data, csv_filename="processed_data.csv"):
    """
    Append JSON data (list of dictionaries) to a CSV file.

    Args:
        json_data (list or dict): A list of dictionaries or a single dictionary to append.
        csv_filename (str): The path of the CSV file to write.
    """
    if isinstance(json_data, dict):
        json_data = [json_data]

    if not json_data:
        print("No data to save.")
        return

    headers = json_data[0].keys()
    file_exists = os.path.isfile(csv_filename)

    with open(csv_filename, mode='a', newline='', encoding='utf-8') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=headers)

        # Only write header if file doesn't already exist
        if not file_exists or os.stat(csv_filename).st_size == 0:
            writer.writeheader()

        for entry in json_data:
            writer.writerow(entry)

    print(f"✅ Appended data to {csv_filename}")




def main(image_path):
    print("📤 Sending image to Gemini Flash...")
    json_result = generate_json_from_image(image_path)
    print("\n📥 Gemini Flash JSON Output:\n", json_result)
    parsed_result = extract_json_from_response(json_result)
    json_data= normalize_transaction_data(parsed_result)
    save_json_to_csv(json_data)

if __name__ == "__main__":
    image_path = "./uploads/img4.jpg"  # Change this to your image file
    main(image_path)
