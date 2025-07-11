from flask import Flask, request, jsonify, send_from_directory
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from dotenv import load_dotenv
import os

# Load env vars from .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__, static_folder='.')

# Get Mongo URI from env
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not set in .env")

# MongoDB Client Setup with TLS options
try:
    client = MongoClient(
        MONGODB_URI,
        tls=True,
        tlsAllowInvalidCertificates=True  # ⚠️ Local dev only. Remove in production
    )
    db = client.dairyjoy_db
    orders_collection = db.orders
    print("✅ MongoDB Atlas connected")
except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    raise

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/api/submit-order', methods=['POST'])
def submit_order():
    data = request.json or {}
    cart_items = data.get('cartItems')
    grand_total = data.get('grandTotal')

    if not isinstance(grand_total, (int, float)) or grand_total < 0:
        return jsonify({"message": "grandTotal must be a non-negative number"}), 400

    order_data = {
        "items": cart_items,
        "total_amount": grand_total,
        "order_date": datetime.utcnow(),
        "status": "pending"
    }

    try:
        result = orders_collection.insert_one(order_data)
        print(f"📝 Order submitted: {result.inserted_id}")
        return jsonify({
            "message": "Order submitted successfully",
            "orderId": str(result.inserted_id)
        }), 200
    except Exception as e:
        print(f"❌ Failed to save order: {e}")
        return jsonify({"message": f"Failed to submit order: {str(e)}"}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = list(orders_collection.find().sort("order_date", -1))
        for order in orders:
            order['_id'] = str(order['_id'])
            if 'order_date' in order:
                order['order_date'] = order['order_date'].isoformat()
        return jsonify(orders), 200
    except Exception as e:
        print(f"❌ Failed to fetch orders: {e}")
        return jsonify({"message": f"Failed to fetch orders: {str(e)}"}), 500

@app.route('/api/order/<order_id>', methods=['GET'])
def get_order_by_id(order_id):
    try:
        order = orders_collection.find_one({"_id": ObjectId(order_id)})
        if not order:
            return jsonify({"message": "Order not found"}), 404
        order['_id'] = str(order['_id'])
        if 'order_date' in order:
            order['order_date'] = order['order_date'].isoformat()
        return jsonify(order), 200
    except Exception as e:
        print(f"❌ Failed to fetch order by ID: {e}")
        return jsonify({"message": f"Invalid order ID or error: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
