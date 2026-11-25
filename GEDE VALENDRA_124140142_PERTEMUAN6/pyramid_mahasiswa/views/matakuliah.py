from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Matakuliah


def _get_or_404(request):
    item = request.dbsession.get(Matakuliah, request.matchdict["id"])
    if item is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan"})
    return item


def _positive_integer(value, field):
    if isinstance(value, bool):
        raise HTTPBadRequest(json_body={"error": f"{field} harus integer positif"})
    try:
        number = int(value)
    except (TypeError, ValueError) as exc:
        raise HTTPBadRequest(
            json_body={"error": f"{field} harus integer positif"}
        ) from exc
    if number <= 0:
        raise HTTPBadRequest(json_body={"error": f"{field} harus lebih dari 0"})
    return number


@view_config(route_name="matakuliah_list", renderer="json")
def matakuliah_list(request):
    data = request.dbsession.query(Matakuliah).order_by(Matakuliah.id).all()
    return {"matakuliahs": [item.to_dict() for item in data]}


@view_config(route_name="matakuliah_detail", renderer="json")
def matakuliah_detail(request):
    return {"matakuliah": _get_or_404(request).to_dict()}


@view_config(route_name="matakuliah_add", renderer="json")
def matakuliah_add(request):
    data = request.json_body
    required = ("kode_mk", "nama_mk", "sks", "semester")
    missing = [key for key in required if key not in data or data[key] in (None, "")]
    if missing:
        raise HTTPBadRequest(
            json_body={"error": f"Field wajib: {', '.join(missing)}"}
        )
    item = Matakuliah(
        kode_mk=str(data["kode_mk"]).strip().upper(),
        nama_mk=str(data["nama_mk"]).strip(),
        sks=_positive_integer(data["sks"], "sks"),
        semester=_positive_integer(data["semester"], "semester"),
    )
    if not item.kode_mk or not item.nama_mk:
        raise HTTPBadRequest(json_body={"error": "Kode dan nama tidak boleh kosong"})
    try:
        request.dbsession.add(item)
        request.dbsession.flush()
    except IntegrityError as exc:
        raise HTTPBadRequest(json_body={"error": "kode_mk sudah digunakan"}) from exc
    request.response.status_code = 201
    return {"success": True, "matakuliah": item.to_dict()}


@view_config(route_name="matakuliah_update", renderer="json")
def matakuliah_update(request):
    item = _get_or_404(request)
    data = request.json_body
    if "kode_mk" in data:
        item.kode_mk = str(data["kode_mk"]).strip().upper()
        if not item.kode_mk:
            raise HTTPBadRequest(json_body={"error": "kode_mk tidak boleh kosong"})
    if "nama_mk" in data:
        item.nama_mk = str(data["nama_mk"]).strip()
        if not item.nama_mk:
            raise HTTPBadRequest(json_body={"error": "nama_mk tidak boleh kosong"})
    if "sks" in data:
        item.sks = _positive_integer(data["sks"], "sks")
    if "semester" in data:
        item.semester = _positive_integer(data["semester"], "semester")
    try:
        request.dbsession.flush()
    except IntegrityError as exc:
        raise HTTPBadRequest(json_body={"error": "kode_mk sudah digunakan"}) from exc
    return {"success": True, "matakuliah": item.to_dict()}


@view_config(route_name="matakuliah_delete", renderer="json")
def matakuliah_delete(request):
    item = _get_or_404(request)
    request.dbsession.delete(item)
    return {"success": True, "message": f"Matakuliah ID {item.id} berhasil dihapus"}

