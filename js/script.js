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
<td>${j.lokasi}</td>
<td>${j.level}</td>
<td>${j.jumlah}</td>
</tr>
`

})


/* =========================
   SELEKSI ADMINISTRATIF
========================= */

const mandatory = data.seleksi_administratif.mandatory

if (mandatory.length > 0) {
// baris pertama (pakai rowspan)
  adminTable.innerHTML += `
  <tr>
    <td>${mandatory[0].aspek}</td>
    <td>${mandatory[0].rincian}</td>
    <td><span class="badge mandatory">${mandatory[0].metode}</span></td>
    <td rowspan="${mandatory.length}">
      ${mandatory[0].output}
    </td>
  </tr>
  `

  // baris sisanya (tanpa output)
  for (let i = 1; i < mandatory.length; i++) {
    adminTable.innerHTML += `
    <tr>
      <td>${mandatory[i].aspek}</td>
      <td>${mandatory[i].rincian}</td>
      <td><span class="badge mandatory">${mandatory[i].metode}</span></td>
    </tr>
    `
  }

}


/* ===============================
   SELEKSI ADMINISTRATIF LANJUTAN
==================================*/

const ranking = data.seleksi_administratif.ranking

if (ranking.length > 0) {
// baris pertama (pakai rowspan)
  adminTable2.innerHTML += `
  <tr>
    <td>${ranking[0].aspek}</td>
    <td>${ranking[0].rincian}</td>
    <td><span class="badge ranking">${ranking[0].metode}</span></td>
    <td rowspan="${ranking.length}">
      ${ranking[0].output}
    </td>
  </tr>
  `

  // baris sisanya (tanpa output)
  for (let i = 1; i < ranking.length; i++) {
    adminTable2.innerHTML += `
    <tr>
      <td>${ranking[i].aspek}</td>
      <td>${ranking[i].rincian}</td>
      <td><span class="badge ranking">${ranking[i].metode}</span></td>
    </tr>
    `
  }

}


/* =========================
   TAHAP WAWANCARA
========================= */

const wawancara = document.getElementById("wawancara")

const dataWawancara = data.tahap_wawancara

if (dataWawancara.length > 0) {

  // baris pertama (pakai rowspan)
  let w = dataWawancara[0]

  let badgeClass = ""
  if (w.metode === "Mandatory") {
    badgeClass = "mandatory"
  } else if (w.metode === "Ranking") {
    badgeClass = "ranking"
  } else {
    badgeClass = "default"
  }

  wawancara.innerHTML += `
  <tr>
    <td>${w.aspek}</td>
    <td>${w.rincian}</td>
    <td><span class="badge ${badgeClass}">${w.metode}</span></td>
    <td rowspan="${dataWawancara.length}">
      ${w.output}
    </td>
  </tr>
  `

  // baris berikutnya (tanpa kolom output)
  for (let i = 1; i < dataWawancara.length; i++) {

    let item = dataWawancara[i]

    let badgeClass = ""
    if (item.metode === "Mandatory") {
      badgeClass = "mandatory"
    } else if (item.metode === "Ranking") {
      badgeClass = "ranking"
    } else {
      badgeClass = "default"
    }

    wawancara.innerHTML += `
    <tr>
      <td>${item.aspek}</td>
      <td>${item.rincian}</td>
      <td><span class="badge ${badgeClass}">${item.metode}</span></td>
    </tr>
    `
  }

}


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


/* =========================
   PENDAFTARAN
========================= */
const pendaftaranContainer = document.getElementById("pendaftaran")

data.pendaftaran.forEach(w => {

pendaftaranContainer.innerHTML += `

<div class="card">

<h3>${w.aspek}</h3>

<a href="https://e-chain.airnavindonesia.co.id/jobtender/usulan" target="_blank">
https://e-chain.airnavindonesia.co.id/jobtender/usulan
</a>

</div>

`

})

}

loadTender()
