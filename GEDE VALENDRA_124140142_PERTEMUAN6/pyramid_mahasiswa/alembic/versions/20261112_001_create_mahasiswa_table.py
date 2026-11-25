"""create mahasiswa table"""
from alembic import op
import sqlalchemy as sa


revision = "001_mahasiswa"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "mahasiswa",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("nim", sa.Text(), nullable=False),
        sa.Column("nama", sa.Text(), nullable=False),
        sa.Column("jurusan", sa.Text(), nullable=False),
        sa.Column("tanggal_lahir", sa.Date(), nullable=True),
        sa.Column("alamat", sa.Text(), nullable=True),
        sa.UniqueConstraint("nim", name="uq_mahasiswa_nim"),
    )


def downgrade():
    op.drop_table("mahasiswa")

