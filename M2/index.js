const DAYS = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

class Storage {
  static get = (k, def) => JSON.parse(localStorage.getItem(`mono:${k}`)) ?? def;
  static set = (k, v) => localStorage.setItem(`mono:${k}`, JSON.stringify(v));
}

class ScheduleApp {
  constructor() {
    this.courses = Storage.get("courses", []);
    this.dark = Storage.get("dark", false);
    this.filterDay = "Semua";
    if (this.dark) document.body.classList.add("invert-theme");

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.loadWeather();
    this.render();
  }

  updateTime() {
    const now = new Date();
    const hr = now.getHours();
    const greet =
      hr < 11
        ? "Selamat Morning."
        : hr < 15
          ? "Selamat Afternoon"
          : hr < 18
            ? "Selamat Sore."
            : "Selamat Evening";
    document.getElementById("greeting").textContent = greet;
    document.getElementById("clock").textContent =
      now.toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" }) +
      " WIB";
  }

  toggleTheme() {
    this.dark = !this.dark;
    document.body.classList.toggle("invert-theme", this.dark);
    Storage.set("dark", this.dark);
  }

  toggleForm(force) {
    const el = document.getElementById("form-dropdown");
    const show = force !== undefined ? force : el.classList.contains("hidden");
    el.classList.toggle("hidden", !show);
    if (!show) {
      document.getElementById("c-id").value = "";
      document.getElementById("form-title").textContent =
        "Tambah Jadwal Kuliah";
      document.getElementById("submit-btn").textContent = "Simpan Jadwal";
    }
  }

  async loadWeather() {
    const el = document.getElementById("weather");
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-5.358&longitude=105.314&current_weather=true",
      );
      const { current_weather: w } = await res.json();
      const st =
        w.weathercode === 0
          ? "Cerah"
          : w.weathercode < 50
            ? "Berawan"
            : "Hujan";
      el.textContent = `ITERA ${w.temperature}°C (${st})`;
    } catch {
      el.textContent = "Cuaca Offline";
    }
  }

  saveCourse(e) {
    e.preventDefault();
    const id = document.getElementById("c-id").value;
    const item = {
      id: id || Date.now().toString(36),
      name: document.getElementById("c-name").value,
      day: document.getElementById("c-day").value,
      room: document.getElementById("c-room").value,
      start: document.getElementById("c-start").value,
      end: document.getElementById("c-end").value,
    };
    this.courses = id
      ? this.courses.map((c) => (c.id === id ? item : c))
      : [...this.courses, item];
    e.target.reset();
    this.toggleForm(false);
    this.sync();
  }

  editCourse(id) {
    const c = this.courses.find((x) => x.id === id);
    if (!c) return;
    document.getElementById("c-id").value = c.id;
    document.getElementById("c-name").value = c.name;
    document.getElementById("c-day").value = c.day;
    document.getElementById("c-room").value = c.room;
    document.getElementById("c-start").value = c.start;
    document.getElementById("c-end").value = c.end;
    document.getElementById("form-title").textContent = "Edit Jadwal Kuliah";
    document.getElementById("submit-btn").textContent = "Update Jadwal";
    this.toggleForm(true);
  }

  deleteCourse(id) {
    this.courses = this.courses.filter((c) => c.id !== id);
    this.sync();
  }

  getFiltered() {
    return this.courses
      .filter((c) => this.filterDay === "Semua" || c.day === this.filterDay)
      .sort((a, b) => a.start.localeCompare(b.start));
  }

  formatText() {
    const list = this.getFiltered();
    if (!list.length) return "Belum ada jadwal kuliah.";
    const header = `*JADWAL KULIAH (${this.filterDay.toUpperCase()})*\n`;
    const body = list
      .map(
        (c) =>
          `• *${c.day}* (${c.start}-${c.end}) — ${c.name} [Ruang: ${c.room}]`,
      )
      .join("\n");
    return `${header}${body}`;
  }

  async copySchedule() {
    await navigator.clipboard.writeText(this.formatText());
    const btn = document.getElementById("copy-btn");
    btn.textContent = "✓ Tersalin!";
    setTimeout(() => (btn.textContent = "Salin Teks"), 1500);
  }

  shareWA() {
    const url = `https://wa.me/?text=${encodeURIComponent(this.formatText())}`;
    window.open(url, "_blank");
  }

  setFilter(day) {
    this.filterDay = day;
    this.render();
  }
  sync() {
    Storage.set("courses", this.courses);
    this.render();
  }

  render() {
    document.getElementById("total-count").textContent =
      `${this.courses.length} Mata Kuliah Terdaftar`;

    document.getElementById("day-filters").innerHTML = DAYS.map(
      (d) => `
        <button onclick="app.setFilter('${d}')" class="pb-1 transition ${this.filterDay === d ? "font-bold line-b" : "opacity-40 hover:opacity-100"}">${d}</button>
    `,
    ).join("");

    const filtered = this.getFiltered();
    document.getElementById("schedule-list").innerHTML = filtered.length
      ? filtered
          .map(
            (c) => `
        <div class="py-4 flex justify-between items-center group">
        <div class="flex items-baseline gap-6">
            <div class="mono text-xs w-28 shrink-0">
            <div class="font-bold uppercase">${c.day}</div>
            <div class="opacity-60">${c.start} — ${c.end}</div>
            </div>
            <div>
            <div class="text-lg font-medium tracking-tight">${c.name}</div>
            <div class="mono text-xs opacity-60">Ruang ${c.room}</div>
            </div>
        </div>
        <div class="flex gap-3 text-xs mono opacity-50 group-hover:opacity-100 transition">
            <button onclick="app.editCourse('${c.id}')" class="hover:underline">Edit</button>
            <button onclick="app.deleteCourse('${c.id}')" class="hover:underline">Hapus</button>
        </div>
        </div>
    `,
          )
          .join("")
      : `<div class="py-16 text-center text-sm opacity-40">Tidak ada jadwal kuliah untuk ditampilkan.</div>`;
  }
}

const app = new ScheduleApp();
