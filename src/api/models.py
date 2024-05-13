from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuario'
    # Here we define columns for the table person
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), nullable=False)
    apellido = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)   
    cesta = db.relationship('Cesta', backref='usuario', lazy=True)
    # articulos_favoritos = db.relationship('ArticulosFavoritos', backref='usuario', lazy=True)

    def __repr__(self):
        return "<Usuario %r >" % self.nombre
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "apellido": self.apellido
        }

class Articulos(db.Model):
    __tablename__ = 'articulos'
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250))
    precio = db.Column(db.Integer)
    imagen = db.Column(db.String(250))
    descripcion = db.Column(db.String(250), nullable=False)
    # articulos_favoritos = db.relationship('ArticulosFavoritos', backref='articulos', lazy=True)

    def __repr__(self):
        return "<Articulos %r >" % self.nombre
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "precio": self.precio,
            "imagen": self.imagen,
            "descripcion": self.descripcion
        }

# class ArticulosFavoritos(db.Model):
#     __tablename__ = 'articulosfavoritos'
#     id = db.Column(db.Integer, primary_key=True)
#     usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"))
#     articulo_id = db.Column(db.Integer,db.ForeignKey("articulos.id"))

#     def __repr__(self):
#         return "<ArticulosFavoritos %r >" % self.id
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "usuario_id": self.usuario_id,
#             "articulo_id": self.articulo_id
#         }
    

class Cesta(db.Model):
    __tablename__ = 'cesta'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    creado_en = db.Column(db.Integer)
    articulos_cesta = db.relationship('ArticulosCesta', backref='cesta', lazy=True)

    def __repr__(self):
        return "<Cesta %r >" % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "creado_en": self.creado_en_id
        }
    
class ArticulosCesta(db.Model):
    __tablename__ = 'articuloscesta'
    id = db.Column(db.Integer, primary_key=True)
    cesta_id = db.Column(db.Integer, db.ForeignKey("cesta.id"))
    articulo_id = db.Column(db.Integer, db.ForeignKey("articulo.id"))
    

    def __repr__(self):
        return "<ArticulosCesta %r >" % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "articulo_id": self.articulo_id
        }