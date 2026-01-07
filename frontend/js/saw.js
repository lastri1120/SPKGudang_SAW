const API_SAW = "http://localhost:3000/api/saw";

function loadHasilSAW() {
  fetch(API_SAW)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("tblHasilSAW");
      table.innerHTML = "";

      if (data.length === 0) {
        table.innerHTML = `<tr><td colspan="3" class="text-center p-4">Belum dihitung</td></tr>`;
        return;
      }

      data.forEach(r => {
        table.innerHTML += `
          <tr class="border-b">
            <td class="p-2 text-center">${r.ranking}</td>
            <td class="p-2">${r.cabang}</td>
            <td class="p-2 text-center font-bold">${r.nilai}</td>
          </tr>`;
      });
    })
    .catch(err => console.error(err));
}
loadHasilSAW();