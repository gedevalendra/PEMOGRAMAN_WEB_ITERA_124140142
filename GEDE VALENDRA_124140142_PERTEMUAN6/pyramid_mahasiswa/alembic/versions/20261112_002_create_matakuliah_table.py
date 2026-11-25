"""create matakuliah table"""
from alembic import op
import sqlalchemy as sa


revision = "002_matakuliah"
down_revision = "001_mahasiswa"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "matakuliah",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("kode_mk", sa.Text(), nullable=False),
        sa.Column("nama_mk", sa.Text(), nullable=False),
        sa.Column("sks", sa.Integer(), nullable=False),
        sa.Column("semester", sa.Integer(), nullable=False),
        sa.CheckConstraint("sks > 0", name="ck_matakuliah_sks_positive"),
        sa.CheckConstraint(
            "semester > 0", name="ck_matakuliah_semester_positive"
        ),
        sa.UniqueConstraint("kode_mk", name="uq_matakuliah_kode_mk"),
    )


def downgrade():
    op.drop_table("matakuliah")

