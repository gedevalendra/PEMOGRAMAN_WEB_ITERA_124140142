import sys

from pyramid.paster import get_appsettings, setup_logging

from ..models import Mahasiswa, Matakuliah, get_engine, get_session_factory


def seed(dbsession):
    if dbsession.query(Mahasiswa).count() == 0:
        dbsession.add_all(
            [
                Mahasiswa(
                    nim="124140142",
                    nama="Gede Valendra",
                    jurusan="Teknik Informatika",
                ),
                Mahasiswa(
                    nim="124140106",
                    nama="Frichintia Niken Gita Natasyah",
                    jurusan="Teknik Informatika",
                ),
                Mahasiswa(
                    nim="124190009",
                    nama="Nivalesha",
                    jurusan="Teknik Informatika",
                ),
            ]
        )

    if dbsession.query(Matakuliah).count() == 0:
        dbsession.add_all(
            [
                Matakuliah(
                    kode_mk="IF2110",
                    nama_mk="Pengembangan Aplikasi Web",
                    sks=3,
                    semester=5,
                ),
                Matakuliah(
                    kode_mk="IF2120",
                    nama_mk="Pengembangan Aplikasi Mobile",
                    sks=3,
                    semester=5,
                ),
                Matakuliah(
                    kode_mk="IF3140",
                    nama_mk="Jaringan Komputer",
                    sks=3,
                    semester=5,
                ),
            ]
        )


def main(argv=sys.argv):
    if len(argv) != 2:
        print(f"Penggunaan: {argv[0]} development.ini")
        return 1
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    session_factory = get_session_factory(get_engine(settings))
    dbsession = session_factory()
    try:
        seed(dbsession)
        dbsession.commit()
    except Exception:
        dbsession.rollback()
        raise
    finally:
        dbsession.close()
    print("Database berhasil diisi dengan data awal.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

