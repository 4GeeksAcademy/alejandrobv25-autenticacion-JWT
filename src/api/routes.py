"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Planet, People , UserFavorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_create_user():

    email = request.get_json()['email']
    password = request.get_json()['password']

    if email is None or password is None:
        return jsonify({'msg': 'error'}), 400

    new_user = User()
    new_user.email = email
    new_user.password = password
    new_user.is_active = True

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'id': new_user.id}), 200


@api.route('/login', methods=['POST'])
def handle_login():
    email = request.get_json()['email']
    password = request.get_json()['password']

    if email is None or password is None:
        return jsonify({'msg': 'invalid data'}), 400

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({'msg': 'user not exist'}), 404
    
    access_token = create_access_token(identity=user.email)

    return jsonify({'id': user.id, 'access_token': access_token }), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def handle_user():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if user is None:
        return jsonify({'msg': 'user not exist'}), 404
    return jsonify({ 'email': user.email }), 200

@api.route('/single', methods=['GET'])
@jwt_required()
def handle_single():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if user is None:
        return jsonify({'msg': 'user not exist'}), 404
    return jsonify({'email': user.email, 'message': 'Welcome to the single route!'}), 200


@api.route('/people', methods=['GET'])
def handle_get_people():
    all_people = People.query.all()
    all_people = list(map(lambda x: x.serialize(), all_people))
    return jsonify(all_people), 200

@api.route('/people/<int:id>', methods=['GET'])
def handle_get_people_by_id(id):
    person = People.query.get(id)
    if person is None:
        return jsonify({'msg': 'people not found'}), 404
    return jsonify(person.serialize()), 200

@api.route('/planets', methods=['GET'])
def handle_get_planets():
    all_planets = Planet.query.all()
    all_planets = list(map(lambda x: x.serialize(), all_planets))
    return jsonify(all_planets), 200

@api.route('/planets/<int:id>', methods=['GET'])
def handle_get_planet(id):
    planet = Planet.query.get(id)
    if planet is None:
        return jsonify({'msg': 'Planet not found'}), 404
    return jsonify(planet.serialize()), 200

@api.route('/users', methods=['GET'])
def handle_get_users():
    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))
    return jsonify(all_users), 200

@api.route('/users/<int:id>', methods=['GET'])
def handle_get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({'msg': 'User not found'}), 404
    return jsonify(user.serialize()), 200

@api.route('/favorites', methods=['GET'])
def handle_get_favorites():
    all_favorites = UserFavorite.query.all()
    all_favorites = list(map(lambda x: x.serialize(), all_favorites))
    return jsonify(all_favorites), 200

@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
    user = User.query.first()  
    planet = Planet.query.get(planet_id)
    if planet is None:
        return jsonify({'msg': 'Planet not found'}), 404
    
    new_favorite = UserFavorite(user_id=user.id, planet_id=planet.id)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({"msg": "Planet added to favorites"}), 201

@api.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_people(people_id):
    user = User.query.first()  
    person = People.query.get(people_id)
    if person is None:
        return jsonify({'msg': 'people not found'}), 404
    
    new_favorite = UserFavorite(user_id=user.id, people_id=person.id)
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({"msg": "people added to favorites"}), 201

@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def remove_favorite_planet(planet_id):
    user = User.query.first()  
    favorite = UserFavorite.query.filter_by(user_id=user.id, planet_id=planet_id).first()
    if favorite is None:
        return jsonify({'msg': 'Favorite not found'}), 404
    
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "Planet removed from favorites"}), 200

@api.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def remove_favorite_people(people_id):
    user = User.query.first()  
    favorite = UserFavorite.query.filter_by(user_id=user.id, people_id=people_id).first()
    if favorite is None:
        return jsonify({'msg': 'Favorite not found'}), 404
    
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"msg": "people removed from favorites"}), 200

