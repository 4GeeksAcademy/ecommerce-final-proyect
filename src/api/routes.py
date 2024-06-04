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
    cart = Cesta.query.filter_by(usuario_id = user.id).first()
    print(cart)
    response_body = {"carrito": cart}
    return jsonify(user.serialize()),200

@api.route('/articulos_cesta', methods = ['POST'])
def add_article():
    request_body = request.get_json(force=True)
    articulo = CestaArticulo(cesta_id=request_body["cesta_id"], articulo_id=request_body["articulo_id"])
    db.session.add(articulo)
    db.session.commit()
    return jsonify({"msg":"Articulo añadido"})

@api.route('/articulos_cesta/<int:cesta_id>', methods=['GET'])
def get_cart_articles(cesta_id):
    cesta = Cesta.query.get(cesta_id)
    if not cesta:
        return jsonify({"error": "Cesta not found"}), 404
    
    return jsonify({
        "id": cesta.id,
        "usuario_id": cesta.usuario_id,
        "articulos": [
            {
                "cesta_id": ca.cesta_id,
                "articulo_id": ca.articulo_id,
                "nombre": ca.articulo.nombre,
                "precio": ca.articulo.precio,
                "imagen": ca.articulo.imagen,
                "descripcion": ca.articulo.descripcion
            } for ca in cesta.cesta_articulo
        ]
    })

@api.route('/articulos_cesta/<int:cesta_id>/<int:articulo_id>', methods=['DELETE'])
def delete_cart_article(cesta_id, articulo_id):
    cesta_articulo = CestaArticulo.query.filter_by(cesta_id=cesta_id, articulo_id=articulo_id).first()
    
    if not cesta_articulo:
        return jsonify({"error": "El artículo no está en la cesta"}), 404
    
    db.session.delete(cesta_articulo)
    db.session.commit()
    
    return jsonify({"msg": "Artículo eliminado de la cesta"}), 200
