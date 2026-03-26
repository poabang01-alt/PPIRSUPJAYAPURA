// === STORAGE KEY KHUSUS APD ===
const STORAGE_APD = {
  PERIODE: "apd_dataPeriode",
  RUANGAN: "apd_dataRuangan"
};


/* =========================
   SIDEBAR
========================= */
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-sidebar');
const toggleIcon = document.querySelector('.toggle-sidebar i');


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

/* CLOSE DROPDOWN OUTSIDE */
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





document.querySelectorAll("input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", () => {
    if (cb.checked) {
      cb.parentElement.style.fontWeight = "600";
    } else {
      cb.parentElement.style.fontWeight = "normal";
    }
  });
});

window.onload = () => {
  const data = JSON.parse(localStorage.getItem("apdData"));
  if (!data) return;

  document.getElementById("periodeAwal").value = data.periodeAwal;
  document.getElementById("periodeAkhir").value = data.periodeAkhir;

  document.querySelectorAll("input[type='checkbox']").forEach((cb, i) => {
    cb.checked = data.checkbox[i];
    if (cb.checked) cb.parentElement.style.fontWeight = "600";
  });
};

function simpanData() {
  const periodeAwal = document.getElementById("periodeAwal").value;
  const periodeAkhir = document.getElementById("periodeAkhir").value;

  if (!periodeAwal || !periodeAkhir) {
    alert("⚠️ Periode harus dipilih!");
    return;
  }

  const checkbox = [];
  let adaTerpilih = false;

  document.querySelectorAll("input[type='checkbox']").forEach(cb => {
    checkbox.push(cb.checked);
    if (cb.checked) adaTerpilih = true;
  });

  if (!adaTerpilih) {
    alert("⚠️ Minimal pilih 1 ruangan!");
    return;
  }

  const data = {
    periodeAwal,
    periodeAkhir,
    checkbox
  };

  localStorage.setItem("apdData", JSON.stringify(data));
  alert("✅ Data berhasil disimpan");
}




const btnTambah = document.getElementById("btnTambah");
const btnAktifkan = document.getElementById("btnAktifkan");
const modalOverlay = document.getElementById("modalOverlay");
const modalWarning = document.getElementById("modalWarning");
const modalConfirm = document.getElementById("modalConfirm");

btnTambah.addEventListener("click", () => {
  const bulan = document.getElementById("bulan").value;
  const tahun = document.getElementById("tahun").value;
  const checked = document.querySelectorAll(
    ".checkbox-grid input[type='checkbox']:checked"
  );

  if (bulan === "" || tahun === "" || checked.length === 0) {
    showModal(modalWarning);
  } else {
    showModal(modalConfirm);
  }
});


btnAktifkan.addEventListener("click", () => {
  btnAktifkan.disabled = true;
  btnAktifkan.innerHTML = "Memproses...";

  simpanPeriode();

  setTimeout(() => {
    renderPeriodeSelect();

    document
      .querySelectorAll(".checkbox-grid input[type='checkbox']")
      .forEach(cb => cb.checked = false);

    closeModal();
    showToast("Periode berhasil diaktifkan / diaktifkan kembali ✅");

    btnAktifkan.disabled = false;
    btnAktifkan.innerHTML = "Ya Aktifkan";
  }, 500);
});



function showModal(modal) {
  modalOverlay.style.display = "block";
  modal.style.display = "block";
}

function closeModal() {
  const modals = document.querySelectorAll(".modal");

  modals.forEach(modal => {
    modal.classList.add("hide");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("hide");
    }, 200);
  });

  modalOverlay.style.display = "none";
}




function simpanPeriode() {
  const bulan = document.getElementById("bulan").value;
  const tahun = document.getElementById("tahun").value;

  const ruanganBaru = [];
  document
    .querySelectorAll(".checkbox-grid input[type='checkbox']:checked")
    .forEach(cb => {
      ruanganBaru.push(
        cb.parentElement.innerText.replace(/^\d+\.\s*/, "")
      );
    });

  if (!bulan || !tahun || ruanganBaru.length === 0) {
    alert("Data periode belum lengkap");
    return;
  }

  const key = `${tahun}-${bulan}`;
  let dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};


  if (!dataPeriode[key]) {
    dataPeriode[key] = [];
  }


  ruanganBaru.forEach(r => {
    const sudahAda = dataPeriode[key].some(d => d.ruangan === r);
    if (!sudahAda) {
      dataPeriode[key].push({
        ruangan: r,
        observer: "Musdalifa, S.Kep.,Ns",
        status: "Aktif",
        tanggal: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      });
    }
  });

  localStorage.setItem("dataPeriode", JSON.stringify(dataPeriode));
}


















