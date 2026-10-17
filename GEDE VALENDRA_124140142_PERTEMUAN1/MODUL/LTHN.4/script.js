// ==========================================
// MODUL 1 - LATIHAN 4
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initMahasiswaManager();
    initPostsAPI();
    initTodoList();
});

// ----------------------------------------------------
// FITUR 4: Dark Mode Toggle dengan Manipulasi Class CSS
// ----------------------------------------------------
function initDarkMode() {
    const themeBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerText = "☀️ Mode Terang";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        themeBtn.innerText = isDark ? "☀️ Mode Terang" : "🌓 Mode Gelap";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

// ----------------------------------------------------------------------
// FITUR 1 & 2: Form Mahasiswa + Validasi + LocalStorage (Persistensi)
// ----------------------------------------------------------------------
function initMahasiswaManager() {
    const form = document.getElementById("mhs-form");
    const nimInput = document.getElementById("mhs-nim");
    const namaInput = document.getElementById("mhs-nama");
    const jurusanInput = document.getElementById("mhs-jurusan");
    const nilaiInput = document.getElementById("mhs-nilai");
    const tableBody = document.getElementById("mhs-table-body");

    // Ambil data mahasiswa dari localStorage
    function getMahasiswaList() {
        return JSON.parse(localStorage.getItem("data_mahasiswa") || "[]");
    }

    function saveMahasiswaList(list) {
        localStorage.setItem("data_mahasiswa", JSON.stringify(list));
    }

    function renderTable() {
        const list = getMahasiswaList();
        tableBody.innerHTML = "";

        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Belum ada data mahasiswa.</td></tr>`;
            return;
        }

        list.forEach((mhs, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${mhs.nim}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.jurusan}</td>
                <td>${mhs.nilai}</td>
                <td>
                    <button class="btn btn-danger btn-delete-mhs" data-index="${index}">Hapus</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function validate() {
        let isValid = true;

        // Validasi NIM (min 4 char)
        if (nimInput.value.trim().length < 4) {
            document.getElementById("err-nim").style.display = "block";
            isValid = false;
        } else {
            document.getElementById("err-nim").style.display = "none";
        }

        // Validasi Nama (min 3 char)
        if (namaInput.value.trim().length < 3) {
            document.getElementById("err-nama").style.display = "block";
            isValid = false;
        } else {
            document.getElementById("err-nama").style.display = "none";
        }

        // Validasi Jurusan
        if (!jurusanInput.value) {
            document.getElementById("err-jurusan").style.display = "block";
            isValid = false;
        } else {
            document.getElementById("err-jurusan").style.display = "none";
        }

        // Validasi Nilai (0 - 100)
        const val = parseFloat(nilaiInput.value);
        if (isNaN(val) || val < 0 || val > 100 || nilaiInput.value === "") {
            document.getElementById("err-nilai").style.display = "block";
            isValid = false;
        } else {
            document.getElementById("err-nilai").style.display = "none";
        }

        return isValid;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validate()) return;

        const list = getMahasiswaList();

        // Cek duplikasi NIM
        if (list.some(m => m.nim.trim() === nimInput.value.trim())) {
            alert("Mahasiswa dengan NIM tersebut sudah terdaftar!");
            return;
        }

        list.push({
            nim: nimInput.value.trim(),
            nama: namaInput.value.trim(),
            jurusan: jurusanInput.value,
            nilai: Number(nilaiInput.value)
        });

        saveMahasiswaList(list);
        renderTable();
        form.reset();
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-delete-mhs")) {
            const index = Number(e.target.dataset.index);
            const list = getMahasiswaList();
            list.splice(index, 1);
            saveMahasiswaList(list);
            renderTable();
        }
    });

    // Initial render
    renderTable();
}

// ---------------------------------------------------------------------------------
// FITUR 3 & 5: Daftar Post API + Search Filter by Title + Pagination (Prev/Next)
// ---------------------------------------------------------------------------------
function initPostsAPI() {
    const searchInput = document.getElementById("post-search");
    const container = document.getElementById("posts-container");
    const loadingElem = document.getElementById("posts-loading");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const pageInfo = document.getElementById("page-info");

    let allPosts = [];
    let filteredPosts = [];
    let currentPage = 1;
    const itemsPerPage = 6;

    async function fetchPosts() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            allPosts = await response.json();
            filteredPosts = allPosts;
            loadingElem.style.display = "none";
            renderPosts();
        } catch (err) {
            loadingElem.innerText = "Gagal memuat data dari API. Silakan coba lagi.";
        }
    }

    function renderPosts() {
        container.innerHTML = "";
        const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

        if (currentItems.length === 0) {
            container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Tidak ada postingan yang sesuai pencarian.</p>`;
        } else {
            currentItems.forEach(post => {
                const card = document.createElement("div");
                card.className = "post-item";
                card.innerHTML = `
                    <h4>#${post.id} ${post.title}</h4>
                    <p>${post.body.substring(0, 90)}...</p>
                `;
                container.appendChild(card);
            });
        }

        pageInfo.innerText = `Halaman ${currentPage} dari ${totalPages}`;
        btnPrev.disabled = currentPage <= 1;
        btnNext.disabled = currentPage >= totalPages;
    }

    // Filter Search by Title
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(query));
        currentPage = 1;
        renderPosts();
    });

    btnPrev.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    btnNext.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
        }
    });

    fetchPosts();
}

// ----------------------------------------------------------------------------------
// FITUR 6: Aplikasi Todo List (Tambah, Hapus, Selesai, DOM + LocalStorage)
// ----------------------------------------------------------------------------------
function initTodoList() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    function getTodos() {
        return JSON.parse(localStorage.getItem("todos_data") || "[]");
    }

    function saveTodos(todos) {
        localStorage.setItem("todos_data", JSON.stringify(todos));
    }

    function renderTodoList() {
        const todos = getTodos();
        todoList.innerHTML = "";

        if (todos.length === 0) {
            todoList.innerHTML = `<li style="text-align: center; color: var(--text-muted); list-style: none;">Belum ada kegiatan.</li>`;
            return;
        }

        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = `todo-item ${todo.completed ? "completed" : ""}`;
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="todo-item-actions">
                    <button class="btn btn-outline btn-toggle-todo" data-index="${index}">
                        ${todo.completed ? "Batal" : "Selesai"}
                    </button>
                    <button class="btn btn-danger btn-delete-todo" data-index="${index}">Hapus</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (!text) return;

        const todos = getTodos();
        todos.push({ text, completed: false });
        saveTodos(todos);
        renderTodoList();
        todoInput.value = "";
    });

    todoList.addEventListener("click", (e) => {
        const todos = getTodos();
        const index = e.target.dataset.index;

        if (e.target.classList.contains("btn-toggle-todo")) {
            todos[index].completed = !todos[index].completed;
            saveTodos(todos);
            renderTodoList();
        } else if (e.target.classList.contains("btn-delete-todo")) {
            todos.splice(index, 1);
            saveTodos(todos);
            renderTodoList();
        }
    });

    renderTodoList();
}
