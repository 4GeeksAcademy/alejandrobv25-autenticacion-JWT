from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Modelo User
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    favorites = db.relationship('UserFavorite', back_populates='user', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email
        }

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

# Modelo People (antes Character)
class People(db.Model):
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    race = db.Column(db.String(100), nullable=False)
    favorites = db.relationship('UserFavorite', back_populates='people', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<People {self.name}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "race": self.race
        }

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "race": self.race
        }

# Modelo Planet
class Planet(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    climate = db.Column(db.String(100), nullable=False)
    favorites = db.relationship('UserFavorite', back_populates='planet', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Planet {self.name}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "climate": self.climate
        }

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "climate": self.climate
        }

# Modelo UserFavorite
class UserFavorite(db.Model):
    __tablename__ = 'user_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='favorites')

    # Cambio aquí: people_id en vez de character_id
    people_id = db.Column(db.Integer, db.ForeignKey('people.id'), nullable=True)
    people = db.relationship('People', back_populates='favorites')

    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), nullable=True)
    planet = db.relationship('Planet', back_populates='favorites')

    def __repr__(self):
        return f'<UserFavorite User {self.user_id}, People {self.people_id}, Planet {self.planet_id}>'

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "people_id": self.people_id,
            "planet_id": self.planet_id
        }

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "people_id": self.people_id,
            "planet_id": self.planet_id
        }
