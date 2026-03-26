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
const userToggle = document.getElementById("userToggle");
const adminToggle = document.getElementById("adminToggle");
const statusUser = document.getElementById("statusUser");
const statusAdmin = document.getElementById("statusAdmin");
const toast = document.getElementById("toast");

function updateStatus(){

if(statusUser){
statusUser.textContent = userToggle && userToggle.checked ? "Aktif" : "Nonaktif";
}

if(statusAdmin){
statusAdmin.textContent = adminToggle && adminToggle.checked ? "Aktif" : "Nonaktif";
}

}

if(userToggle){
userToggle.addEventListener("change",updateStatus);
}

if(adminToggle){
adminToggle.addEventListener("change",updateStatus);
}


function loadSetting(){

let data = null;

try{
data = JSON.parse(localStorage.getItem("setting_pendaftaran"));
}catch(e){
data = null;
}

if(data){

if(userToggle){
userToggle.checked = !!data.user;
}

if(adminToggle){
adminToggle.checked = !!data.admin;
}

}

updateStatus();

}

loadSetting();


document.getElementById("simpanStatus").onclick = function(){

let data = {
user: userToggle ? userToggle.checked : false,
admin: adminToggle ? adminToggle.checked : false
};

localStorage.setItem("setting_pendaftaran", JSON.stringify(data));

if(toast){
toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2500);
}

};


































// =================================== Cara Menghubungkan ke Halaman Login

//const setting = JSON.parse(localStorage.getItem("setting_pendaftaran"));
//if(setting){
//f(setting.user === "nonaktif"){
//document.getElementById("btnDaftarUser").style.display="none";
//}
//if(setting.admin === "nonaktif"){
//document.getElementById("btnDaftarAdmin").style.display="none";
//}
//}