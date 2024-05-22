"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import Usuario, Articulo, Cesta, cesta_articulo, db

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# @api.route('/')
# def sitemap():
#     return generate_sitemap(app)

@api.route('/productos', methods=['GET'])
def get_articles():
    data= Articulo.query.all()
    data= [articulo.serialize() for articulo in data]
    return jsonify(data), 200


@api.route('/register', methods=['POST'])
def handle_register():
    request_body = request.get_json(force=True)
    verify_email = Usuario.query.filter_by(email=request_body["email"]).first()
    if verify_email: 
        raise APIException("Esta cuenta ya existe",401)
    user=Usuario(email=request_body["email"],password=request_body["password"])
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "Usuario creado correctamente"
    }
    
    return jsonify(response_body), 200