function simpanPeriodeKeDataPeriode(bulan, tahun, ruanganBaru) {
  let dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};

  const key = `${tahun}-${bulan}`;


  if (!dataPeriode[key]) {
    dataPeriode[key] = [];
  }

  ruanganBaru.forEach(r => {

    const sudahAda = dataPeriode[key].some(
      d => d.ruangan === r
    );

    if (!sudahAda) {
      dataPeriode[key].push({
        ruangan: r,
        observer: "Musdalifa, S.Kep.,Ns",
        status: "Aktif",
        tanggal: new Date().toISOString().slice(0,19).replace("T"," ")
      });
    }
  });

  localStorage.setItem("dataPeriode", JSON.stringify(dataPeriode));
}



function showToast(message) {
  const toast = document.getElementById("toastSuccess");
  const msg = document.getElementById("toastMessage");

  msg.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.style.animation = "toastOut .3s ease forwards";
  }, 2500);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.style.animation = "";
  }, 2800);
}





const btnKelola = document.querySelector(".btn-primary i.fa-database")?.parentElement;
const modalRuangan = document.getElementById("modalRuangan");
const modalRuanganOverlay = document.getElementById("modalRuanganOverlay");
const ruanganList = document.getElementById("ruanganList");
const inputRuangan = document.getElementById("inputRuangan");

let dataRuangan = JSON.parse(localStorage.getItem("dataRuangan")) || [];


document.querySelector(".btn-primary").addEventListener("click", () => {
  modalRuangan.style.display = "block";
  modalRuanganOverlay.style.display = "block";
  renderRuangan();
});


function closeKelolaRuangan() {
  modalRuangan.style.display = "none";
  modalRuanganOverlay.style.display = "none";
}


