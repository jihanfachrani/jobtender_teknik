async function loadTender(){

const response = await fetch("data/tender.json")
const data = await response.json()

/* =========================
   INFORMASI TENDER
========================= */

document.getElementById("judulTender").innerText = data.informasi_tender.judul
document.getElementById("periodeTender").innerText = data.informasi_tender.periode


/* =========================
   TAMPILKAN JABATAN
========================= */

const jabatanTable = document.getElementById("jabatanTable")

data.jabatan.forEach(j => {

jabatanTable.innerHTML += `

<tr>
<td>${j.jabatan}</td>
<td>${j.level}</td>
</tr>

`
//<td>${j.lokasi}</td> (untuk manggil lokasi)

})


/* =========================
   SELEKSI ADMINISTRATIF
========================= */
const adminTable = document.getElementById("adminTable")

// Mandatory
data.seleksi_administratif.mandatory.forEach(m => {

adminTable.innerHTML += `

<tr>
<td>${m.aspek}</td>
<td>${m.rincian}</td>
<td><span class="badge mandatory">${m.metode}</span></td>
</tr>

`

})

// Ranking (3 aspek) dengan merge kolom metode + badge
const ranking = data.seleksi_administratif.ranking;
if (ranking.length > 0) {
  adminTable.innerHTML += `
    <tr>
      <td>${ranking[0].aspek}</td>
      <td>${ranking[0].rincian}</td>
      <td rowspan="${ranking.length}">
        <span class="badge ranking">Ranking</span>
      </td>
    </tr>
  `;
  for (let i = 1; i < ranking.length; i++) {
    adminTable.innerHTML += `
      <tr>
        <td>${ranking[i].aspek}</td>
        <td>${ranking[i].rincian}</td>
      </tr>
    `;
  }
}


/* =========================
   TAHAP WAWANCARA
========================= */

const wawancaraContainer = document.getElementById("wawancara")

data.tahap_wawancara.forEach(w => {

wawancaraContainer.innerHTML += `

<div class="card">

<h3>${w.aspek}</h3>

<p>${w.rincian}</p>

</div>

`

})


/* =========================
   JADWAL
========================= */

const jadwalTable = document.getElementById("jadwalTable")

data.jadwal.forEach(j => {

jadwalTable.innerHTML += `

<tr>

<td>${j.tahap}</td>
<td>${j.tanggal}</td>
<td>${j.ket}</td>

</tr>


`

})

}

loadTender()


