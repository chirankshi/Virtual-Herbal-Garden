from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Initialize app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)

# MongoDB collections
Login_SignUP_collection = mongo.db.Login_SignUP
contact_collection = mongo.db.ContactForm

# ------------------- Routes -------------------

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Herbal Garden API!"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, email, password]):
        return jsonify({"message": "All fields are required"}), 400

    if Login_SignUP_collection.find_one({'email': email}):
        return jsonify({"message": "Email already exists!"}), 400

    result = Login_SignUP_collection.insert_one({
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'password': password,  # ⚠️ In production, always hash passwords!
        'profileImage': ''
    })

    return jsonify({
        "message": "Signup successful!",
        "userId": str(result.inserted_id)
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Login_SignUP_collection.find_one({'email': email})
    if not user or user['password'] != password:
        return jsonify({"message": "Invalid email or password!"}), 401

    return jsonify({
        "message": "Login successful!",
        "userId": str(user['_id'])
    }), 200

@app.route('/user/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = Login_SignUP_collection.find_one({'_id': ObjectId(user_id)})
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "firstName": user['firstName'],
        "lastName": user['lastName'],
        "email": user['email'],
        "profileImage": user.get('profileImage', '')
    }), 200

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = Login_SignUP_collection.find_one({'email': email})
    if not user:
        return jsonify({"message": "Email not found"}), 404

    return jsonify({
        "message": "Password reset link has been sent (simulated).",
        "resetInfo": f"Your current password is: {user['password']}"
    }), 200

@app.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    required_fields = ['name', 'email', 'interest', 'message']
    if not all(data.get(field) for field in required_fields):
        return jsonify({"message": "Required fields are missing"}), 400

    contact_document = {
        'name': data.get('name'),
        'email': data.get('email'),
        'location': data.get('location'),
        'interest': data.get('interest'),
        'message': data.get('message'),
        'bookingType': data.get('bookingType'),
        'preferredDate': data.get('preferredDate'),
        'preferredTime': data.get('preferredTime')
    }

    try:
        contact_collection.insert_one(contact_document)
        return jsonify({"message": "Contact form submitted successfully!"}), 201
    except Exception as e:
        print("MongoDB Error:", e)
        return jsonify({"message": "Server error while saving contact data"}), 500

# ------------------- Run App -------------------
if __name__ == '__main__':
    app.run(debug=True)
