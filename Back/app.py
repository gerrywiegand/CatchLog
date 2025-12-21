from config import DevelopmentConfig
from database import db, migrate
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_restful import Api, Resource
from models import Catch, Species, User
from werkzeug.security import check_password_hash, generate_password_hash

api = Api()

openRoutes = {"/", "/health", "/login", "/signup", "/logout", "/me"}


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(
        app,
        supports_credentials=True,
        resources={r"/*": {"origins": "http://localhost:5173"}},
    )

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)

    @app.before_request
    def require_login():
        if request.method == "OPTIONS":
            return
        if request.path in openRoutes:
            return
        if not session.get("user_id"):
            return jsonify({"message": "Authentication required"}), 401

    return app


class Home(Resource):
    def get(self):
        return {"message": "Welcome to the Catch Log API"}, 200


class Health(Resource):
    def get(self):
        return {"status": "ok"}, 200


class Signup(Resource):
    def post(self):
        data = request.get_json() or {}
        username = data.get("username")
        password = data.get("password")
        required = ["username", "password"]
        if any(field not in data for field in required):
            return {"message": "username and password required"}, 400
        if User.query.filter_by(username=username).first():
            return {"message": "Username already exists"}, 409

        new_user = User(
            username=username, password_hash=generate_password_hash(password)
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return {"id": new_user.id, "username": new_user.username}, 201


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        required = ["username", "password"]
        if any(field not in data for field in required):
            return {"message": "username and password required"}, 400
        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password_hash, password):
            return {"message": "Username or password invalid"}, 401
        session["user_id"] = user.id
        return {"id": user.id, "username": user.username}, 200


class Logout(Resource):
    def post(self):
        session.pop("user_id", None)
        return {"message": "Logout successful"}, 200


class Me(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401
        user = User.query.get(user_id)
        if not user:
            session.pop("user_id", None)
            return {"message": "Not logged in"}, 401
        return {"id": user.id, "username": user.username}, 200


class SpeciesResource(Resource):
    def get(self, species_id=None):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401
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
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401
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
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401
        if not catch_id:
            page = request.args.get("page", type=int, default=1)
            per_page = request.args.get("per_page", type=int, default=5)
            pagination = (
                Catch.query.filter_by(user_id=user_id)
                .order_by(Catch.date_caught.desc())
                .paginate(page=page, per_page=per_page, error_out=False)
            )

            return {
                "page": pagination.page,
                "per_page": pagination.per_page,
                "total": pagination.total,
                "pages": pagination.pages,
                "items": [
                    {
                        "id": catch.id,
                        "species_id": catch.species_id,
                        "species": catch.species.name,
                        "weight": catch.weight,
                        "length": catch.length,
                        "lure": catch.lure,
                        "date_caught": catch.date_caught.isoformat(),
                    }
                    for catch in pagination.items
                ],
            }, 200
        catch = Catch.query.filter_by(id=catch_id, user_id=user_id).first()
        if catch:
            return {
                "id": catch.id,
                "species_id": catch.species_id,
                "species": catch.species.name,
                "weight": catch.weight,
                "length": catch.length,
                "lure": catch.lure,
                "date_caught": catch.date_caught.isoformat(),
            }, 200
        return {"message": "Catch not found"}, 404

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401

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
            lure=data.get("lure"),
            user_id=session.get("user_id"),
        )
        db.session.add(new_catch)
        db.session.commit()
        return {
            "id": new_catch.id,
            "species_id": new_catch.species_id,
            "weight": new_catch.weight,
            "length": new_catch.length,
            "lure": new_catch.lure,
            "date_caught": new_catch.date_caught.isoformat(),
        }, 201

    def patch(self, catch_id):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401
        catch = Catch.query.filter_by(id=catch_id, user_id=user_id).first()
        if not catch:
            return {"message": "Catch not found"}, 404

        data = request.get_json()
        if "species_id" in data:
            if not Species.query.get(data["species_id"]):
                return {"message": "Species not found"}, 404
            catch.species_id = data["species_id"]
        if "id" in data:
            return {"message": "Cannot modify catch ID"}, 400
        if "weight" in data:
            if data["weight"] <= 0:
                return {"message": "Weight must be a positive value"}, 400
            catch.weight = data["weight"]
        if "length" in data:
            if data["length"] <= 0:
                return {"message": "Length must be a positive value"}, 400
            catch.length = data["length"]
        if "lure" in data:
            catch.lure = data["lure"]

        db.session.commit()
        return {
            "id": catch.id,
            "species_id": catch.species_id,
            "weight": catch.weight,
            "length": catch.length,
            "lure": catch.lure,
            "date_caught": catch.date_caught,
        }, 200

    def delete(self, catch_id):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Not logged in"}, 401
        catch = Catch.query.filter_by(id=catch_id, user_id=user_id).first()
        if not catch:
            return {"message": "Catch not found"}, 404

        db.session.delete(catch)
        db.session.commit()
        return {"message": "Catch deleted successfully"}, 200


api.add_resource(Home, "/", endpoint="home")
api.add_resource(Health, "/health", endpoint="health")

api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Me, "/me", endpoint="me")


api.add_resource(
    SpeciesResource, "/species", "/species/<int:species_id>", endpoint="species"
)
api.add_resource(
    CatchResource, "/catches", "/catches/<int:catch_id>", endpoint="catches"
)


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
