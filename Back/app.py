from config import DevelopmentConfig
from database import db, migrate
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api, Resource
from models import Catch, Species, User

api = Api()

openRoutes = ["/", "/health"]
protectedRoutes = ["/species", "/catches"]


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

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


class signup(Resource):
    def post(self):
        data = request.get_json()
        required = ["username", "password"]
        if any(field not in data for field in required):
            return {"message": "Missing required fields"}, 400
        if User.query.filter_by(username=data.get("username")).first():
            return {"message": "Username already exists"}, 400
        new_user = User(
            username=data.get("username"),
            password_hash=generate_password_hash(data.get("password")),
        )
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User created successfully"}, 201


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

    def post(self):
        required = ["name", "description"]
        data = request.get_json()
        if any(field not in data for field in required):
            return {"message": "Missing required fields"}, 400
        new_species = Species(
            name=data.get("name"), description=data.get("description")
        )
        db.session.add(new_species)
        db.session.commit()
        return {
            "id": new_species.id,
            "name": new_species.name,
            "description": new_species.description,
        }, 201


class CatchResource(Resource):
    def get(self, catch_id=None):
        if not catch_id:
            catch_list = Catch.query.all()
            return [
                {
                    "id": catch.id,
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
                "id": catch.id,
                "species_id": catch.species_id,
                "species": catch.species.name,
                "weight": catch.weight,
                "length": catch.length,
                "date_caught": catch.date_caught.isoformat(),
            }, 200
        return {"message": "Catch not found"}, 404

    def post(self):
        data = request.get_json()
        required = ["species_id", "weight", "length"]
        if any(field not in data for field in required):
            return {"message": "Missing required fields"}, 400
        if not Species.query.get(data.get("species_id")):
            return {"message": "Species not found"}, 404
        if data.get("weight") <= 0 or data.get("length") <= 0:
            return {"message": "Weight and length must be positive values"}, 400

        new_catch = Catch(
            species_id=data.get("species_id"),
            weight=data.get("weight"),
            length=data.get("length"),
        )
        db.session.add(new_catch)
        db.session.commit()
        return {
            "id": new_catch.id,
            "species_id": new_catch.species_id,
            "weight": new_catch.weight,
            "length": new_catch.length,
            "date_caught": new_catch.date_caught.isoformat(),
        }, 201


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
