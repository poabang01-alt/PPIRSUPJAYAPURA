/* =========================
   SIDEBAR
========================= */
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-sidebar');
const toggleIcon = document.querySelector('.toggle-sidebar i');


function toggleSidebar() {
  const body = document.body;
  const icon = document.querySelector('.toggle-sidebar i');

  body.classList.toggle('sidebar-collapsed');

  if (body.classList.contains('sidebar-collapsed')) {
    icon.className = 'fa-solid fa-bars';
  } else {
    icon.className = 'fa-solid fa-xmark';
  }
}



  function closeSidebarMobile() {
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }
  }

  function toggleMenu(el) {
  const item = el.closest('.menu-item');
  document.querySelectorAll('.menu-item').forEach(i => {
    if (i !== item) i.classList.remove('open');
  });

  item.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.submenu a.active').forEach(link => {
    const item = link.closest('.menu-item');
    if (item) item.classList.add('open');
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


  
document.addEventListener('DOMContentLoaded', () => {
  const submenuLinks = document.querySelectorAll('.submenu a');

  submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        document.body.classList.add('sidebar-collapsed');
      }
    });
  });
});

if (window.innerWidth <= 1024) {
  document.body.classList.add('sidebar-collapsed');
}






  


/* =========================
   NAVBAR
========================= */
function toggleUserMenu() {
  document.querySelector('.user-menu').classList.toggle('open');
}

function toggleNotif() {
  document.querySelector('.notif').classList.toggle('open');
}

function toggleTheme() {
  document.body.classList.toggle('light');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.user-menu')) {
    document.querySelector('.user-menu')?.classList.remove('open');
  }
  if (!e.target.closest('.notif')) {
    document.querySelector('.notif')?.classList.remove('open');
  }
});

/* =========================
   COMMAND PALETTE
========================= */
const palette = document.getElementById('commandPalette');
const input = document.getElementById('cpInput');
const list = document.getElementById('cpList');

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openPalette();
  }
  if (e.key === 'Escape') closePalette();
});

function openPalette() {
  document.getElementById('commandPalette').classList.add('open');
}

function closePalette() {
  document.getElementById('commandPalette').classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openPalette();
  }
});


function closePalette() {
  palette.classList.remove('open');
}

input.addEventListener('input', filterList);

function filterList() {
  const q = input.value.toLowerCase();
  [...list.children].forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(q)
      ? 'flex'
      : 'none';
  });
  setActiveFirst();
}

function setActiveFirst() {
  [...list.children].forEach(li => li.classList.remove('active'));
  const first = [...list.children].find(li => li.style.display !== 'none');
  if (first) first.classList.add('active');
}

list.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  runCommand(li.dataset.action);
});

function runCommand(cmd) {
  closePalette();
  console.log('Run command:', cmd);
}





























/* ================= DATA ================= */
const STORAGE_KEY = "observasi_apd_fields";

/* ================= DEFAULT FIELD ================= */
const defaultFields = [
  { name: "haircap", label: "Haircap" },
  { name: "faceshield", label: "Faceshield" },
  { name: "sarung_tangan", label: "Sarung Tangan" },
  { name: "masker", label: "Masker" },
  { name: "gown", label: "Gown" },
  { name: "sepatu_tertutup", label: "Sepatu Tertutup" },
  { name: "kaos_kaki", label: "Kaos Kaki" },
  { name: "switer", label: "Switer" }
];

/* ================= LOAD DATA ================= */
let fields = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (!fields) {
  fields = [...defaultFields];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
}

let editIndex = null;
let deleteIndex = null;

/* ================= ELEMENT ================= */
const table = document.getElementById("fieldTable");
const modal = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveField");

const inputName = document.getElementById("fieldName");
const inputLabel = document.getElementById("fieldLabel");
const modalAlert = document.getElementById("modalAlert");

const confirmOverlay = document.getElementById("confirmOverlay");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

/* ================= RENDER TABLE ================= */
function renderTable() {
  table.innerHTML = "";
  fields.forEach((item, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td><span class="field-code">${item.name}</span></td>
        <td>${item.label}</td>
        <td>
          <div class="action-btn">
            <i class="fa-regular fa-pen-to-square edit" onclick="openEdit(${index})"></i>
            <i class="fa-regular fa-trash-can delete" onclick="openDelete(${index})"></i>
          </div>
        </td>
      </tr>
    `;
  });
}

/* ================= MOBILE ================= */
function enableMobileCardToggle() {
  if (window.innerWidth > 768) return;
  document.querySelectorAll("#fieldTable tr").forEach(row => {
    row.addEventListener("click", e => {
      if (e.target.tagName === "I") return;
      row.classList.toggle("active");
    });
  });
}

/* ================= MODAL CONTROL ================= */
function closeModal() {
  modal.style.display = "none";
  modalAlert.style.display = "none";
  editIndex = null;
}

/* klik tombol X */
closeBtn.addEventListener("click", closeModal);

/* klik area gelap (overlay) */
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/* ================= TAMBAH ================= */
openBtn.addEventListener("click", () => {
  editIndex = null;
  modalTitle.textContent = "Tambah Field Baru";
  saveBtn.textContent = "Tambah";
  inputName.value = "";
  inputLabel.value = "";
  modalAlert.style.display = "none";
  modal.style.display = "flex";
});

/* ================= EDIT ================= */
function openEdit(index) {
  editIndex = index;
  modalTitle.textContent = "Edit Field";
  saveBtn.textContent = "Simpan";
  inputName.value = fields[index].name;
  inputLabel.value = fields[index].label;
  modalAlert.style.display = "none";
  modal.style.display = "flex";
}

/* ================= SIMPAN ================= */
saveBtn.addEventListener("click", () => {
  const name = inputName.value.trim();
  const label = inputLabel.value.trim();

  if (!name || !label) {
    modalAlert.style.display = "block";
    return;
  }

  if (editIndex !== null) {
    fields[editIndex] = { name, label };
    showToast("Field berhasil diperbarui");
  } else {
    fields.push({ name, label });
    showToast("Field berhasil ditambahkan");
  }

  saveToStorage();
  renderTable();
  enableMobileCardToggle();
  closeModal();
});

/* ================= HAPUS ================= */
function openDelete(index) {
  deleteIndex = index;
  confirmOverlay.style.display = "flex";
}

confirmDeleteBtn.addEventListener("click", () => {
  if (deleteIndex !== null) {
    fields.splice(deleteIndex, 1);
    saveToStorage();
    renderTable();
    enableMobileCardToggle();
    showToast("Field berhasil dihapus");
    deleteIndex = null;
  }
  confirmOverlay.style.display = "none";
});

cancelDeleteBtn.addEventListener("click", () => {
  confirmOverlay.style.display = "none";
  deleteIndex = null;
});

/* ================= TOAST ================= */
function showToast(msg) {
  toastMessage.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ================= STORAGE ================= */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
}

/* ================= INIT ================= */
renderTable();
enableMobileCardToggle();
