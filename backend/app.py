from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
CORS(app)  # Enable CORS

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb+srv://chirankshisharma:chirru123@c1.8qkb7k0.mongodb.net/HerbalGarden?retryWrites=true&w=majority&appName=C1"
mongo = PyMongo(app)

# Collections
Login_SignUP_collection = mongo.db.Login_SignUP
contact_collection = mongo.db.ContactForm

# Welcome Route
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Herbal Garden API!"})

# Signup Route
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

    # Insert user and retrieve the inserted_id
    result = Login_SignUP_collection.insert_one({
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'password': password,  # In production, hash this!
        'profileImage': '',  # Placeholder for the user's profile image
    })

    return jsonify({
        "message": "Signup successful!",
        "userId": str(result.inserted_id)  # Convert ObjectId to string
    }), 201

# Login Route
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
        "userId": str(user['_id'])  # Return user's MongoDB ID as string
    }), 200

# Fetch User Profile Route
@app.route('/user/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    # Fetch user by userId
    user = Login_SignUP_collection.find_one({'_id': ObjectId(user_id)})
    
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Return the user data (exclude password)
    return jsonify({
        "firstName": user['firstName'],
        "lastName": user['lastName'],
        "email": user['email'],
        "profileImage": user.get('profileImage', ''),  # Optional: profile image may not be set
    }), 200

# Forgot Password Route
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = Login_SignUP_collection.find_one({'email': email})
    if not user:
        return jsonify({"message": "Email not found"}), 404

    # Simulated reset: return password (for development only)
    return jsonify({
        "message": "Password reset link has been sent (simulated).",
        "resetInfo": f"Your current password is: {user['password']}"
    }), 200

# Contact Form Route
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

if __name__ == '__main__':
    app.run(debug=True)


