from alembic import context
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config, pool

from pyramid_mahasiswa.models.meta import Base
import pyramid_mahasiswa.models  # noqa: F401


config = context.config
setup_logging(config.config_file_name)
settings = get_appsettings(config.config_file_name)
target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(
        url=settings["sqlalchemy.url"],
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    engine = engine_from_config(
        settings, prefix="sqlalchemy.", poolclass=pool.NullPool
    )
    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

