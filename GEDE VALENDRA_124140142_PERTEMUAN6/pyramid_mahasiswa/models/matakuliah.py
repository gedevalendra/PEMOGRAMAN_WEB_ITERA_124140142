from sqlalchemy import CheckConstraint, Column, Integer, Text

from .meta import Base


class Matakuliah(Base):
    __tablename__ = "matakuliah"
    __table_args__ = (
        CheckConstraint("sks > 0", name="ck_matakuliah_sks_positive"),
        CheckConstraint(
            "semester > 0", name="ck_matakuliah_semester_positive"
        ),
    )

    id = Column(Integer, primary_key=True)
    kode_mk = Column(Text, unique=True, nullable=False)
    nama_mk = Column(Text, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "kode_mk": self.kode_mk,
            "nama_mk": self.nama_mk,
            "sks": self.sks,
            "semester": self.semester,
        }

