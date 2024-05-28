from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CestaArticulo(db.Model):
    __tablename__ = 'cesta_articulo'

    cesta_id = db.Column(db.Integer, db.ForeignKey('cesta.id'), primary_key=True)
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'), primary_key=True)
    def serialize(self):
        return {
            "id": self.id,
            "cesta_id": self.cesta_id,
            "articulo_id": self.articulo_id,
           }
# cesta_articulo = db.Table('cesta_articulo',
#     db.Column('cesta_id', db.Integer, db.ForeignKey('cesta.id'), primary_key=True),
#     db.Column('articulo_id', db.Integer, db.ForeignKey('articulo.id'), primary_key=True)
# )

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), nullable=True)
    apellido = db.Column(db.String(250), nullable=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False) 
    cesta_lista = db.relationship('Cesta', backref='usuario', lazy=True)

    def __repr__(self):
        return "<Usuario %r >" % self.nombre
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "apellido": self.apellido,
            "cesta_lista": [cesta.serialize() for cesta in self.cesta_lista]
        }
    
class Cesta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    creado_en = db.Column(db.Integer)
    comprado = db.Column(db.Boolean)
    cesta_articulo = db.relationship('CestaArticulo',
        backref=db.backref('cesta', lazy=True))
    
    
    def __repr__(self):
        return "<Cesta %r >" % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "creado_en": self.creado_en,
            "cesta_articulo": [articulo.serialize() for articulo in self.cesta_articulo]
        }

class Articulo(db.Model):
    __tablename__ = 'articulo'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250))
    precio = db.Column(db.Float)
    imagen = db.Column(db.String(250))
    descripcion = db.Column(db.String(250), nullable=False)

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

