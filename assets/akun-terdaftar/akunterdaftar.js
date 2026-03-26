



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




















//========================== JS KONTEN ===================//
// ================= CONFIG & STORAGE =================
// Mengatur penyimpanan dan pengambilan data user dari localStorage
const STORAGE_KEY = "rsup_users_data";


function saveUsers(){
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(users)
  );
}

function resetUsers(){
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function showToast(message, type="success"){
  const toast = document.getElementById("toast");
  toast.innerText = message;
  if(type==="success"){
    toast.style.background="#0aa89e";
  }else if(type==="danger"){
    toast.style.background="#d9534f";
  }
  toast.classList.add("show");
  setTimeout(()=>{
    toast.classList.remove("show");
  },3000);
}


// ================= DATA USER =================
// Data user diambil dari localStorage atau menggunakan data default
let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {username:"admin1", nama:"Admin Utama", jabatan:"IT Support", ruangan:"Server", role:"Admin"},
  {username:"admin2", nama:"Admin Sistem", jabatan:"Programmer", ruangan:"IT Room", role:"Admin"},
  {username:"admin3", nama:"Admin Keuangan", jabatan:"Finance", ruangan:"Keuangan", role:"Admin"},
  {username:"admin4", nama:"Admin HRD", jabatan:"HRD", ruangan:"SDM", role:"Admin"},
  {username:"admin5", nama:"Admin Database", jabatan:"DBA", ruangan:"IT Room", role:"Admin"},
  {username:"admin6", nama:"Admin Logistik", jabatan:"Logistik", ruangan:"Gudang", role:"Admin"},
  {username:"admin7", nama:"Admin Aset", jabatan:"Aset", ruangan:"Manajemen", role:"Admin"},
  {username:"admin8", nama:"Admin RekamMedis", jabatan:"Rekam Medis", ruangan:"RM", role:"Admin"},
  {username:"admin9", nama:"Admin Monitoring", jabatan:"Quality Control", ruangan:"QA", role:"Admin"},
  {username:"admin10", nama:"Admin Direksi", jabatan:"Sekretaris", ruangan:"Direksi", role:"Admin"},
  {username:"admin11", nama:"Admin IT2", jabatan:"Network", ruangan:"IT Room", role:"Admin"},
  {username:"admin12", nama:"Admin Backup", jabatan:"System Analyst", ruangan:"IT Room", role:"Admin"},
  {username:"admin13", nama:"Admin Support2", jabatan:"Support", ruangan:"IT Room", role:"Admin"},
  {username:"admin14", nama:"Admin Internal", jabatan:"Auditor", ruangan:"Audit", role:"Admin"},
  {username:"admin15", nama:"Admin Developer", jabatan:"Frontend Dev", ruangan:"IT Room", role:"Admin"},

  // ===== USER / PEGAWAI =====
  {username:"rsup", nama:"RSUP", jabatan:"123", ruangan:"123", role:"User"},
  {username:"salwa", nama:"Salwa Helmia Firda", jabatan:"IPCLN", ruangan:"POLI PENYAKIT DALAM", role:"User"},
  {username:"susan", nama:"Susan Ariyanti", jabatan:"IPCLN", ruangan:"POLI ANAK", role:"User"},
  {username:"gustini", nama:"Gustini Wulandari", jabatan:"IPCLN", ruangan:"POLI OBGYN", role:"User"},
  {username:"rinditiya", nama:"Rinditiya Rafa Nadidah", jabatan:"IPCLN", ruangan:"POLI BEDAH", role:"User"},
  {username:"sindi", nama:"Sindi Falderal", jabatan:"IPCLN", ruangan:"POLI SYARAF", role:"User"},
  {username:"fachris", nama:"Fachri Ramadhani", jabatan:"IPCLN", ruangan:"POLI MATA", role:"User"},
  {username:"ruth", nama:"Ruth Dame Ivana", jabatan:"IPCLN", ruangan:"POLI JANTUNG", role:"User"},
  {username:"sahrul", nama:"Sahrul Rustan", jabatan:"IPCLN", ruangan:"POLI GIGI", role:"User"},
  {username:"yunita", nama:"Yunita Larasti", jabatan:"IPCLN", ruangan:"POLI VCT", role:"User"},
  {username:"kristy", nama:"Kristy Handayani", jabatan:"IPCLN", ruangan:"POLI DOTS", role:"User"},
  {username:"riana", nama:"Riana Nurul Iza", jabatan:"IPCLN", ruangan:"RANAP BEDAH", role:"User"},
  {username:"noviatis", nama:"Noviati Pardede", jabatan:"IPCLN", ruangan:"RANAP VIP", role:"User"},
  {username:"aprillia", nama:"Aprillia Vanessha", jabatan:"IPCLN", ruangan:"RANAP ANAK", role:"User"},
  {username:"doni", nama:"Doni Saputra", jabatan:"Perawat", ruangan:"IGD", role:"User"},
  {username:"andi", nama:"Andi Wijaya", jabatan:"Perawat", ruangan:"ICU", role:"User"},
  {username:"maria", nama:"Maria Susanti", jabatan:"Perawat", ruangan:"NICU", role:"User"},
  {username:"ferdi", nama:"Ferdi Kurniawan", jabatan:"Dokter", ruangan:"IGD", role:"User"},
  {username:"lina", nama:"Lina Marlina", jabatan:"Bidan", ruangan:"VK", role:"User"},
  {username:"agus", nama:"Agus Pratama", jabatan:"Farmasi", ruangan:"Apotek", role:"User"},
  {username:"riko", nama:"Riko Saputra", jabatan:"Radiologi", ruangan:"Radiologi", role:"User"},
  {username:"sari", nama:"Sari Purnama", jabatan:"Analis", ruangan:"Lab", role:"User"},
  {username:"budi", nama:"Budi Hartono", jabatan:"Perawat", ruangan:"Ruang Bedah", role:"User"},
  {username:"nina", nama:"Nina Oktaviani", jabatan:"Perawat", ruangan:"Ruang Anak", role:"User"},
  {username:"dian", nama:"Dian Pratiwi", jabatan:"Perawat", ruangan:"Ruang Interna", role:"User"},
  {username:"wahyu", nama:"Wahyu Hidayat", jabatan:"Keamanan", ruangan:"Security", role:"User"},
  {username:"eko", nama:"Eko Prasetyo", jabatan:"Teknisi", ruangan:"Maintenance", role:"User"},
  {username:"putri", nama:"Putri Aulia", jabatan:"Admin Poli", ruangan:"Poli Umum", role:"User"},
  {username:"rahmat", nama:"Rahmat Hidayat", jabatan:"Driver", ruangan:"Ambulance", role:"User"},
  {username:"indra", nama:"Indra Gunawan", jabatan:"Perawat", ruangan:"ICU", role:"User"}
];

