from datetime import datetime

from database import db
from marshmallow import Schema, ValidationError, fields, validates


class Species(db.Model):
    __tablename__ = "species"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.string(300), nullable=True)
    catches = db.relationship("Catch", back_populates="species")

    def __repr__(self):
        return f"<Species {self.name}>"


class SpeciesSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str()

    @validates("name")
    def validate_name(self, value):
        if not value:
            raise ValidationError("Species name cannot be empty.")


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

    @validates("weight")
    def validate_weight(self, value):
        if value is not None and value <= 0:
            raise ValidationError("Weight must be a non-negative value.")

    @validates("length")
    def validate_length(self, value):
        if value is not None and value <= 0:
            raise ValidationError("Length must be a non-negative value.")

    @validates("date_caught")
    def validate_date_caught(self, value):
        now = datetime.now()
        if value > now:
            raise ValidationError("Date caught cannot be in the future.")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)

    catches = db.relationship("Catch", back_populates="user")

    def __repr__(self):
        return f"<User {self.username}>"


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)

    @validates("username")
    def validate_username(self, value):
        if not value:
            raise ValidationError("Username cannot be empty.")
