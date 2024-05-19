from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CestaArticuloAssociation(db.Model):
    __tablename__ = 'cesta_articulo'
    cesta_id = db.Column(db.Integer, db.ForeignKey("cesta.id"), primary_key=True),
    articulo_id = db.Column(db.Integer, db.ForeignKey("articulo.id"), primary_key=True)

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), nullable=False)
    apellido = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)   
    # cesta_lista = db.relationship('Cesta', back_populates='usuario')
    # articulos_favoritos = db.relationship('ArticulosFavoritos', backref='usuario', lazy=True)

    def __repr__(self):
        return "<Usuario %r >" % self.nombre
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "apellido": self.apellido,
            # "cesta_lista": [cesta.serialize() for cesta in self.cesta_lista]
        }
    
class Cesta(db.Model):
    __tablename__ = 'cesta'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    creado_en = db.Column(db.Integer)
    comprado = db.Column(db.Boolean)
    # articulo_lista = db.relationship('Articulo', secondary = "cesta_articulo", back_populates = "cesta_lista")
    
    def __repr__(self):
        return "<Cesta %r >" % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "creado_en": self.creado_en_id,
            # "articulo_lista": [articulo.serialize() for articulo in self.articulo_lista]
        }

class Articulo(db.Model):
    __tablename__ = 'articulo'
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

