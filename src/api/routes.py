"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import Usuario, Articulo, Cesta, CestaArticulo, db

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
    user=Usuario(nombre=request_body["nombre"],email=request_body["email"],password=request_body["password"])
    db.session.add(user)
    db.session.commit()
    print(user.serialize())
    cart = Cesta(usuario_id = user.id)
    db.session.add(cart)
    db.session.commit()    
    return jsonify(user.serialize()), 201

@api.route('/login', methods = ['POST'])
def login_user():
    request_body = request.get_json(force=True)
    user = Usuario.query.filter_by(email=request_body["email"]).first()
    if user is None: 
        raise APIException("Las credenciales son incorrectas",403)
    # Buscar los items del carrito
    return jsonify(user.serialize()),200

@api.route('/articulos_cesta', methods = ['POST'])
def add_article():
    request_body = request.get_json(force=True)
    articulo = CestaArticulo(cesta_id=request_body["cesta_id"], articulo_id=request_body["articulo_id"])
    db.session.add(articulo)
    db.session.commit()
    return jsonify({"msg":"Articulo añadido"})