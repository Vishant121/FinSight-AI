# FinSight — AI-Based Automated Financial Document Processor & Analyser

> Turn invoices, receipts, salary slips, and bank statements into clean, structured, visual financial insights — automatically.

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black">
  <img alt="Gemini" src="https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google&logoColor=white">
  <img alt="Recharts" src="https://img.shields.io/badge/Recharts-Visualization-FF6384">
  <img alt="OpenCV" src="https://img.shields.io/badge/OpenCV-Image%20Processing-5C3EE8?logo=opencv&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Results](#results)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Overview

**FinSight** is an AI-powered system that automates the tedious, error-prone process of reading and analysing financial documents. Instead of manually keying in amounts, dates, and vendor details from receipts and invoices, FinSight extracts that information for you, structures it, and presents it through an interactive dashboard.

The pipeline pairs classical computer-vision preprocessing and OCR with **Google Gemini 2.5 Flash** for intelligent, context-aware extraction of key financial fields. The processed data is served to a **React.js** frontend and visualised with **Recharts**, giving users a clear picture of their spending and financial activity.

This project was developed as a final-year B.Tech project in the Department of Computer Science & Engineering, Bipin Tripathi Kumaon Institute of Technology, Dwarahat.

---

## Key Features

- **Multi-format document support** — works with JPEG, PNG, TIFF images and PDF files.
- **Image preprocessing** — grayscaling, binarization, noise removal, erosion/dilation, and deskewing for higher OCR accuracy.
- **OCR text extraction** — converts scanned/photographed documents into machine-readable text using PyTesseract.
- **AI-powered field extraction** — uses **Gemini 2.5 Flash** to intelligently pull key details (amounts, dates, vendor names, invoice numbers) with contextual understanding, going beyond rigid regex rules.
- **NLP text cleaning** — tokenization, stopword removal, lemmatization, and normalization to standardise extracted text.
- **Structured output** — exports clean data to JSON / CSV / Excel for downstream use.
- **Interactive dashboard** — a React.js + Recharts UI for visualising expenses, trends, and category breakdowns.

---

## How It Works

```
┌──────────────┐   ┌──────────────────┐   ┌───────────────┐   ┌────────────────────┐
│  Document    │ → │   Preprocessing   │ → │   OCR (Text    │ → │   Gemini 2.5 Flash  │
│   Upload     │   │  (OpenCV)         │   │   Extraction)  │   │  Key-Detail Extract │
└──────────────┘   └──────────────────┘   └───────────────┘   └────────────────────┘
                                                                          │
        ┌──────────────────┐   ┌────────────────────┐   ┌───────────────┘
        │  React + Recharts │ ← │  Structured Data   │ ← │   NLP Cleaning  │
        │    Dashboard      │   │  (JSON / CSV)      │   │  & Normalization│
        └──────────────────┘   └────────────────────┘   └─────────────────┘
```

1. **Upload** — the user uploads a financial document through the web interface.
2. **Preprocess** — OpenCV enhances the image (grayscale, denoise, deskew, thin/thicken text).
3. **Extract text and key fields ** — Gemini 2.5 Flash interprets the text and returns structured key fields.
4. **Clean** — NLP routines normalise and tidy the extracted text.
5. **Visualise** — structured data is sent to the React frontend and rendered as charts via Recharts.

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js, Recharts, Axios |
| **Backend / API** | Python, Flask *(or FastAPI)* |
| **AI / Extraction** | Google Gemini 2.5 Flash |
| **OCR** | PyTesseract (Tesseract OCR engine) |
| **Image Processing** | OpenCV, Pillow, NumPy |
| **NLP** | spaCy, NLTK |
| **Data Handling** | Pandas |
| **Tooling** | Git, GitHub, Jupyter Notebook |

> Replace Flask/FastAPI above with whichever framework your backend actually uses.

---

## Project Structure

```
finsight/
├── backend/
│   ├── app.py                  # API entry point
│   ├── requirements.txt        # Python dependencies
│   ├── modules/
│   │   ├── preprocessing.py    # OpenCV image preprocessing
│   │   ├── ocr.py              # PyTesseract text extraction
│   │   ├── gemini_extract.py   # Gemini 2.5 Flash field extraction
│   │   └── nlp_processing.py   # NLP text cleaning
│   └── data/
│       ├── raw_images/         # Uploaded documents
│       └── extracted/          # Structured output (JSON/CSV)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components (upload, charts, tables)
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── ...
│
├── .env.example                # Sample environment variables
├── .gitignore
├── LICENSE
└── README.md
```

> Adjust this tree to match your actual repository layout.

---

## Getting Started

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm
- **Tesseract OCR** installed on your system
  - Windows: download from the [Tesseract releases](https://github.com/UB-Mannheim/tesseract/wiki)
  - Ubuntu: `sudo apt install tesseract-ocr`
  - macOS: `brew install tesseract`
- A **Google Gemini API key** ([Google AI Studio](https://aistudio.google.com/))

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Vishant121/finsight.git
cd finsight/backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp ../.env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run the API
python app.py
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev      # or: npm start
```

The app will be available at `http://localhost:3000` (frontend) with the API running at `http://localhost:5000`.

#### Environment Variables (`.env`)

```env
GEMINI_API_KEY=your_api_key_here
TESSERACT_CMD=/usr/bin/tesseract     # path to your Tesseract binary
```

---

## Usage

1. Open the web app in your browser.
2. Upload a financial document (image or PDF).
3. FinSight preprocesses the image, runs OCR, and extracts key fields via Gemini.
4. View the structured data and interactive charts on the dashboard.
5. Export the results as CSV / Excel if needed.

---

## Results

Performance observed during evaluation on a mixed dataset of financial documents:

| Component | Accuracy |
|-----------|----------|
| OCR (clear, high-quality scans) | ~95% |
| OCR (low-quality / noisy scans) | ~85% |
| Key information extraction | ~92% |
| Lemmatization | ~92% |
| Text normalization | ~88% |
| **Overall pipeline** | **~90%** |

> Note: these figures are from the OCR + regex baseline in the original project report. Re-benchmark after integrating Gemini 2.5 Flash, as AI-based extraction typically improves contextual accuracy on non-standard layouts.

*(Add screenshots of your dashboard here — e.g. `docs/dashboard.png` — to make the README more compelling.)*

---

## Roadmap

- [ ] Automatic document classification (invoice / receipt / salary slip / bank statement)
- [ ] Improved handling of complex multi-column and tabular layouts
- [ ] Named Entity Recognition (NER) for richer financial entity extraction
- [ ] Real-time data integration with external financial sources
- [ ] Cloud deployment (AWS / Azure / GCP) for scalability
- [ ] End-to-end encryption and user authentication for sensitive data

---

## Contributors

| Name | Roll No. |
|------|----------|
| **Vishant Choudhary** | 210180101060 |
| **Manpreet Singh** | 210180101033 |
| **Pramod Bhandari** | 210180101045 |

**Project Guide:** Dr. R.K. Bharti, Assistant Professor, Department of CSE

---

## Acknowledgements

- **Dr. R.K. Bharti** for invaluable guidance and mentorship throughout the project.
- The faculty and staff of the **Department of Computer Science & Engineering, Bipin Tripathi Kumaon Institute of Technology, Dwarahat**.
- Open-source projects that made this work possible: Tesseract, OpenCV, spaCy, React, and Recharts.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Developed as a final-year project at Bipin Tripathi Kumaon Institute of Technology, Dwarahat</p>
