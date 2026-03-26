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




















//========================== JS KONTEN ===================

let filteredData;
let renderLimit = 20;
let renderStep = 20;

const STORAGE_KEY = "laporan_apd_data";

/* =================================================
   INIT CHART
================================================= */

function initCharts(){

  // destroy existing
  if(window.pieChart instanceof Chart) window.pieChart.destroy();
  if(window.barChart instanceof Chart) window.barChart.destroy();
  if(window.donutChart instanceof Chart) window.donutChart.destroy();


  /* ===============================
     COMMON OPTIONS (PRO STYLE)
  =============================== */
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 18,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 13,
            weight: "600"
          }
        }
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        cornerRadius: 10,
        titleFont: { size: 14, weight: "600" },
        bodyFont: { size: 13 },
        displayColors: true
      }
    }
  };

  /* ===============================
     PIE OBSERVASI (ELEGANT)
  =============================== */
  window.pieChart = new Chart(
    document.getElementById("pieObservasi"),
    {
      type:"pie",
      data:{
        labels:["Ya","Tidak","Tidak Dinilai"],
        datasets:[{
          data:[0,0,0],
          backgroundColor:[
            "rgba(0,95,115,0.95)",
            "rgba(155,34,38,0.95)",
            "rgba(148,210,189,0.95)"
          ],
          borderWidth: 0,
          hoverOffset: 14
        }]
      },
      options: commonOptions
    }
  );

  /* ===============================
     BAR APD (ROUNDED PREMIUM)
  =============================== */
  window.barChart = new Chart(
    document.getElementById("barAPD"),
    {
      type:"bar",
      data:{
        labels:[
          "Haircap","Faceshield",
          "Masker","Gown",
          "Sarung","Sepatu"
        ],
        datasets:[
          {
            label:"Ya",
            data:[0,0,0,0,0,0],
            backgroundColor:"#005f73",
            borderRadius: 12,
            barThickness: 26
          },
          {
            label:"Tidak",
            data:[0,0,0,0,0,0],
            backgroundColor:"#9b2226",
            borderRadius: 12,
            barThickness: 26
          },
          {
            label:"Tidak Dinilai",
            data:[0,0,0,0,0,0],
            backgroundColor:"#94d2bd",
            borderRadius: 12,
            barThickness: 26
          }
        ]
      },
      options:{
        ...commonOptions,
        scales:{
          x:{
            grid:{ display:false },
            ticks:{
              font:{ size:12 }
            }
          },
          y:{
            beginAtZero:true,
            grid:{
              color:"rgba(0,0,0,0.05)"
            },
            ticks:{
              stepSize:1,
              font:{ size:12 }
            }
          }
        }
      }
    }
  );

  /* ===============================
     DONUT ND (MODERN CUTOUT)
  =============================== */
  window.donutChart = new Chart(
    document.getElementById("donutND"),
    {
      type:"doughnut",
      data:{
        labels:["Numerator","Denominator"],
        datasets:[{
          data:[0,0],
          backgroundColor:[
            "rgba(0,95,115,0.95)",
            "rgba(148,210,189,0.95)"
          ],
          borderWidth:0,
          hoverOffset:12
        }]
      },
      options:{
        ...commonOptions,
        cutout:"68%"
      }
    }
  );

}

initCharts();

/* ==========================================
   3D TILT HOVER EFFECT (PREMIUM)
========================================== */

function init3DTilt(){

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    let rect;

    card.addEventListener("mouseenter", () => {
      rect = card.getBoundingClientRect();
      card.style.transition = "transform 0.1s ease";
    });

    card.addEventListener("mousemove", (e) => {

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 18;
      const rotateY = (x - centerX) / 18;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transition = "transform 0.6s cubic-bezier(.22,.61,.36,1)";
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    });

  });

}

init3DTilt();

/* =================================================
   DATA TABEL
================================================= */

const tabelData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    no:1,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:2,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:3,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:4,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:5,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:6,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:7,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:8,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:9,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  },
  {
    no:10,
    auditor:"Muhammad Taufik Habir, S.Tr.Kes",
    pegawai:"Cristina Millen Manalu",
    tindakan:"Tindakan Flebotomis",
    ruangan:"LABORATORIUM",
    haircap:"Ya",
    faceshield:"Tidak",
    masker:"Ya",
    gown:"Ya",
    sarung:"Ya",
    sepatu:"Tidak",
    tanggal:"07 Januari 2026"
  }
];

