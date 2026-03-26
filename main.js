/* CEK LOGIN */
if (localStorage.getItem("login") !== "true") {
  window.location.href = "assets/login/login.html";
}

function logout() {
  localStorage.removeItem("login");

  window.location.href = "assets/login/login.html";
}

/* =========================
   SIDEBAR
========================= */
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle-sidebar");
const toggleIcon = document.querySelector(".toggle-sidebar i");

function toggleSidebar() {
  const body = document.body;
  const icon = document.querySelector(".toggle-sidebar i");

  body.classList.toggle("sidebar-collapsed");

  if (body.classList.contains("sidebar-collapsed")) {
    icon.className = "fa-solid fa-bars";
  } else {
    icon.className = "fa-solid fa-xmark";
  }
}

function closeSidebarMobile() {
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }
}

function toggleMenu(el) {
  const item = el.closest(".menu-item");
  document.querySelectorAll(".menu-item").forEach((i) => {
    if (i !== item) i.classList.remove("open");
  });

  item.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".submenu a.active").forEach((link) => {
    const item = link.closest(".menu-item");
    if (item) item.classList.add("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");

  if (!sidebar) return;

  sidebar.addEventListener("click", function (e) {
    const link = e.target.closest("a");

    if (!link) return;

    const parent = link.parentElement;

    if (parent.classList.contains("menu-item")) {
      return;
    }

    if (window.innerWidth <= 768) {
      closeSidebarMobile();
    }
  });
});

/* =========================
   NAVBAR
========================= */
function toggleUserMenu() {
  document.querySelector(".user-menu").classList.toggle("open");
}

function toggleNotif() {
  document.querySelector(".notif").classList.toggle("open");
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

/* CLOSE DROPDOWN OUTSIDE */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".user-menu")) {
    document.querySelector(".user-menu")?.classList.remove("open");
  }
  if (!e.target.closest(".notif")) {
    document.querySelector(".notif")?.classList.remove("open");
  }
});

/* =========================
   COMMAND PALETTE
========================= */
const palette = document.getElementById("commandPalette");
const input = document.getElementById("cpInput");
const list = document.getElementById("cpList");

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openPalette();
  }
  if (e.key === "Escape") closePalette();
});

function openPalette() {
  document.getElementById("commandPalette").classList.add("open");
}

function closePalette() {
  document.getElementById("commandPalette").classList.remove("open");
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openPalette();
  }
});

function closePalette() {
  palette.classList.remove("open");
}

input.addEventListener("input", filterList);

function filterList() {
  const q = input.value.toLowerCase();
  [...list.children].forEach((li) => {
    li.style.display = li.textContent.toLowerCase().includes(q) ? "flex" : "none";
  });
  setActiveFirst();
}

function setActiveFirst() {
  [...list.children].forEach((li) => li.classList.remove("active"));
  const first = [...list.children].find((li) => li.style.display !== "none");
  if (first) first.classList.add("active");
}

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  runCommand(li.dataset.action);
});

function runCommand(cmd) {
  closePalette();
  console.log("Run command:", cmd);
}

/* =========================
   Content dashboard 1
========================= */
const bulan = document.getElementById("bulan");
const tahun = document.getElementById("tahun");
const ruangan = document.getElementById("ruangan");
const btn = document.querySelector(".btn");

/* BULAN */
const bulanList = ["Pilih Bulan", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

bulanList.forEach((b, i) => {
  const opt = document.createElement("option");
  opt.value = i === 0 ? "" : i; 
  opt.textContent = b;

  if (i === 0) {
    opt.disabled = true;
    opt.selected = true;
  }

  bulan.appendChild(opt);
});

/* TAHUN */
const tahunSekarang = new Date().getFullYear();

const optTahun = document.createElement("option");
optTahun.value = "";
optTahun.textContent = "Pilih Tahun";
optTahun.disabled = true;
optTahun.selected = true;
tahun.appendChild(optTahun);

for (let t = tahunSekarang - 1; t <= tahunSekarang + 1; t++) {
  const opt = document.createElement("option");
  opt.value = t;
  opt.textContent = t;
  tahun.appendChild(opt);
}

/* RUANGAN */
const ruanganList = ["Pilih Ruangan", "ICU", "IGD", "NICU", "CSSD", "Farmasi", "Radiologi", "CATHLAB", "POLI ANAK", "POLI GIGI", "POLI JANTUNG", "POLI OBGYN", "OK CITO", "RANAP ANAK", "VVIP"];

ruanganList.forEach((r, i) => {
  const opt = document.createElement("option");
  opt.value = i === 0 ? "" : r;
  opt.textContent = r;

  if (i === 0) {
    opt.disabled = true;
    opt.selected = true;
  }

  ruangan.appendChild(opt);
});

/* VALIDASI SAAT KLIK */
btn.addEventListener("click", () => {
  [bulan, tahun, ruangan].forEach((el) => el.classList.remove("error"));

  if (!bulan.value) {
    bulan.classList.add("error");
    bulan.focus();
    alert("Silakan pilih Bulan terlebih dahulu");
    return;
  }

  if (!tahun.value) {
    tahun.classList.add("error");
    tahun.focus();
    alert("Silakan pilih Tahun terlebih dahulu");
    return;
  }

  if (!ruangan.value) {
    ruangan.classList.add("error");
    ruangan.focus();
    alert("Silakan pilih Ruangan terlebih dahulu");
    return;
  }

  alert("Filter berhasil diterapkan");
});

[bulan, tahun, ruangan].forEach((el) => {
  el.addEventListener("change", () => {
    if (el.value) el.classList.remove("error");
  });
});

btn.addEventListener("click", () => {
  let valid = true;

  [bulan, tahun, ruangan].forEach((el) => {
    el.classList.remove("error");
  });

  if (!bulan.value) {
    bulan.classList.add("error");
    valid = false;
  }

  if (!tahun.value) {
    tahun.classList.add("error");
    valid = false;
  }

  if (!ruangan.value) {
    ruangan.classList.add("error");
    valid = false;
  }

  if (!valid) return;

  console.log("Filter OK");
});

[bulan, tahun, ruangan].forEach((el) => {
  el.addEventListener("change", () => {
    if (el.value) el.classList.remove("error");
  });
});

// ===== JS Konten 2 =====
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: ["Ya", "Tidak", "Tidak Dinilai"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#0f766e", "#14b8a6", "#5eead4"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Haircap", "Faceshield", "Masker", "Gown", "Sarung Tangan", "Sepatu Tertutup"],
    datasets: [
      {
        label: "Jumlah",
        data: [4, 3, 2, 4, 3, 4],
        backgroundColor: "#0f766e",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

new Chart(document.getElementById("donutChart"), {
  type: "doughnut",
  data: {
    labels: ["Numerator", "Denumerator"],
    datasets: [
      {
        data: [2, 2],
        backgroundColor: ["#0f766e", "#5eead4"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

document.addEventListener("DOMContentLoaded", () => {
  // Ambil HANYA submenu (yang punya href & berada di .submenu)
  const submenuLinks = document.querySelectorAll(".submenu a");

  submenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // HANYA HP & TABLET
      if (window.innerWidth <= 1024) {
        document.body.classList.add("sidebar-collapsed");
      }
    });
  });
});

if (window.innerWidth <= 1024) {
  document.body.classList.add("sidebar-collapsed");
}
