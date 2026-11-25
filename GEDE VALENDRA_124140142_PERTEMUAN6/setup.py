from setuptools import find_namespace_packages, setup


requires = [
    "alembic",
    "psycopg2-binary",
    "pyramid",
    "pyramid_jinja2",
    "pyramid_tm",
    "SQLAlchemy",
    "transaction",
    "waitress",
    "zope.sqlalchemy",
]

setup(
    name="pyramid_mahasiswa",
    version="1.0.0",
    description="REST API manajemen mahasiswa dan matakuliah",
    packages=find_namespace_packages(include=["pyramid_mahasiswa*"]),
    include_package_data=True,
    install_requires=requires,
    entry_points={
        "paste.app_factory": ["main = pyramid_mahasiswa:main"],
        "console_scripts": [
            "initialize_pyramid_mahasiswa_db = "
            "pyramid_mahasiswa.scripts.initialize_db:main"
        ],
    },
)

