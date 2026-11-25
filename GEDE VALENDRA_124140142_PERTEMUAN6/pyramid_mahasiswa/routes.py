def includeme(config):
    config.add_route("home", "/")

    config.add_route(
        "mahasiswa_list", "/api/mahasiswa", request_method="GET"
    )
    config.add_route(
        "mahasiswa_detail", "/api/mahasiswa/{id}", request_method="GET"
    )
    config.add_route(
        "mahasiswa_add", "/api/mahasiswa", request_method="POST"
    )
    config.add_route(
        "mahasiswa_update", "/api/mahasiswa/{id}", request_method="PUT"
    )
    config.add_route(
        "mahasiswa_delete", "/api/mahasiswa/{id}", request_method="DELETE"
    )

    config.add_route(
        "matakuliah_list", "/api/matakuliah", request_method="GET"
    )
    config.add_route(
        "matakuliah_detail", "/api/matakuliah/{id}", request_method="GET"
    )
    config.add_route(
        "matakuliah_add", "/api/matakuliah", request_method="POST"
    )
    config.add_route(
        "matakuliah_update", "/api/matakuliah/{id}", request_method="PUT"
    )
    config.add_route(
        "matakuliah_delete", "/api/matakuliah/{id}", request_method="DELETE"
    )

