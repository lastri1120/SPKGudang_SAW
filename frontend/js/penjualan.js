// frontend/public/js/penjualan.js
const API_PENJUALAN = "http://localhost:3000/api/penjualan";

/* LOAD DATA */
function loadPenjualan() {
  fetch(API_PENJUALAN)
    .then(res => res.json())
    .then(data => {
      console.log("DATA PENJUALAN:", data);
    });
}

/* SIMPAN DATA */
function simpanPenjualan() {
  const data = {
    cabang_id: document.getElementById("penjualan_cabang").value,
    produk: document.getElementById("penjualan_produk").value,
    jumlah: document.getElementById("penjualan_jumlah").value
  };

  fetch(API_PENJUALAN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    console.log("RESPON SERVER:", res);
    loadPenjualan();
  })
  .catch(err => console.error(err));
}

function loadPenjualan() {
  fetch(API_PENJUALAN)
    .then(res => res.json())
    .then(data => {
      let html = "";

      data.forEach((p, i) => {
        html += `
          <tr class="border-b">
            <td class="p-2 text-center">${i + 1}</td>
            <td class="p-2">${p.nama_cabang}</td>
            <td class="p-2">${p.produk}</td>
            <td class="p-2 text-center">${p.jumlah}</td>
            <td class="p-2 text-center space-x-1">
              <button onclick='editPenjualan(${JSON.stringify(p)})'
                class="bg-yellow-400 px-2 py-1 rounded">✏️</button>
              <button onclick="hapusPenjualan(${p.id})"
                class="bg-red-600 text-white px-2 py-1 rounded">🗑</button>
            </td>
          </tr>`;
      });

      document.getElementById("tblPenjualan").innerHTML = html;
    });
}

function loadPenjualan() {
  fetch(API_PENJUALAN)
    .then(res => res.json())
    .then(data => {
      let html = "";

      data.forEach((p, i) => {
        html += `
          <tr class="border-b">
            <td class="p-2 text-center">${i + 1}</td>
            <td class="p-2">${p.nama_cabang}</td>
            <td class="p-2">${p.produk}</td>
            <td class="p-2 text-center">${p.jumlah}</td>
            <td class="p-2 text-center space-x-1">
              <button onclick='editPenjualan(${JSON.stringify(p)})'
                class="bg-yellow-400 px-2 py-1 rounded">✏️</button>
              <button onclick="hapusPenjualan(${p.id})"
                class="bg-red-600 text-white px-2 py-1 rounded">🗑</button>
            </td>
          </tr>`;
      });

      document.getElementById("tblPenjualan").innerHTML = html;
    });
}

function simpanPenjualan() {
  const id = document.getElementById("penjualan_id").value;

  const data = {
    cabang_id: document.getElementById("penjualan_cabang").value,
    produk: document.getElementById("penjualan_produk").value,
    jumlah: document.getElementById("penjualan_jumlah").value
  };

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_PENJUALAN}/${id}` : API_PENJUALAN;

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    resetPenjualanForm();
    showPenjualanList();
    loadPenjualan();
  });
}

function hapusPenjualan(id) {
  if (!confirm("Yakin hapus data ini?")) return;

  fetch(`${API_PENJUALAN}/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(() => loadPenjualan());
}