filteredData = [...tabelData];

/* =================================================
   FILTER TAMPILKAN
================================================= */

function tampilkanLaporan(){

  const bulan = document.getElementById("filterBulan").value;
  const tahun = document.getElementById("filterTahun").value;
  const ruangan = document.getElementById("filterRuangan").value;

  if(!bulan || !tahun || !ruangan){
    tampilkanAlert();
    return;
  }

  const bulanMap = {
    "01":"Januari","02":"Februari","03":"Maret","04":"April",
    "05":"Mei","06":"Juni","07":"Juli","08":"Agustus",
    "09":"September","10":"Oktober","11":"November","12":"Desember"
  };

  filteredData = tabelData.filter(r=>{
    return (
      r.ruangan.trim() === ruangan.trim() &&
      r.tanggal.includes(tahun) &&
      r.tanggal.includes(bulanMap[bulan])
    );
  });

  renderVirtual();
  updateFilterInfo();
}

function updateFilterInfo() {

  const bulanSelect = document.getElementById("filterBulan");
  const tahunSelect = document.getElementById("filterTahun");
  const ruanganSelect = document.getElementById("filterRuangan");

  // 🔒 Cegah error jika element tidak ditemukan
  if (!bulanSelect || !tahunSelect || !ruanganSelect) return;

  const bulanText = bulanSelect.value
    ? bulanSelect.options[bulanSelect.selectedIndex].text
    : "Semua Bulan";

  const tahunText = tahunSelect.value
    ? tahunSelect.options[tahunSelect.selectedIndex].text
    : "Semua Tahun";

  const ruanganText = ruanganSelect.value
    ? ruanganSelect.options[ruanganSelect.selectedIndex].text
    : "Semua Ruangan";

  // 🔒 Pastikan filteredData aman
  const dataAktif = typeof filteredData !== "undefined" ? filteredData : [];

  // =============================
  // UPDATE SUMMARY INFO
  // =============================
  const summaryBox = document.querySelector(".summary-info");

  if (summaryBox) {
    summaryBox.innerHTML = `
      <p><b>Bulan</b> : ${bulanText} ${tahunText}</p>
      <p><b>Ruangan</b> : ${ruanganText}</p>
      <p><b>Observasi</b> : ${dataAktif.length}</p>
    `;
  }

  // =============================
  // UPDATE CARD RUANGAN
  // =============================
  const cardRuanganTitle = document.querySelector(".summary-card.purple p b");
  const cardRuanganSmall = document.querySelector(".summary-card.purple small");

  if (cardRuanganTitle) {
    cardRuanganTitle.innerText = ruanganText;
  }

  if (cardRuanganSmall) {
    cardRuanganSmall.innerText = dataAktif.length + " Observasi";
  }

  // =============================
  // UPDATE JUMLAH PEGAWAI UNIK
  // =============================
  const namaRekanEl = document.getElementById("namaRekan");

  if (namaRekanEl) {
    const namaUnik = new Set(dataAktif.map(r => r.pegawai));
    namaRekanEl.innerText = namaUnik.size;
  }
}
/* =================================================
   RESET
================================================= */

function resetFilter(){

  const bulan = document.getElementById("filterBulan");
  const tahun = document.getElementById("filterTahun");
  const ruangan = document.getElementById("filterRuangan");
  const search = document.getElementById("searchRealtime");

  if(bulan) bulan.value="";
  if(tahun) tahun.value="";
  if(ruangan) ruangan.value="";
  if(search) search.value="";

  filteredData = [...tabelData];

  renderVirtual();
  updateFilterInfo();
}

/* =================================================
   SEARCH REALTIME
================================================= */

document.getElementById("searchRealtime")
.addEventListener("input",(e)=>{

  const val=e.target.value.toLowerCase();

  filteredData = tabelData.filter(r=>{
    return (
      r.auditor.toLowerCase().includes(val) ||
      r.pegawai.toLowerCase().includes(val) ||
      r.ruangan.toLowerCase().includes(val)
    );
  });

  renderVirtual();
  updateFilterInfo();
});

/* =================================================
   RENDER TABEL
================================================= */

