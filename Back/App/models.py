from datetime import datetime

from Back.App import db


class Species(db.model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"<Species {self.name}>"


class Catch(db.model):
    id = db.Column(db.Integer, primary_key=True)
    species_id = db.Column(db.Integer, db.ForeignKey("species.id"), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    length = db.Column(db.Float, nullable=False)
    date_caught = db.Column(db.DateTime, nullable=False)

    species = db.relationship("Species", backref=db.backref("catches", lazy=True))

    def __repr__(self):
        return f"<Catch {self.species.name} - {self.weight}kg>"