function renderRuangan() {
  ruanganList.innerHTML = "";

  dataRuangan.forEach((r, i) => {
    ruanganList.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${r}</td>
        <td>
          <i class="fa-solid fa-pen aksi-btn edit" onclick="editRuangan(${i})"></i>
          <i class="fa-solid fa-trash aksi-btn delete" onclick="hapusRuangan(${i})"></i>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("dataRuangan", JSON.stringify(dataRuangan));
  renderCheckboxRuangan();
}


document.getElementById("btnTambahRuangan").addEventListener("click", () => {
  if (!inputRuangan.value.trim()) return;

  dataRuangan.push(inputRuangan.value.toUpperCase());
  inputRuangan.value = "";
  renderRuangan();
});


function editRuangan(index) {
  const baru = prompt("Edit Nama Ruangan", dataRuangan[index]);
  if (baru) {
    dataRuangan[index] = baru.toUpperCase();
    renderRuangan();
  }
}


function hapusRuangan(index) {
  if (confirm("Yakin ingin menghapus ruangan ini?")) {
    dataRuangan.splice(index, 1);
    renderRuangan();
  }
}


function renderCheckboxRuangan() {
  const grid = document.querySelector(".checkbox-grid");
  grid.innerHTML = "";

  dataRuangan.forEach((r, i) => {
    grid.innerHTML += `
      <label>
        <input type="checkbox">
        <i class="fa-solid fa-hospital"></i> ${i + 1}. ${r}
      </label>
    `;
  });
}


if (dataRuangan.length === 0) {
  dataRuangan = [
    "CATHLAB","CSSD","ENTOMOLOG","EPIDEMIOLOG","FARMASI","GIZI",
    "HAEMODIALISA","HCU","IBS","ICU/PICU","ICVU","IGD",
    "IPSRS","K3","KESLING","LAUNDRY/BINATU","NICU/PERINA",
    "OK CITO","PEMULASARAN JENAZAH","POLI ANAK","POLI BEDAH",
    "POLI DOTS","POLI GIGI","POLI JANTUNG","POLI MATA",
    "POLI OBGYN","POLI PENYAKIT DALAM","POLI SYARAF","POLI VCT",
    "RADIOLOGI","RANAP ANAK","RANAP DEWASA KRIS","RANAP OBGYN",
    "RANAP PIE","VVIP"
  ];
  renderRuangan();
}


document.getElementById("modalRuanganOverlay")
  .addEventListener("click", closeKelolaRuangan);








// JavasCript footer = = = = =

function tambahRuangan(namaRuangan) {
  let ruangan = JSON.parse(localStorage.getItem("ruanganList")) || [];

  if (ruangan.includes(namaRuangan)) {
    alert("Ruangan sudah ada");
    return;
  }

  ruangan.push(namaRuangan);
  localStorage.setItem("ruanganList", JSON.stringify(ruangan));

  sinkronKePeriode(namaRuangan);
}




const bulan = document.getElementById("bulan").value;
const tahun = document.getElementById("tahun").value;

localStorage.setItem("periodeAktif", JSON.stringify({
  month: bulan,
  year: tahun
}));



function renderTabelPeriode(key) {
  const container = document.getElementById("periodeContainer");
  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const data = dataPeriode[key] || [];

  if (data.length === 0) {
    container.innerHTML = "<p>Data tidak tersedia</p>";
    return;
  }

  const [year, month] = key.split("-");
  const namaBulan = new Date(year, month - 1)
    .toLocaleString("id-ID", { month: "long", year: "numeric" });

  let rows = "";
  data.forEach((d, i) => {
    rows += `
<tr>
  <td data-label="No">${i + 1}</td>
  <td data-label="Ruangan">${d.ruangan}</td>
  <td data-label="Observer">${d.observer}</td>
  <td data-label="Status">
    <span class="badge ${d.status === "Aktif" ? "aktif" : "selesai"}">
      ${d.status}
    </span>
  </td>
  <td data-label="Tanggal">${d.tanggal}</td>
  <td data-label="Aksi" class="aksi">
    <button
      class="btn-toggle ${d.status === "Aktif" ? "btn-danger" : "btn-success"}"
      data-key="${key}"
      data-index="${i}">
      <i class="fa-solid ${d.status === "Aktif" ? "fa-toggle-on" : "fa-toggle-off"}"></i>
      ${d.status === "Aktif" ? "Aktif" : "Nonaktif"}
    </button>
  </td>
</tr>
`;

  });

  container.innerHTML = `
    <div class="periode-box open">
      <!-- HEADER PERIODE -->
      <div class="periode-header">
        <h4>
          <i class="fa-solid fa-calendar-days"></i> ${namaBulan}
        </h4>

        <div class="periode-actions">
          <button class="btn-export-excel" data-key="${key}" title="Export Excel">
            <i class="fa-solid fa-file-excel"></i>
          </button>

          <button class="btn-export-pdf" data-key="${key}" title="Export PDF">
            <i class="fa-solid fa-file-pdf"></i>
          </button>

          <button class="btn-hapus-periode" data-key="${key}" title="Hapus Periode">
            <i class="fa-solid fa-trash"></i>
          </button>

          <button class="btn-close-periode" title="Tutup Periode">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- TABEL -->
      <div class="periode-table-wrapper">
  <table class="periode-table">
  </table>
  </div>
        <thead>
  <tr>
    <th>No</th>
    <th>Ruangan</th>
    <th>Observer</th>
    <th>Status</th>
    <th>Tanggal</th>
    <th>Aksi</th>
  </tr>
</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}








function renderPeriodeSelect() {
  const select = document.getElementById("periodeSelect");
  if (!select) return;

  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};


  select.innerHTML = `<option value="">Pilih Periode</option>`;
 
  const periodeSorted = Object.keys(dataPeriode)
    .map(key => {
      const [year, month] = key.split("-").map(Number);
      return {
        key,
        date: new Date(year, month - 1)
      };
    })
    .sort((a, b) => a.date - b.date); 



  // Render ke dropdown
  periodeSorted.forEach(p => {
    const [year, month] = p.key.split("-");
    const namaBulan = new Date(year, month - 1)
      .toLocaleString("id-ID", { month: "long" });

    const option = document.createElement("option");
    option.value = p.key;
    option.textContent = `${namaBulan} ${year}`;

    select.appendChild(option);
  });
}



window.addEventListener("load", () => {
  renderPeriodeSelect();
});






function toggleStatus(key, index) {
  let dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  if (!dataPeriode[key] || !dataPeriode[key][index]) return;

  const btn = document.querySelector(
    `.btn-toggle[data-key="${key}"][data-index="${index}"]`
  );

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Memproses`;
  }

  setTimeout(() => {
    dataPeriode[key][index].status =
      dataPeriode[key][index].status === "Aktif"
        ? "Nonaktif"
        : "Aktif";

    localStorage.setItem("dataPeriode", JSON.stringify(dataPeriode));
    renderPeriodeStyled(key);
    rekapPerRuangan();
  }, 500);
}







function softDelete(key, index) {
  let dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};

  if (!dataPeriode[key] || !dataPeriode[key][index]) return;

  dataPeriode[key][index].status = "Nonaktif";

  localStorage.setItem("dataPeriode", JSON.stringify(dataPeriode));

  renderTabelPeriode(key);
}






