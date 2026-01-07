const apiBase = "http://localhost:3000/api";

async function tambahData() {
  const nama_cabang = document.getElementById("nama_cabang").value;
  const penjualan = document.getElementById("penjualan").value;
  const jenis_produk = document.getElementById("jenis_produk").value;
  const tipe_produk = document.getElementById("tipe_produk").value;
  const lokasi_cabang = document.getElementById("lokasi_cabang").value;

  const response = await fetch(`${apiBase}/alternatif`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama_cabang, penjualan, jenis_produk, tipe_produk, lokasi_cabang })
  });

  const result = await response.json();
  alert(result.message); // tampilkan notifikasi
  getData(); // refresh data di tabel bawah
}

async function getData() {
  const response = await fetch(`${apiBase}/alternatif`);
  const data = await response.json();

  const tbody = document.getElementById("data_tabel");
  tbody.innerHTML = "";

  data.forEach((row, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${row.nama_cabang}</td>
        <td>${row.penjualan}</td>
        <td>${row.jenis_produk}</td>
        <td>${row.tipe_produk}</td>
        <td>${row.lokasi_cabang}</td>
      </tr>
    `;
  });
}

data.forEach((row, index) => {
  tbody.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${row.kode_cabang}</td>
      <td>${row.nama_cabang}</td>
      <td>${row.alamat}</td>
      <td>
        <button onclick="hapusCabang(${row.id})"
          class="bg-red-500 text-white px-2 py-1 rounded">
          🗑
        </button>
      </td>
    </tr>
  `;
});
