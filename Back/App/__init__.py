from config import DevelopmentConfig
from database import db, migrate
from flask import Flask
from routes.catch_routes import catch_bp
from routes.species_routes import species_bp


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(species_bp, url_prefix="/api/species")
    app.register_blueprint(catch_bp, url_prefix="/api/catches")

    @app.get("/health")
    def health_check():
        return {"status": "ok"}, 200

    return app
