from pyramid.config import Configurator

from .models import get_engine, get_session_factory


def main(global_config, **settings):
    """Membuat dan mengembalikan aplikasi WSGI Pyramid."""
    config = Configurator(settings=settings)
    config.include("pyramid_tm")
    config.include(".models")
    config.include(".routes")
    config.scan(".views")
    return config.make_wsgi_app()


def get_app_session_factory(settings):
    """Helper untuk script CLI dan pengujian."""
    return get_session_factory(get_engine(settings))