function hitung(row){
  const keys=["haircap","faceshield","masker","gown","sarung","sepatu"];
  let num=0, den=0;
  keys.forEach(k=>{
    if(row[k]!=="Tidak Dinilai"){
      den++;
      if(row[k]==="Ya") num++;
    }
  });
  row.numerator=num;
  row.denumerator=den;
  row.persen=den?((num/den)*100).toFixed(2)+"%":"0%";
}

function getStatusClass(v){
  if(v==="Ya") return "status-ya";
  if(v==="Tidak") return "status-tidak";
  if(v==="Tidak Dinilai") return "status-tdk";
  return "";
}

function renderVirtual(){

  const body=document.getElementById("tabelBody");
  if(!body) return;

  body.innerHTML="";

  if(filteredData.length === 0){
    body.innerHTML = `
      <tr>
        <td colspan="15" style="text-align:center;padding:20px;opacity:.6;">
          Tidak ada data sesuai filter
        </td>
      </tr>
    `;
    syncCharts();
    updateSummary();
    return;
  }

  let html = "";

  filteredData.forEach(r=>{
    hitung(r);

    html+=`
      <tr>
        <td>${r.no}</td>
        <td>${r.auditor}</td>
        <td>${r.pegawai}</td>
        <td>${r.tindakan}</td>
        <td>${r.ruangan}</td>

        <td class="${getStatusClass(r.haircap)}">${r.haircap}</td>
        <td class="${getStatusClass(r.faceshield)}">${r.faceshield}</td>
        <td class="${getStatusClass(r.masker)}">${r.masker}</td>
        <td class="${getStatusClass(r.gown)}">${r.gown}</td>
        <td class="${getStatusClass(r.sarung)}">${r.sarung}</td>
        <td class="${getStatusClass(r.sepatu)}">${r.sepatu}</td>

        <td><strong>${r.numerator}</strong></td>
        <td><strong>${r.denumerator}</strong></td>
        <td><strong>${r.persen}</strong></td>
        <td>${r.tanggal}</td>
      </tr>
    `;
  });

  body.innerHTML = html;

  syncCharts();
  updateSummary();
}

renderVirtual();
updateFilterInfo();

/* ==========================================
   EDIT STATUS REALTIME + BOX LANGSUNG UPDATE
========================================== */
document.addEventListener("click",(e)=>{

  const cell = e.target.closest("td");
  if(!cell) return;

  const col = cell.cellIndex;

  // hanya kolom APD
  if(col < 5 || col > 10) return;

  const tr = cell.closest("tr");
  const no = parseInt(tr.children[0].innerText);

  // ambil dari tabelData utama (bukan filteredData)
  const row = tabelData.find(r => r.no === no);
  if(!row) return;

  const keys = [
    "haircap","faceshield","masker",
    "gown","sarung","sepatu"
  ];

  const key = keys[col-5];

  // ROTASI STATUS
  if(row[key] === "Ya") row[key] = "Tidak";
  else if(row[key] === "Tidak") row[key] = "Tidak Dinilai";
  else row[key] = "Ya";

  // highlight cell
cell.classList.add("cell-edited");
setTimeout(()=>{
  cell.classList.remove("cell-edited");
},800);

// 🔥 SYNC filteredData DENGAN tabelData
filteredData = [...tabelData];

// 🔥 RENDER ULANG SEMUA
renderVirtual();
syncCharts();
updateSummary();
});


/* =================================================
   SYNC CHART
================================================= */

function syncCharts(){

  if(!window.pieChart || !window.barChart || !window.donutChart) return;

  let ya=0,t=0,td=0;
  let arrYa=[0,0,0,0,0,0];
  let arrT=[0,0,0,0,0,0];
  let arrTD=[0,0,0,0,0,0];

  const keys=["haircap","faceshield","masker","gown","sarung","sepatu"];

  filteredData.forEach(r=>{
    keys.forEach((k,i)=>{
      if(r[k]==="Ya"){ ya++; arrYa[i]++; }
      else if(r[k]==="Tidak"){ t++; arrT[i]++; }
      else{ td++; arrTD[i]++; }
    });
  });

  window.pieChart.data.datasets[0].data=[ya,t,td];
  window.pieChart.update();

  window.barChart.data.datasets[0].data=arrYa;
  window.barChart.data.datasets[1].data=arrT;
  window.barChart.data.datasets[2].data=arrTD;
  window.barChart.update();

  window.donutChart.data.datasets[0].data=[ya,t+td];
  window.donutChart.update();
}

