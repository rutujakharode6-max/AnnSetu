from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20), nullable=False) # 'provider' or 'receiver'
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(50), nullable=True) # Restaurant, NGO, etc.
    license_id = db.Column(db.String(100), nullable=True) # FSSAI or NGO Darpan
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'email': self.email,
            'user_type': self.user_type
        }

class FoodPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.String(50), nullable=False)
    expiry_time = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default='pending') # pending, accepted, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    provider = db.relationship('User', backref=db.backref('food_posts', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'provider_id': self.provider_id,
            'provider_name': self.provider.name if self.provider else 'Unknown',
            'description': self.description,
            'quantity': self.quantity,
            'expiry_time': self.expiry_time,
            'location': self.location,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }
