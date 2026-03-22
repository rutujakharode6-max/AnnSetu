import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from models import db, User, FoodPost

app = Flask(__name__, static_folder='../', static_url_path='')
CORS(app)
# Use /tmp for SQLite on Vercel as the root is read-only
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

# --- Static File Serving ---

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path) and os.path.isfile(path):
        return send_from_directory('.', path)
    return send_from_directory('.', 'index.html') # fallback

# --- API Endpoints ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    # Check if user exists
    existing = User.query.filter_by(email=data.get('email')).first()
    if existing:
        return jsonify({'error': 'Email already registered'}), 400
        
    try:
        new_user = User(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            role=data.get('role', 'provider'),
            password_hash=data.get('password'), # In a real app, hash this!
            address=data.get('address'),
            user_type=data.get('user_type'),
            license_id=data.get('license_id')
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'success': True, 'user': new_user.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/food_posts', methods=['GET', 'POST'])
def handle_food_posts():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # For demo purposes, we'll assign provider_id = 1 if none provided
        provider_id = data.get('provider_id', 1) 
        
        try:
            new_post = FoodPost(
                provider_id=provider_id,
                description=data.get('description'),
                quantity=data.get('quantity'),
                expiry_time=data.get('expiry_time'),
                location=data.get('location')
            )
            db.session.add(new_post)
            db.session.commit()
            return jsonify({'success': True, 'post': new_post.to_dict()}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
            
    else: # GET
        posts = FoodPost.query.filter_by(status='pending').order_by(FoodPost.created_at.desc()).all()
        return jsonify({'success': True, 'posts': [post.to_dict() for post in posts]})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8002))
    app.run(host='0.0.0.0', port=port)
