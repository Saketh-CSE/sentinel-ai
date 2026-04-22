# app.py
# Disaster Management AI Backend

from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sys
import os
import json
import sqlite3
import firebase_admin

from firebase_admin import credentials, firestore, auth
from datetime import datetime
from typing import Any, cast

# Import AI processing
sys.path.append(os.path.dirname(__file__))
from disaster_management_ai import process_disaster_alert, AUTHORITIES_DATA

app = Flask(__name__)

# ---------------------------------------------------------
# FIXED GLOBAL CORS CONFIGURATION
# ---------------------------------------------------------

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# ---------------------------------------------------------
# SQLite DATABASE
# ---------------------------------------------------------

DATABASE = "authorities.db"

def get_db():
    db = getattr(g, "_database", None)

    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row

    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)

    if db is not None:
        db.close()


def init_db():
    with app.app_context():

        db = get_db()
        cursor = db.cursor()

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS authorities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                location TEXT NOT NULL,
                type TEXT NOT NULL
            )
            """
        )

        db.commit()
        print("Authorities database initialized")


with app.app_context():
    init_db()

# ---------------------------------------------------------
# FIREBASE SETUP
# ---------------------------------------------------------

db_firestore = None
current_user_id = None
app_id = os.getenv("__app_id", "default-app-id")

try:

    if not firebase_admin._apps:

        service_account_key_path = os.path.join(
            os.path.dirname(__file__), "serviceAccountKey.json"
        )

        if os.path.exists(service_account_key_path):

            cred = credentials.Certificate(service_account_key_path)
            firebase_admin.initialize_app(cred)

            print("Firebase initialized")

    if firebase_admin._apps:

        db_firestore = firestore.client()
        current_user_id = "local_user"

except Exception as e:

    print("Firebase initialization failed:", e)

# ---------------------------------------------------------
# FIRESTORE LOGGING
# ---------------------------------------------------------

def log_communication_to_firestore(log_data):

    if db_firestore and current_user_id:

        try:

            collection_path = f"artifacts/{app_id}/public/data/communication_logs"
            logs_ref = db_firestore.collection(collection_path)

            firestore_any = cast(Any, firestore)
            ts = getattr(firestore_any, "SERVER_TIMESTAMP", None)

            if ts is None:
                ts = datetime.utcnow()

            log_data["timestamp"] = ts
            log_data["userId"] = current_user_id

            logs_ref.add(log_data)

        except Exception as e:

            print("Firestore logging error:", e)


# ---------------------------------------------------------
# BASIC ROUTE
# ---------------------------------------------------------

@app.route("/")
def home():

    return "Disaster Management AI Backend Running"


# ---------------------------------------------------------
# DISASTER ALERT
# ---------------------------------------------------------

@app.route("/alert", methods=["POST"])
def trigger_alert():

    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    location = data.get("location")

    if not location:
        return jsonify({"error": "Missing location"}), 400

    result = process_disaster_alert(location)

    if isinstance(result, dict) and result.get("status") == "success":

        disaster_info = result.get("disaster_info", {})

        log_data = {
            "location": location,
            "disasterType": disaster_info.get("disaster_type"),
            "status": disaster_info.get("status"),
            "severity": disaster_info.get("severity"),
            "threatIndex": disaster_info.get("threat_index"),
        }

        log_communication_to_firestore(log_data)

    return jsonify(result)


# ---------------------------------------------------------
# AUTHORITIES API
# ---------------------------------------------------------

@app.route("/api/authorities", methods=["GET"])
def get_all_authorities():

    db_conn = get_db()
    cursor = db_conn.cursor()

    cursor.execute("SELECT * FROM authorities")

    authorities = cursor.fetchall()

    return jsonify([dict(row) for row in authorities])


@app.route("/api/authorities", methods=["POST"])
def add_authority():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    location = data.get("location")
    type = data.get("type")

    if not all([name, email, location, type]):
        return jsonify({"error": "Missing data"}), 400

    db_conn = get_db()
    cursor = db_conn.cursor()

    try:

        cursor.execute(
            "INSERT INTO authorities (name,email,location,type) VALUES (?,?,?,?)",
            (name, email, location, type),
        )

        db_conn.commit()

        return jsonify({"message": "Authority added", "id": cursor.lastrowid})

    except sqlite3.IntegrityError:

        return jsonify({"error": "Email already exists"}), 409


@app.route("/api/authorities/<int:authority_id>", methods=["DELETE"])
def delete_authority(authority_id):

    db_conn = get_db()
    cursor = db_conn.cursor()

    cursor.execute("DELETE FROM authorities WHERE id=?", (authority_id,))
    db_conn.commit()

    return jsonify({"message": "Authority deleted"})


# ---------------------------------------------------------
# INCIDENT REPORTS
# ---------------------------------------------------------

@app.route("/api/reports", methods=["POST"])
def submit_report():

    data = request.get_json()

    incident_type = data.get("incidentType")
    incident_location = data.get("incidentLocation")
    incident_description = data.get("incidentDescription")
    incident_severity = data.get("incidentSeverity")

    if not all(
        [incident_type, incident_location, incident_description, incident_severity]
    ):
        return jsonify({"error": "Missing report data"}), 400

    report_data = {
        "incidentType": incident_type,
        "incidentLocation": incident_location,
        "incidentDescription": incident_description,
        "incidentSeverity": incident_severity,
    }

    return jsonify({"message": "Report submitted", "report": report_data})


# ---------------------------------------------------------
# SERVER START
# ---------------------------------------------------------

if __name__ == "__main__":

    print("Starting Disaster Management Backend")
    print("API -> http://127.0.0.1:5000")

    app.run(debug=True)