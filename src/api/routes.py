"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import Usuario, Articulo, Cesta, CestaArticulo, db
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import stripe

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
# This is your test secret API key.
stripe.api_key = 'sk_test_51PNaoKF7XdAQA3Pm120EB7sG5W1wFNOwQ8sUANcDN3NbGhQNZti8tJioRAmohG4qIAheL7Cotm2Ym6fHnkBWoxw400CzihPp6e'


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

# @api.route('/login', methods = ['POST'])
# def login_user():
#     request_body = request.get_json(force=True)
#     user = Usuario.query.filter_by(email=request_body["email"], password=request_body["password"]).first()
#     if user is None: 
#         return jsonify({"Las credenciales son incorrectas"}),403
#     if password != user.password:
#         return jsonify({"msg":"password incorrecto"}), 401
#     # Buscar los items del carrito
#     cart = Cesta.query.filter_by(usuario_id = user.id).first()
#     print(cart)
#     response_body = {"carrito": cart}
#     return jsonify(user.serialize()),200
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = Usuario.query.filter_by(email=email).first()
    print(user)
    if user is None:
        return jsonify({"msg":"email incorrecto"}), 401
    if password != user.password:
        return jsonify({"msg":"password incorrecto"}), 401
    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token, "user": user.serialize()})

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

@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': '{{PRICE_ID}}',
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)