function rekapPerRuangan() {
  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const rekap = {};

  Object.values(dataPeriode).forEach(list => {
    list.forEach(d => {
      if (!rekap[d.ruangan]) {
        rekap[d.ruangan] = { aktif: 0, nonaktif: 0 };
      }

      if (d.status === "Aktif") rekap[d.ruangan].aktif++;
      if (d.status === "Nonaktif") rekap[d.ruangan].nonaktif++;
    });
  });

  console.clear();
  console.table(rekap);
}




function renderPeriodeDropdown() {
  console.log("🔄 renderPeriodeDropdown dipanggil");

  const select = document.getElementById("periodeSelect");
  console.log("🎯 select:", select);

  if (!select) return;

  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  console.log("📦 dataPeriode:", dataPeriode);

  select.innerHTML = `<option value="">Pilih Periode</option>`;

  Object.keys(dataPeriode).sort().forEach(periode => {
    const [year, month] = periode.split("-");
    const namaBulan = new Date(year, month - 1)
      .toLocaleString("id-ID", { month: "long" });

    const option = document.createElement("option");
    option.value = periode;
    option.textContent = `${namaBulan} ${year}`;

    select.appendChild(option);
  });
}





renderPeriodeDropdown();






function exportExcelLangsung(key) {
  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const data = dataPeriode[key];

  if (!data || data.length === 0) {
    alert("Data kosong, tidak bisa export");
    return;
  }

  let table = `
    <table border="1">
      <tr>
        <th>No</th>
        <th>Ruangan</th>
        <th>Observer</th>
        <th>Status</th>
        <th>Tanggal</th>
      </tr>
  `;

  data.forEach((d, i) => {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.ruangan}</td>
        <td>${d.observer}</td>
        <td>${d.status}</td>
        <td>${d.tanggal}</td>
      </tr>
    `;
  });

  table += `</table>`;

  const blob = new Blob(
    [`\ufeff<html><head><meta charset="UTF-8"></head><body>${table}</body></html>`],
    { type: "application/vnd.ms-excel;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Periode-${key}.xls`;
  a.click();

  URL.revokeObjectURL(url);
}




function exportPdfLangsung(key) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const data = dataPeriode[key] || [];

  if (data.length === 0) {
    alert("Data kosong");
    return;
  }

  doc.text(`Data Periode ${key}`, 14, 15);

  let y = 25;
  data.forEach((d, i) => {
    doc.text(
      `${i+1}. ${d.ruangan} | ${d.observer} | ${d.status} | ${d.tanggal}`,
      14,
      y
    );
    y += 8;
  });

  doc.save(`Periode-${key}.pdf`);
}







