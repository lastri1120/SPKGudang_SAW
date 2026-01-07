function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });

  document.getElementById(id).style.display = "block";

  if (id === "penjualan") loadPenjualan();
  if (id === "cabang") loadCabang();
  if (id === "kriteria") loadKriteria();
  if (id === "hasil") loadHasil();
}

// ================= FETCH DATA =================

function loadPenjualan() {
  fetch("http://localhost:3000/api/penjualan")
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById("penjualan-body");
      body.innerHTML = "";
      data.forEach((d, i) => {
        body.innerHTML += `
          <tr>
            <td>${i+1}</td>
            <td>${d.nama}</td>
            <td>${d.jumlah}</td>
          </tr>`;
      });
    });
}

function loadCabang() {
  fetch("http://localhost:3000/api/cabang")
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById("cabang-body");
      body.innerHTML = "";
      data.forEach((d, i) => {
        body.innerHTML += `
          <tr>
            <td>${i+1}</td>
            <td>${d.nama_cabang}</td>
            <td>${d.alamat}</td>
          </tr>`;
      });
    });
}

function loadKriteria() {
  fetch("http://localhost:3000/api/kriteria")
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById("kriteria-body");
      body.innerHTML = "";
      data.forEach(d => {
        body.innerHTML += `
          <tr>
            <td>${d.kode}</td>
            <td>${d.nama}</td>
            <td>${d.tipe}</td>
            <td>${d.bobot}</td>
          </tr>`;
      });
    });
}

function loadHasil() {
  fetch("http://localhost:3000/api/saw")
    .then(res => res.json())
    .then(data => {
      document.getElementById("hasil-body").innerHTML =
        `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    });
}
