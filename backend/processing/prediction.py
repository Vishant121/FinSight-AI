import numpy as np
from datetime import datetime
import joblib
import pandas as pd
import os
import csv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "Models")

best_nb_model_path = os.path.join(MODELS_DIR, "naive_bayes_type_tuned_model.pkl")
best_nb_model_cat_path = os.path.join(
    MODELS_DIR, "naive_bayes_category_tuned_model.pkl"
)
type_encoder_path = os.path.join(MODELS_DIR, "type_encoder.pkl")
category_encoder_path = os.path.join(MODELS_DIR, "category_encoder.pkl")
tfidf_path = os.path.join(MODELS_DIR, "tfidf_vectorizer.pkl")
source_encoder_path = os.path.join(MODELS_DIR, "source_encoder.pkl")

# --- Load models and encoders ---


def vectorizer_CategoryPredictor(Date, Amount, Description, Source):
    best_nb_model = joblib.load(best_nb_model_path)
    best_nb_model_cat = joblib.load(best_nb_model_cat_path)
    type_encoder = joblib.load(type_encoder_path)
    category_encoder = joblib.load(category_encoder_path)
    tfidf = joblib.load(tfidf_path)
    source_encoder = joblib.load(source_encoder_path)

    #    new data for testing
    new_data = pd.DataFrame(
        {
            "Description": [Description],
            "Source": [Source],
        }
    )

    # Step 1: Apply TF-IDF to Description
    new_tfidf_matrix = tfidf.transform(new_data["Description"]).toarray()
    new_tfidf_df = pd.DataFrame(new_tfidf_matrix, columns=tfidf.get_feature_names_out())

    # Step 2: Apply One-Hot Encoding to Source
    new_source_encoded = source_encoder.transform(new_data[["Source"]])
    new_source_df = pd.DataFrame(
        new_source_encoded, columns=source_encoder.get_feature_names_out(["Source"])
    )

    # Step 3: Combine TF-IDF and Source features for Type prediction
    X_new_type = pd.concat(
        [new_tfidf_df.reset_index(drop=True), new_source_df.reset_index(drop=True)],
        axis=1,
    )

    # Step 4: Predict Type (encoded), then decode it
    predicted_type_encoded = best_nb_model.predict(X_new_type)
    # Manually map integers to category names
    type_mapping = {0: "Income", 1: "Saving", 2: "Expense"}
    predicted_type_label = type_mapping.get(predicted_type_encoded[0], "Unknown")

    # Step 5: Prepare input for Category prediction (add predicted Type as feature)
    predicted_type_encoded_df = pd.DataFrame(
        predicted_type_encoded, columns=["Type_Encoded"]
    )
    X_new_category = pd.concat(
        [
            new_tfidf_df.reset_index(drop=True),
            new_source_df.reset_index(drop=True),
            predicted_type_encoded_df.reset_index(drop=True),
        ],
        axis=1,
    )

    # Step 6: Predict Category and decode
    predicted_category_encoded = best_nb_model_cat.predict(X_new_category)
    predicted_category_label = category_encoder.inverse_transform(
        predicted_category_encoded
    )[0]

    # -------------------------------------------------------------

    # put the data into csv
    # File name
    csv_file = "processed_data.csv"

    # Check if file exists and is non-empty
    write_header = not os.path.isfile(csv_file) or os.path.getsize(csv_file) == 0

    # Append to the file
    with open(csv_file, mode="a", newline="") as file:
        writer = csv.writer(file)

        # Write header if needed
        if write_header:
            writer.writerow(["Date", "Amount", "Type", "Category"])

        # Write the data
        writer.writerow([Date, Amount, predicted_type_label, predicted_category_label])


vectorizer_CategoryPredictor("2.2", "5", "this is description ", "Source ")