// ================= GLOBAL STATE =================
// Menyimpan kondisi filter dan pagination yang sedang aktif
let currentFilter = "User";
let currentPage = 1;
const rowsPerPage = 10;

// ================= RENDER TABLE =================
// Menampilkan data user ke tabel berdasarkan filter, search, dan pagination
function updateSummary(){
  const totalUser = users.filter(u=>u.role==="User").length;
  const totalAdmin = users.filter(u=>u.role==="Admin").length;
  animateCounter("totalPegawai", totalUser);
  animateCounter("totalAdmin", totalAdmin);
}

function renderTable(){
  showSkeleton();
  setTimeout(()=>{
    const table = document.getElementById("userTable");
    table.innerHTML="";
    const search = document.getElementById("searchInput").value.toLowerCase();
    let filtered = users
  .map((u,index)=>({ ...u, originalIndex:index }))
  .filter(u =>
    u.role===currentFilter &&
    (
      u.nama.toLowerCase().includes(search) ||
      u.jabatan.toLowerCase().includes(search) ||
      u.ruangan.toLowerCase().includes(search)
    )
  );

    const start = (currentPage-1)*rowsPerPage;
    const paginated = filtered.slice(start, start+rowsPerPage);
    paginated.forEach((u,i)=>{
      table.innerHTML+=`
        <tr>
          <td>${start+i+1}</td>
          <td>${u.username}</td>
          <td class="user-cell">
  <div class="user-info">
    <div class="avatar">

      ${u.avatar ? `<img src="${u.avatar}" alt="${u.nama}">`
 : `<span class="avatar-initial" data-name="${u.nama}"></span>`}
    </div>
    <div class="user-name">${u.nama}</div>
  </div>
</td>
          <td>${u.jabatan}</td>
          <td>${u.ruangan}</td>
          <td><span class="badge">${u.role}</span></td>

          <td class="action-cell">

            <span class="action-btn edit" onclick="editUser(${u.originalIndex})">
              <i class="fa fa-pen"></i>
              <span class="tooltip">Edit</span>
            </span>

            <span class="action-btn delete" onclick="deleteUser(${u.originalIndex})">
              <i class="fa fa-trash"></i>
              <span class="tooltip">Hapus</span>
            </span>

          </td>

        </tr>
      `;
    });

    renderPagination(filtered.length);
    generateInitialAvatar();
    hideSkeleton();
  },300);
}

