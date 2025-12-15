from config import DevelopmentConfig
from database import db, migrate
from flask import Flask
from flask_restful import Api, Resource
from models import Catch, Species

api = Api()


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    return app


class Home(Resource):
    def get(self):
        return {"message": "Welcome to the Catch Log API"}, 200


class Health(Resource):
    def get(self):
        return {"status": "ok"}, 200


class SpeciesResource(Resource):
    def get(self, species_id=None):
        if not species_id:
            species_list = Species.query.all()
            return [
                {
                    "id": species.id,
                    "name": species.name,
                    "description": species.description,
                }
                for species in species_list
            ], 200
        species = Species.query.get(species_id)
        if species:
            return {
                "id": species.id,
                "name": species.name,
                "description": species.description,
            }, 200
        return {"message": "Species not found"}, 404


class CatchResource(Resource):
    def get(self, catch_id=None):
        if not catch_id:
            catch_list = Catch.query.all()
            return [
                {
                    "Catch": catch.id,
                    "species_id": catch.species_id,
                    "species": catch.species.name,
                    "weight": catch.weight,
                    "length": catch.length,
                    "date_caught": catch.date_caught.isoformat(),
                }
                for catch in catch_list
            ], 200
        catch = Catch.query.get(catch_id)
        if catch:
            return {
                "Catch": catch.id,
                "species_id": catch.species_id,
                "species": catch.species.name,
                "weight": catch.weight,
                "length": catch.length,
                "date_caught": catch.date_caught.isoformat(),
            }, 200
        return {"message": "Catch not found"}, 404


api.add_resource(Home, "/", endpoint="home")
api.add_resource(Health, "/health", endpoint="health")
api.add_resource(
    SpeciesResource, "/species", "/species/<int:species_id>", endpoint="species"
)
api.add_resource(
    CatchResource, "/catches", "/catches/<int:catch_id>", endpoint="catches"
)


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