/* =================================================
   SUMMARY
================================================= */

function updateSummary(){

  let totalYa = 0;
  let totalTidak = 0;
  let totalTdk = 0;

  const keys = [
    "haircap","faceshield","masker",
    "gown","sarung","sepatu"
  ];

  filteredData.forEach(r=>{
    keys.forEach(k=>{
      if(r[k] === "Ya") totalYa++;
      else if(r[k] === "Tidak") totalTidak++;
      else totalTdk++;
    });
  });

  animateValue("totalTidak", totalYa);
  animateValue("totalTotalTidak", totalTidak);
  animateValue("tidakDinilai", totalTdk);

  [
  "totalTidak",
  "totalTotalTidak",
  "tidakDinilai",
  "rataKepatuhan"
].forEach(id => triggerBoxEffect(id));

  const totalDinilai = totalYa + totalTidak;

  const persen = totalDinilai
    ? ((totalYa / totalDinilai) * 100).toFixed(1)
    : 0;

  document.getElementById("rataKepatuhan").innerText = persen + "%";

  // ============================
  // 🔥 STATUS KEPATUHAN DINAMIS
  // ============================

  const badge = document.querySelector(".summary-card.mint .badge");
  const badgeOutline = document.querySelector(".summary-card.mint .badge-outline");

  if(persen >= 80){
  badge.innerText = "✔ Tercapai";
  badge.classList.remove("danger");
  badge.classList.add("success");
  badgeOutline.innerText = "Kepatuhan ≥ 80%";
}else{
  badge.innerText = "✖ Belum Tercapai";
  badge.classList.remove("success");
  badge.classList.add("danger");
  badgeOutline.innerText = "Kepatuhan < 80%";
}

  // ============================
  // 🔥 NAMA REKAN DILAPORKAN
  // ============================

  const namaUnik = new Set(filteredData.map(r=>r.pegawai));
  document.getElementById("namaRekan").innerText = namaUnik.size;

}

/* ==========================================
   ANIMATE NUMBER SMOOTH (UP & DOWN)
========================================== */
function animateValue(id, newValue){

  const el = document.getElementById(id);
  if(!el) return;

  const current = parseFloat(el.innerText) || 0;
  const target = parseFloat(newValue);

  const duration = 500;
  const startTime = performance.now();

  function update(currentTime){
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = current + (target - current) * progress;

    el.innerText = Math.round(value);

    if(progress < 1){
      requestAnimationFrame(update);
    }else{
      el.innerText = newValue;
    }
  }

  requestAnimationFrame(update);
}


function triggerBoxEffect(id){

  const el = document.getElementById(id);
  if(!el) return;

  // hapus class jika masih ada
  el.classList.remove("number-glow");

  // force reflow agar efek bisa muncul lagi
  void el.offsetWidth;

  // tambahkan efek glow
  el.classList.add("number-glow");

  // hapus setelah selesai
  setTimeout(()=>{
    el.classList.remove("number-glow");
  },600);
}

/* ==========================================
   BOX GLOW EFFECT
========================================== */
function triggerBoxGlow(id, type){

  const el = document.getElementById(id);
  if(!el) return;

  el.classList.remove("glow-up","glow-down");

  if(type === "up"){
    el.classList.add("glow-up");
  }else if(type === "down"){
    el.classList.add("glow-down");
  }

  setTimeout(()=>{
    el.classList.remove("glow-up","glow-down");
  },800);
}

/* =================================================
   EXPORT
================================================= */

function openExportConfirm(){
  document.getElementById("confirmExportTable").style.display="flex";
}

function closeExportConfirm(){
  document.getElementById("confirmExportTable").style.display="none";
}

function exportTableNow(){
  closeExportConfirm();
  if(typeof XLSX==="undefined") return;

  const ws=XLSX.utils.json_to_sheet(filteredData);
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"Laporan");
  XLSX.writeFile(wb,"Laporan_APD.xlsx");
}

/* =================================================
   ALERT
================================================= */

function tampilkanAlert(){
  document.getElementById("alertOverlay").style.display="flex";
}

function tutupAlert(){
  document.getElementById("alertOverlay").style.display="none";
}