// ================= PAGINATION =================
// Membuat navigasi halaman tabel
function renderPagination(totalRows){
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  if(totalPages <= 1) return;

  pagination.innerHTML += `
    <button ${currentPage===1?'class="disabled"':''}
      onclick="changePage(1)">First</button>
  `;

  pagination.innerHTML += `
    <button ${currentPage===1?'class="disabled"':''}
      onclick="changePage(${currentPage-1})">&#171;</button>
  `;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  if(currentPage <= 3){
    endPage = Math.min(5, totalPages);
  }
  if(currentPage > totalPages - 3){
    startPage = Math.max(1, totalPages - 4);
  }
  for(let i = startPage; i <= endPage; i++){
    pagination.innerHTML += `
      <button onclick="changePage(${i})"
        class="${i===currentPage?'active':''}">
        ${i}
      </button>
    `;
  }

  pagination.innerHTML += `
    <button ${currentPage===totalPages?'class="disabled"':''}
      onclick="changePage(${currentPage+1})">&#187;</button>
  `;

  pagination.innerHTML += `
    <button ${currentPage===totalPages?'class="disabled"':''}
      onclick="changePage(${totalPages})">Last</button>
  `;
}

function changePage(page){
  const totalPages = Math.ceil(
    users.filter(u=>u.role===currentFilter).length / rowsPerPage
  );

  if(page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
}

// ================= DELETE USER =================
// Menangani proses hapus user dengan konfirmasi modal
function deleteUser(index){
  const user = users[index];
  document.getElementById("deleteIndex").value = index;
  document.getElementById("deleteText").innerText =
    `Apakah Anda yakin ingin menghapus ${user.nama}?`;
  document.getElementById("deleteModal").style.display = "flex";
}

function confirmDelete(){
  const index = document.getElementById("deleteIndex").value;
  const rows = document.querySelectorAll("#userTable tr");
  rows.forEach(row=>{
    if(row.innerText.includes(users[index].nama)){
      row.classList.add("fade-row");
    }
  });

  setTimeout(()=>{
    users.splice(index,1);
    saveUsers();
    closeDeleteModal();
    updateSummary();
    renderTable();
  },300);
}

function closeDeleteModal(){
  document.getElementById("deleteModal").style.display = "none";
}

window.addEventListener("click", function(e){
  const deleteModal = document.getElementById("deleteModal");
  const editModal = document.getElementById("editModal");
  if(e.target === deleteModal){
    closeDeleteModal();
  }
  if(e.target === editModal){
    closeModal();
  }
});

// ================= EDIT USER =================
// Menangani proses edit dan penyimpanan perubahan data user
function editUser(index){
  const user = users[index];
  document.getElementById("editIndex").value = index;
  document.getElementById("editUsername").value = user.username;
  document.getElementById("editNama").value = user.nama;
  document.getElementById("editJabatan").value = user.jabatan;
  document.getElementById("editRuangan").value = user.ruangan;

  const preview = document.getElementById("avatarPreview");

  if(preview){
    if(user.avatar){
      preview.innerHTML = `<img src="${user.avatar}">`;
    }else{
      preview.innerHTML = "Preview";
    }
  }
  document.getElementById("editModal").style.display="flex";

}

function saveEdit(){

  const index = parseInt(document.getElementById("editIndex").value);

  users[index].username = document.getElementById("editUsername").value;
  users[index].nama = document.getElementById("editNama").value;
  users[index].jabatan = document.getElementById("editJabatan").value;
  users[index].ruangan = document.getElementById("editRuangan").value;

  const fileInput = document.getElementById("editAvatar");
  const file = fileInput.files[0];

  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      users[index].avatar = e.target.result;
      saveUsers();  
      updateSummary();
      renderTable();
    };
    
    reader.readAsDataURL(file);
  }else{
    saveUsers();
    updateSummary();
    renderTable();
  }

  closeModal();

}

