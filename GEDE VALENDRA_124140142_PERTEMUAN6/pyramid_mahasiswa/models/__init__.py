from sqlalchemy import engine_from_config
from sqlalchemy.orm import configure_mappers, sessionmaker
import zope.sqlalchemy

from .mahasiswa import Mahasiswa
from .matakuliah import Matakuliah
from .meta import Base


configure_mappers()


def get_engine(settings, prefix="sqlalchemy."):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    return sessionmaker(bind=engine)


def get_tm_session(session_factory, transaction_manager):
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager
    )
    return dbsession


def includeme(config):
    settings = config.get_settings()
    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry["dbsession_factory"] = session_factory
    config.registry["dbsession_engine"] = engine
    config.add_request_method(
        lambda request: get_tm_session(session_factory, request.tm),
        "dbsession",
        reify=True,
    )


__all__ = ["Base", "Mahasiswa", "Matakuliah"]

