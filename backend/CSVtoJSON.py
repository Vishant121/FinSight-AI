from flask import Flask, jsonify
import csv

from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    transactions = []
    with open('processed_data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            
            transactions.append(row)

    return jsonify(transactions)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