function closeModal(){
  document.getElementById("editModal").style.display="none";
  document.getElementById("editAvatar").value="";
}

document.getElementById("searchInput").addEventListener("input",()=>{
  currentPage=1;
  renderTable();
});

document.getElementById("btnPegawai").onclick=function(){
  currentFilter="User";
  this.classList.add("active");
  document.getElementById("btnAdmin").classList.remove("active");
  renderTable();
}

document.getElementById("btnAdmin").onclick=function(){
  currentFilter="Admin";
  this.classList.add("active");
  document.getElementById("btnPegawai").classList.remove("active");
  renderTable();
}

updateSummary();
renderTable();


const namaDepan = ["Andi","Budi","Citra","Dewi","Eko","Fajar","Gita","Hendra","Indah","Joko","Lina","Maya","Nina","Putra","Rani","Sari","Tono","Vina","Wahyu","Yuni"];
const namaBelakang = ["Saputra","Pratama","Wijaya","Susanti","Kurniawan","Lestari","Hidayat","Purnama","Ramadhan","Oktaviani"];
const jabatanList = ["Perawat","Dokter","Bidan","Farmasi","Radiologi","Analis","Admin Poli","Keamanan"];
const ruanganList = ["IGD","ICU","NICU","Poli Umum","Poli Anak","Ruang Bedah","Lab","Radiologi"];

function randomItem(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}


// ================= GENERATE DATA =================
// Membuat data user secara otomatis untuk testing
function generateUsers(total){
  users = [];
  for(let i=1;i<=total;i++){
    let role = i % 5 === 0 ? "Admin" : "User";
    let nama = randomItem(namaDepan) + " " + randomItem(namaBelakang);
    users.push({
      username: "user"+i,
      nama: nama,
      jabatan: randomItem(jabatanList),
      ruangan: randomItem(ruanganList),
      role: role
    });
  }

  currentPage = 1;
saveUsers();
updateSummary();
renderTable();
}

document.getElementById("generateSelect").addEventListener("change", function(){
  if(this.value){
    generateUsers(parseInt(this.value));
  }
});

document.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON"){
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    e.target.appendChild(ripple);
    const rect = e.target.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";
    setTimeout(()=> ripple.remove(),600);
  }
});

document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    const editModal = document.getElementById("editModal");
    const deleteModal = document.getElementById("deleteModal");

    if(editModal.style.display === "flex"){
      closeModal();
    }

    if(deleteModal.style.display === "flex"){
      closeDeleteModal();
    }
  }
});


document.addEventListener("click", function(e){
  const btn = e.target.closest(".action-btn");
  if(btn){
    btn.style.transform="scale(.9)";
    setTimeout(()=>{
      btn.style.transform="";
    },120);
  }
});

// ================= UTILITIES =================
// Fungsi pendukung untuk animasi, avatar, dan efek tampilan
function showSkeleton(rows=7){
  const sk = document.getElementById("tableSkeleton");
  sk.innerHTML="";
  sk.style.display="block";
  for(let i=0;i<rows;i++){
    sk.innerHTML+=`<div class="skeleton-row"></div>`;
  }
}

function hideSkeleton(){
  document.getElementById("tableSkeleton").style.display="none";
}


// ================= UTILITIES =================
// Fungsi pendukung untuk animasi, avatar, dan efek tampilan
function animateCounter(id,target){
  let el=document.getElementById(id);
  let start=0;
  const duration=800;
  const step=target/(duration/16);
  const timer=setInterval(()=>{
    start+=step;
    if(start>=target){
      start=target;
      clearInterval(timer);
    }
    el.innerText=Math.floor(start);
  },16);
}

// ================= UTILITIES =================
// Fungsi pendukung untuk animasi, avatar, dan efek tampilan
function generateInitialAvatar(){
  const avatars=document.querySelectorAll(".avatar-initial");
  avatars.forEach(el=>{
    const name=el.dataset.name;
    const initials=name
      .split(" ")
      .map(n=>n[0])
      .join("")
      .substring(0,2)
      .toUpperCase();
    el.innerText=initials;
  });
}

document
.getElementById("editAvatar")
.addEventListener("change",function(){
  const file=this.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=function(e){
    const preview=document.getElementById("avatarPreview");
    preview.innerHTML=`<img src="${e.target.result}">`;
  };
  reader.readAsDataURL(file);
});