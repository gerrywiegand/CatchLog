from config import DevelopmentConfig
from database import db, migrate
from flask import Flask
from flask_restful import Api, Resource
from models import *

api = Api()


class HealthCheck(Resource):
    def get(self):
        return {"status": "ok"}, 200


class SpeciesResource(Resource):
    def get(self):
        species_list = Species.query.all()
        return [
            {"id": species.id, "name": species.name, "description": species.description}
            for species in species_list
        ], 200


class CatchResource(Resource):
    def get(self):
        catch_list = Catch.query.all()
        return [
            {
                "id": catch.id,
                "species_id": catch.species_id,
                "weight": catch.weight,
                "length": catch.length,
                "date_caught": catch.date_caught.isoformat(),
            }
            for catch in catch_list
        ], 200


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    api.add_resource(HealthCheck, "/health", endpoint="health")
    api.add_resource(SpeciesResource, "/species", endpoint="species")
    api.add_resource(CatchResource, "/catches", endpoint="catches")

    return app


app = create_app()
