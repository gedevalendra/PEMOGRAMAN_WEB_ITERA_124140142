import datetime

from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Mahasiswa


def _get_or_404(request):
    mahasiswa = request.dbsession.get(Mahasiswa, request.matchdict["id"])
    if mahasiswa is None:
        raise HTTPNotFound(json_body={"error": "Mahasiswa tidak ditemukan"})
    return mahasiswa


def _tanggal(value):
    if not value:
        return None
    try:
        return datetime.date.fromisoformat(value)
    except (TypeError, ValueError) as exc:
        raise HTTPBadRequest(
            json_body={"error": "tanggal_lahir harus berformat YYYY-MM-DD"}
        ) from exc


@view_config(route_name="mahasiswa_list", renderer="json")
def mahasiswa_list(request):
    data = request.dbsession.query(Mahasiswa).order_by(Mahasiswa.id).all()
    return {"mahasiswas": [item.to_dict() for item in data]}


@view_config(route_name="mahasiswa_detail", renderer="json")
def mahasiswa_detail(request):
    return {"mahasiswa": _get_or_404(request).to_dict()}


@view_config(route_name="mahasiswa_add", renderer="json")
def mahasiswa_add(request):
    data = request.json_body
    missing = [key for key in ("nim", "nama", "jurusan") if not data.get(key)]
    if missing:
        raise HTTPBadRequest(
            json_body={"error": f"Field wajib: {', '.join(missing)}"}
        )
    item = Mahasiswa(
        nim=str(data["nim"]).strip(),
        nama=str(data["nama"]).strip(),
        jurusan=str(data["jurusan"]).strip(),
        tanggal_lahir=_tanggal(data.get("tanggal_lahir")),
        alamat=data.get("alamat"),
    )
    try:
        request.dbsession.add(item)
        request.dbsession.flush()
    except IntegrityError as exc:
        raise HTTPBadRequest(json_body={"error": "NIM sudah digunakan"}) from exc
    request.response.status_code = 201
    return {"success": True, "mahasiswa": item.to_dict()}


@view_config(route_name="mahasiswa_update", renderer="json")
def mahasiswa_update(request):
    item = _get_or_404(request)
    data = request.json_body
    for field in ("nim", "nama", "jurusan", "alamat"):
        if field in data:
            if field != "alamat" and not data[field]:
                raise HTTPBadRequest(json_body={"error": f"{field} tidak boleh kosong"})
            setattr(item, field, data[field])
    if "tanggal_lahir" in data:
        item.tanggal_lahir = _tanggal(data["tanggal_lahir"])
    try:
        request.dbsession.flush()
    except IntegrityError as exc:
        raise HTTPBadRequest(json_body={"error": "NIM sudah digunakan"}) from exc
    return {"success": True, "mahasiswa": item.to_dict()}


@view_config(route_name="mahasiswa_delete", renderer="json")
def mahasiswa_delete(request):
    item = _get_or_404(request)
    request.dbsession.delete(item)
    return {"success": True, "message": f"Mahasiswa ID {item.id} berhasil dihapus"}

