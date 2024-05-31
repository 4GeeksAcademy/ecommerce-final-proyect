from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CestaArticulo(db.Model):
    __tablename__ = 'cesta_articulo'
    cesta_id = db.Column(db.Integer, db.ForeignKey('cesta.id'), primary_key=True)
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'), primary_key=True)
    
    cesta = db.relationship('Cesta', back_populates='cesta_articulo')
    articulo = db.relationship('Articulo', back_populates='cesta_articulo')

    def serialize(self):
        return {
            "cesta_id": self.cesta_id,
            "articulo_id": self.articulo_id,
            "articulo": self.articulo.serialize()  # Serialize the related Articulo
        }

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250), nullable=True)
    apellido = db.Column(db.String(250), nullable=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    
    cesta_lista = db.relationship('Cesta', backref='usuario', lazy=True)
    
    def __repr__(self):
        return "<Usuario %r>" % self.nombre
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "apellido": self.apellido,
            "cesta_lista": [cesta.serialize() for cesta in self.cesta_lista]
        }

class Cesta(db.Model):
    __tablename__ = 'cesta'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    creado_en = db.Column(db.Integer)
    comprado = db.Column(db.Boolean)
    
    cesta_articulo = db.relationship('CestaArticulo', back_populates='cesta')
    
    def __repr__(self):
        return "<Cesta %r>" % self.id
    
    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "creado_en": self.creado_en,
            "comprado": self.comprado,
        }
    
    def serializeArticulo(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "creado_en": self.creado_en,
            "comprado": self.comprado,
            "cesta_articulo": [cesta_articulo.serialize() for cesta_articulo in self.cesta_articulo]
        }

class Articulo(db.Model):
    __tablename__ = 'articulo'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(250))
    precio = db.Column(db.Float)
    imagen = db.Column(db.String(250))
    descripcion = db.Column(db.String(250), nullable=False)
    
    cesta_articulo = db.relationship('CestaArticulo', back_populates='articulo')
    
    def __repr__(self):
        return "<Articulo %r>" % self.nombre
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "precio": self.precio,
            "imagen": self.imagen,
            "descripcion": self.descripcion
        }
