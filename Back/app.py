from flask import Flask
from flask_restful import Api, Resource

from Back.config import DevelopmentConfig
from Back.database import db, migrate
from Back.models import *


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    api = Api(app)

    db.init_app(app)
    migrate.init_app(app, db)

    @app.get("/health")
    def health_check():
        return {"status": "ok"}, 200

    return app


app = create_app()
