import os


class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "wouldntyouliketoknow")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///catchlog.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_HTTPONLY = True


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False