// Export Excel 
function exportExcelLangsung(key) {
  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const data = dataPeriode[key] || [];

  if (data.length === 0) {
    alert("Data kosong");
    return;
  }

  let csv = "No,Ruangan,Observer,Status,Tanggal\n";
  data.forEach((d, i) => {
    csv += `${i+1},"${d.ruangan}","${d.observer}",${d.status},${d.tanggal}\n`;
  });

  const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Periode-${key}.xls`;
  a.click();

  URL.revokeObjectURL(url);
}



// Export PDF 
function exportPdfLangsung(key) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const data = dataPeriode[key] || [];

  if (data.length === 0) {
    alert("Data kosong");
    return;
  }

  doc.text(`Data Periode ${key}`, 14, 15);

  let y = 25;
  data.forEach((d, i) => {
    doc.text(
      `${i+1}. ${d.ruangan} | ${d.observer} | ${d.status} | ${d.tanggal}`,
      14,
      y
    );
    y += 8;
  });

  doc.save(`Periode-${key}.pdf`);
}





function renderPeriodeStyled(key) {
  const dataPeriode = JSON.parse(localStorage.getItem("dataPeriode")) || {};
  const data = dataPeriode[key];
  if (!data) return;

  const [year, month] = key.split("-");
  const namaBulan = new Date(year, month - 1)
    .toLocaleString("id-ID", { month: "long", year: "numeric" });

  const container = document.getElementById("periodeContainer");
  container.innerHTML = "";

  // === BUAT BOX ===
  const box = document.createElement("div");
  box.classList.add("periode-box"); 

  // === HEADER ===
  const header = document.createElement("div");
  header.classList.add("periode-header");

  const title = document.createElement("div");
  title.classList.add("periode-title");
  title.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${namaBulan}`;

  const actions = document.createElement("div");
  actions.classList.add("action-bar");

  actions.innerHTML = `
  <button class="action-btn btn-export-excel" data-key="${key}">
    <i class="fa-solid fa-file-excel"></i>
  </button>

  <button class="action-btn btn-export-pdf" data-key="${key}">
    <i class="fa-solid fa-file-pdf"></i>
  </button>

  <button class="action-btn btn-hapus-periode" data-key="${key}">
    <i class="fa-solid fa-trash"></i>
  </button>

  <button class="action-btn btn-close-periode">
    <i class="fa-solid fa-xmark"></i>
  </button>
`;


  header.append(title, actions);

  const table = document.createElement("table");
  table.classList.add("periode-table");

  table.innerHTML = `
  <thead>
    <tr>
      <th>No</th>
      <th>Ruangan</th>
      <th>Observer</th>
      <th>Status</th>
      <th>Tanggal</th>
      <th>Aksi</th>
    </tr>
  </thead>
  <tbody>
    ${data.map((d,i)=>`
      <tr>
        <td>${i+1}</td>
        <td>${d.ruangan}</td>
        <td>${d.observer}</td>
        <td>
          <span class="badge ${d.status === "Aktif" ? "aktif" : "selesai"}">
            ${d.status}
          </span>
        </td>
        <td>${d.tanggal}</td>
        <td>
          <button
            class="btn-toggle ${d.status === "Aktif" ? "btn-danger" : "btn-success"}"
            data-key="${key}"
            data-index="${i}"
            title="${d.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}"
          >
            ${d.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
          </button>
        </td>
      </tr>
    `).join("")}
  </tbody>
`;


  box.append(header, table);
  container.appendChild(box);
}


document.getElementById("btnShowData").addEventListener("click", () => {
  const key = periodeSelect.value;
  if (!key) {
    showAlert({
      title: "Periode belum dipilih",
      message: "Silakan pilih periode terlebih dahulu",
      type: "danger"
    });
    return;
  }

  showAlert({
    title: "Tampilkan Data",
    message: "Tampilkan data periode ini?",
    onConfirm: () => {
      renderPeriodeStyled(key);
    }
  });
});





document.addEventListener("click", function (e) {

  const btnToggle = e.target.closest(".btn-toggle");
  if (btnToggle) {
    toggleStatus(btnToggle.dataset.key, btnToggle.dataset.index);
    return;
  }


  const btnExcel = e.target.closest(".btn-export-excel");
  if (btnExcel) {
    exportExcelLangsung(btnExcel.dataset.key);
    return;
  }


  const btnPdf = e.target.closest(".btn-export-pdf");
  if (btnPdf) {
    exportPdfLangsung(btnPdf.dataset.key);
    return;
  }

 
  const btnHapus = e.target.closest(".btn-hapus-periode");
  if (btnHapus) {
    const key = btnHapus.dataset.key;

    showAlert({
      title: "Hapus Periode",
      message: "Data periode ini akan dihapus permanen.",
      type: "danger",
      autoFocus: "cancel",
      onConfirm: () => {
        let data = JSON.parse(localStorage.getItem("dataPeriode")) || {};
        delete data[key];
        localStorage.setItem("dataPeriode", JSON.stringify(data));

        document.getElementById("periodeContainer").innerHTML = "";
        renderPeriodeSelect();
        showToast("Periode berhasil dihapus 🗑️");
      }
    });
    return;
  }

 
  const btnClose = e.target.closest(".btn-close-periode");
  if (btnClose) {
    const box = btnClose.closest(".periode-box");
    box.classList.add("hide");
    setTimeout(() => box.remove(), 250);
  }

});


















let confirmAction = null;

function showAlert({
  title,
  message,
  type = "question",
  onConfirm = null,
  autoFocus = "confirm" 
}) {
  const overlay = document.getElementById("alertOverlay");
  const modal = document.getElementById("alertModal");
  const icon = document.getElementById("alertIcon");
  const titleEl = document.getElementById("alertTitle");
  const msgEl = document.getElementById("alertMessage");
  const btnYes = document.getElementById("alertConfirm");
  const btnCancel = document.getElementById("alertCancel");

  confirmAction = onConfirm;

  titleEl.textContent = title;
  msgEl.textContent = message;

  icon.innerHTML =
    type === "danger"
      ? `<i class="fa-solid fa-triangle-exclamation"></i>`
      : `<i class="fa-solid fa-circle-question"></i>`;

  icon.style.color = type === "danger" ? "#e03131" : "#fab005";

  overlay.style.display = "block";
  modal.style.display = "block";


  if (type === "danger") {
    modal.classList.add("shake");
    setTimeout(() => modal.classList.remove("shake"), 400);
  }

  setTimeout(() => {
    autoFocus === "cancel" ? btnCancel.focus() : btnYes.focus();
  }, 50);
}

function closeAlert() {
  document.getElementById("alertOverlay").style.display = "none";
  document.getElementById("alertModal").style.display = "none";
  confirmAction = null;
}

document.getElementById("alertCancel").onclick = closeAlert;

document.getElementById("alertConfirm").onclick = function () {
  const btn = this;
  btn.classList.add("btn-loading");
  btn.innerHTML = `<i class="fa-solid fa-spinner"></i> Memproses`;

  setTimeout(() => {
    if (confirmAction) confirmAction();
    btn.classList.remove("btn-loading");
    btn.innerHTML = "Ya, Lanjutkan";
    closeAlert();
  }, 500);
}



























/* =========================
   SIDEBAR FINAL (FIX TOTAL)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-sidebar");
  const icon = toggleBtn?.querySelector("i");

  if (!sidebar || !toggleBtn || !icon) return;

  /* =========================
     DEFAULT STATE
  ========================= */
  if (window.innerWidth > 1024) {
    body.classList.add("sidebar-open"); // desktop open
    icon.className = "fa-solid fa-xmark";
  } else {
    body.classList.remove("sidebar-open"); // mobile close
    icon.className = "fa-solid fa-bars";
  }

  /* =========================
     TOGGLE ☰ / ❌
  ========================= */
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("sidebar-open");

    icon.className = body.classList.contains("sidebar-open")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });

  /* =========================
     AUTO CLOSE SUBMENU (MOBILE)
  ========================= */
  sidebar.addEventListener("click", (e) => {
    const submenuLink = e.target.closest(".submenu a");
    if (!submenuLink) return;

    if (window.innerWidth <= 1024) {
      body.classList.remove("sidebar-open");
      icon.className = "fa-solid fa-bars";
    }
  });

  /* =========================
     RESIZE FIX
  ========================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      body.classList.add("sidebar-open");
      icon.className = "fa-solid fa-xmark";
    } else {
      body.classList.remove("sidebar-open");
      icon.className = "fa-solid fa-bars";
    }
  });
});

