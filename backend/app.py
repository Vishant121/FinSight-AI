from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")  # Allow React frontend

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save file
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    print(f"✅ File saved to: {filepath}")
    return jsonify({'message': 'File uploaded successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
