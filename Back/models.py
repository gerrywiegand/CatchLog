from datetime import datetime

from database import db
from marshmallow import Schema, fields


class Species(db.Model):
    __tablename__ = "species"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    catches = db.relationship("Catch", back_populates="species")

    def __repr__(self):
        return f"<Species {self.name}>"


class SpeciesSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str()


class Catch(db.Model):
    __tablename__ = "catches"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    species_id = db.Column(db.Integer, db.ForeignKey("species.id"), nullable=False)
    weight = db.Column(db.Float, nullable=True)
    length = db.Column(db.Float, nullable=True)
    date_caught = db.Column(db.DateTime, nullable=False, default=datetime.now)

    species = db.relationship("Species", back_populates="catches")
    user = db.relationship("User", back_populates="catches")

    def __repr__(self):
        return f"<Catch {self.species.name} - {self.weight}kg>"


class CatchSchema(Schema):
    id = fields.Int(dump_only=True)
    species_id = fields.Int(required=True)
    weight = fields.Float()
    length = fields.Float()
    date_caught = fields.DateTime()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    catches = db.relationship("Catch", back_populates="user")

    def __repr__(self):
        return f"<User {self.username}>"
