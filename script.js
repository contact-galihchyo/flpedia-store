const darkModeBtn = document.getElementById('darkModeBtn')

/* ENABLE DARK MODE */

function enableDarkMode(){

  document.body.classList.add('dark-mode')

  darkModeBtn.innerText = '☀ Light Mode'

}

/* DISABLE DARK MODE */

function disableDarkMode(){

  document.body.classList.remove('dark-mode')

  darkModeBtn.innerText = '🌙 Dark Mode'

}

/* DEFAULT MODE = LIGHT */

disableDarkMode()

/* BUTTON TOGGLE */

darkModeBtn.addEventListener('click', () => {

  if(document.body.classList.contains('dark-mode')){

    disableDarkMode()

  }

  else{

    enableDarkMode()

  }

}) 

/* FLASH SALE SYSTEM FULL */

const flashSale =
document.querySelector('.flash-sale')

const flashBar =
document.querySelector('.flash-bar')

function updateFlashSale(){

  const now = new Date()

  const day = now.getDay()

  // 0 = Minggu ... 5 = Jumat ... 6 = Sabtu

  if(day === 5){

    flashSale.style.display = 'block'

    /* START = Jumat 00:00 */
    const start = new Date()
    start.setHours(0,0,0,0)

    /* END = Sabtu 00:00 */
    const end = new Date()
    end.setDate(start.getDate() + 1)
    end.setHours(0,0,0,0)

    const diff = end - now

    /* =========================
       ⏰ COUNTDOWN TIMER
       ========================= */

    const hours =
    Math.floor(diff / 1000 / 60 / 60)

    const minutes =
    Math.floor((diff / 1000 / 60) % 60)

    const seconds =
    Math.floor((diff / 1000) % 60)

    document.getElementById('hours').innerText =
    String(hours).padStart(2,'0')

    document.getElementById('minutes').innerText =
    String(minutes).padStart(2,'0')

    document.getElementById('seconds').innerText =
    String(seconds).padStart(2,'0')

    /* =========================
       🔥 PROGRESS BAR (SISA WAKTU)
       ========================= */

    const total = end - start

    const percent = (diff / total) * 100

    flashBar.style.width = percent + '%'

  }

  else{

    flashSale.style.display = 'none'

  }

}

setInterval(updateFlashSale,1000)

updateFlashSale()

/* SEARCH FITUURR */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

  let keyword = searchInput.value.toLowerCase();

  let products = document.querySelectorAll(".product-card");

  products.forEach(function(product){

    let title = product.querySelector("h3").textContent.toLowerCase();

    if(title.includes(keyword)){
      product.style.display = "block";
    }else{
      product.style.display = "none";
    }

  });

});

/* PREVIEW FITUR */

/* =========================
   PREVIEW PRODUCT DATA
========================= */

let currentPreviewProduct = null;

function openPreview(
  id,
  title,
  price,
  image,
  desc,
  audioSrc
){

  currentPreviewProduct = {

    id: id,
    name: title,
    price: Number(price),
    image: image

  };

  // OPEN MODAL
  document.getElementById("previewModal").style.display = "flex";

  // SET DATA
  document.getElementById("previewTitle").innerText = title;

  document.getElementById("previewPrice").innerText =
    "Rp " + Number(price).toLocaleString("id-ID");

  document.getElementById("previewImg").src = image;

  document.getElementById("previewDesc").innerText = desc;

  // AUDIO
  const player =
    document.getElementById("previewAudio");

  const source =
    document.getElementById("previewAudioSource");

  source.src = audioSrc;

  player.load();

}


/* =========================
   CLOSE PREVIEW
========================= */

function closePreview(){

  document.getElementById("previewModal").style.display =
    "none";

  audio.pause();

  audio.currentTime = 0;

  playBtn.innerHTML = "▶";

}


/* =========================
   AUDIO PLAYER
========================= */

const audio =
  document.getElementById("previewAudio");

const playBtn =
  document.getElementById("playBtn");

const progress =
  document.getElementById("audioProgress");

const currentTimeEl =
  document.getElementById("currentTime");

const durationEl =
  document.getElementById("duration");


/* =========================
   FORMAT TIME
========================= */

function formatTime(time){

  if(isNaN(time)) return "0:00";

  const minutes =
    Math.floor(time / 60);

  let seconds =
    Math.floor(time % 60);

  if(seconds < 10){
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;

}


/* =========================
   PLAY / PAUSE
========================= */

function toggleAudio(event){

  if(event){
    event.preventDefault();
  }

  if(audio.paused){

    audio.play();

    playBtn.innerHTML = "⏸";

  }else{

    audio.pause();

    playBtn.innerHTML = "▶";

  }

}


/* =========================
   UPDATE PROGRESS
========================= */

audio.addEventListener("timeupdate", ()=>{

  if(audio.duration){

    const percent =
      (audio.currentTime / audio.duration) * 100;

    progress.value = percent;

  }

  currentTimeEl.innerHTML =
    formatTime(audio.currentTime);

});


/* =========================
   LOAD DURATION
========================= */

audio.addEventListener("loadedmetadata", ()=>{

  durationEl.innerHTML =
    formatTime(audio.duration);

});


/* =========================
   SEEK BAR
========================= */

progress.addEventListener("input", ()=>{

  if(audio.duration){

    audio.currentTime =
      (progress.value / 100) * audio.duration;

  }

});


/* =========================
   BACKWARD
========================= */

function backAudio(){

  audio.currentTime -= 5;

}


/* =========================
   FORWARD
========================= */

function forwardAudio(){

  audio.currentTime += 5;

}


/* =========================
   AUTO RESET
========================= */

audio.addEventListener("ended", ()=>{

  playBtn.innerHTML = "▶";

  progress.value = 0;

});




/* =========================
   CART SIDEBAR
========================= */

function openCart(){

  document
    .getElementById("cartSidebar")
    .classList.add("active");

  document
    .getElementById("cartOverlay")
    .classList.add("active");

}

function closeCart(){

  document
    .getElementById("cartSidebar")
    .classList.remove("active");

  document
    .getElementById("cartOverlay")
    .classList.remove("active");

}

/* =========================
   CART SYSTEM
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ELEMENT
========================= */

const cartCount =
document.getElementById("cartCount");

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

/* =========================
   UPDATE BADGE
========================= */

function updateCartBadge(){

  if(cartCount){

    let totalQty = 0;

    cart.forEach(item => {

      totalQty += item.qty;

    });

    cartCount.innerText = totalQty;

  }

}

/* =========================
   RENDER CART
========================= */

function renderCart(){

  if(!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item,index)=>{

    if(item.selected){
      total += (item.price ?? 0) * item.qty;
    }

    cartItems.innerHTML += `
  <div class="cart-item">

    <label class="check-icon">
      <input
        type="checkbox"
        ${item.selected ? "checked" : ""}
        onchange="toggleSelect(${index})"
      >

      <span class="custom-check">
        <i class="fa-solid fa-check"></i>
      </span>
    </label>

    <img
      src="${item.image}"
      class="cart-item-img"
    >

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <p>
            Rp ${(item.price ?? 0).toLocaleString("id-ID")}
          </p>

          <div class="qty-box">

            <button onclick="decreaseQty(${index})">
              -
            </button>

            <span>${item.qty}</span>

            <button onclick="increaseQty(${index})">
              +
            </button>

          </div>

        </div>

      </div>

    `;

  });

  cartTotal.innerText =
  total.toLocaleString("id-ID");

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

/* =========================
   TOGGLE SELECT
========================= */

function toggleSelect(index){

  cart[index].selected = !cart[index].selected;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();
}

/* =========================
   SELECT ALL
========================= */

const selectAllCart =
document.getElementById("selectAllCart");

if(selectAllCart){

  selectAllCart.addEventListener("change", ()=>{

    cart.forEach(item=>{

      item.selected =
      selectAllCart.checked;

    });

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    renderCart();

  });

}

/* =========================
   DELETE SELECTED
========================= */

function deleteSelected(){

  cart =
  cart.filter(item => !item.selected);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartBadge();

  renderCart();

}

/* =========================
   CHECKOUT SELECTED
========================= */

function checkoutSelected(){

  const selectedItems =
  cart.filter(item => item.selected);

  if(selectedItems.length <= 0){

    alert("Pilih produk dulu");

    return;

  }

  const checkoutModal =
  document.getElementById("checkoutModal");

  const checkoutOrder =
  document.getElementById("checkoutOrder");

  const checkoutTotal =
  document.getElementById("checkoutTotal");

  checkoutOrder.innerHTML = "";

  let total = 0;

  selectedItems.forEach(item=>{

    total += item.price * item.qty;

    checkoutOrder.innerHTML += `

      <div class="checkout-item">

        <img src="${item.image}">

        <div class="checkout-info">

          <h4>${item.name}</h4>

          <p>
            Rp ${item.price.toLocaleString("id-ID")}
          </p>

          <span>
            Qty: ${item.qty}
          </span>

        </div>

      </div>

    `;

  });

  checkoutTotal.innerText =
  "Rp " + total.toLocaleString("id-ID");

  checkoutModal.style.display = "flex";

}

/* =========================
   INCREASE QTY
========================= */

function increaseQty(index){

  cart[index].qty += 1;

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartBadge();

  renderCart();

}

/* =========================
   DECREASE QTY
========================= */

function decreaseQty(index){

  cart[index].qty -= 1;

  if(cart[index].qty <= 0){

    cart.splice(index,1);

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartBadge();

  renderCart();

}

/* =========================
   START
========================= */

updateCartBadge();

renderCart();


/* =========================
   ADD CART FROM PREVIEW
========================= */

const previewAddCart =
document.getElementById("previewAddCart");

if(previewAddCart){

  previewAddCart.addEventListener("click", ()=>{

    if(!currentPreviewProduct) return;

    const existing =
    cart.find(item =>
      item.id === currentPreviewProduct.id
    );

    if(existing){

      existing.qty += 1;

    }

    else{

  cart.push({
  id: currentPreviewProduct.id,
  name: currentPreviewProduct.name,
  price: currentPreviewProduct.price,
  image: currentPreviewProduct.image,
  qty: 1,
  selected: true
});

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartBadge();

    renderCart();

    closePreview();

  });

}

/* =========================
   ADD CART BUTTON
========================= */

document
.querySelectorAll(".add-cart")
.forEach(button => {

  button.addEventListener("click", () => {

    const product = {
  id: String(button.dataset.id),
  name: button.dataset.name,
  price: Number(button.dataset.price),
  image: button.dataset.image,
  qty: 1,
  selected: true
};
    const existing =
    cart.find(item =>
      item.id === product.id
    );

    if(existing){

      existing.qty += 1;

    }

    else{

      product.qty = 1;
      product.selected = true;

      cart.push(product);

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartBadge();

    renderCart();

  });

});



let selectedPayment = "QRIS";


// DETECT PAYMENT
document.querySelectorAll('input[name="payment"]').forEach((radio) => {

  radio.addEventListener("change", function () {

    selectedPayment = this.value;

  });

});


// PROCESS PAYMENT
function processPayment() {

  document.getElementById("paymentPopup").style.display = "flex";

  const title = document.getElementById("paymentTitle");
  const info = document.getElementById("paymentInfo");
  const qrisBox = document.getElementById("qrisBox");
  const paymentAmount =
  document.getElementById("paymentAmount");

  // RESET
  info.innerHTML = "";
  qrisBox.style.display = "none";

  /* =========================
     HITUNG TOTAL
  ========================= */

  const selectedItems =
  cart.filter(item => item.selected);

  let total = 0;

  selectedItems.forEach(item => {

    total += item.price * item.qty;

  });

  // TAMPILKAN TOTAL
  paymentAmount.innerHTML =
  "Rp " + total.toLocaleString("id-ID");


  /* =========================
     QRIS
  ========================= */

  if (selectedPayment === "QRIS") {

    title.innerHTML = "Pembayaran QRIS";

    qrisBox.style.display = "block";

  }


  /* =========================
     DANA
  ========================= */

  else if (selectedPayment === "Dana") {

  title.innerHTML = "Pembayaran Dana";

  info.innerHTML = `
    <div style="margin-top:20px;text-align:center;">

      <p style="
        color:#64748b;
        margin-bottom:8px;
      ">
        Nomor Dana
      </p>

      <div style="
        display:flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        margin-top:10px;
      ">

        <h2 id="danaNumber" style="
          font-size:28px;
          color:#0ea5e9;
          font-weight:700;
          margin:0;
        ">
          082299495064
        </h2>

        <button
          onclick="copyDana()"
          style="
            border:none;
            background:#0ea5e9;
            color:white;
            padding:10px 14px;
            border-radius:12px;
            cursor:pointer;
            font-weight:600;
          "
        >
          Salin
        </button>

      </div>

      <button
  onclick="openDanaApp()"
  style="
    margin-top:20px;
    border:none;
    background:#16a34a;
    color:white;
    padding:12px 20px;
    border-radius:14px;
    cursor:pointer;
    font-weight:600;
    width:100%;
  "
>
  Buka Aplikasi Dana
</button>

    </div>
  `;

}


  /* =========================
     GOPAY
  ========================= */

 else if (selectedPayment === "Gopay") {

  title.innerHTML = "Pembayaran Gopay";

  info.innerHTML = `
    <div style="margin-top:20px;text-align:center;">

      <p style="
        color:#64748b;
        margin-bottom:8px;
      ">
        Nomor Gopay
      </p>

      <div style="
        display:flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        margin-top:10px;
      ">

        <h2 id="gopayNumber" style="
          font-size:28px;
          color:#0ea5e9;
          font-weight:700;
          margin:0;
        ">
          08123456789
        </h2>

        <button
          onclick="copyGopay()"
          style="
            border:none;
            background:#0ea5e9;
            color:white;
            padding:10px 14px;
            border-radius:12px;
            cursor:pointer;
            font-weight:600;
          "
        >
          Salin
        </button>

      </div>

    </div>
  `;

}


  /* =========================
     MANDIRI
  ========================= */

  else if (selectedPayment === "Bank Mandiri") {

    title.innerHTML =
    "Transfer Bank Mandiri";

    info.innerHTML = `
  <div style="margin-top:20px;text-align:center;">

    <p style="
      color:#64748b;
      margin-bottom:8px;
    ">
      No Rekening
    </p>

    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      gap:10px;
      margin-top:10px;
    ">

      <h2 id="rekeningNumber" style="
        font-size:28px;
        color:#0ea5e9;
        font-weight:700;
        margin:0;
      ">
        1360036738281
      </h2>

      <button
        onclick="copyRekening()"
        style="
          border:none;
          background:#0ea5e9;
          color:white;
          padding:10px 14px;
          border-radius:12px;
          cursor:pointer;
          font-weight:600;
        "
      >
        Salin
      </button>

    </div>

    <p style="
      margin-top:18px;
      color:#64748b;
    ">
      A/N CAHYO GALIH WISANG J
    </p>

  </div>
`;

  }

}


/* =========================
   CLOSE POPUP
========================= */

function closePaymentPopup() {

  document.getElementById("paymentPopup")
  .style.display = "none";

}


/* =========================
   CLOSE CHECKOUT
========================= */

function closeCheckout(){

  document.getElementById("checkoutModal")
  .style.display = "none";

}


/* =========================
   CONFIRM CHECKOUT
========================= */

function confirmCheckout(){

  const selectedItems =
  cart.filter(item => item.selected);

  if(selectedItems.length <= 0){
    return;
  }

  const paymentMethod =
  document.querySelector(
    'input[name="payment"]:checked'
  ).value;


  const now = new Date();

  const tanggal =
  now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const waktu =
  now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

  let message =
  `╔═══════『 FLPedia Checkout 』═══════╗%0A%0A`;

  message +=
  `📅 Tanggal : ${tanggal}%0A`;

  message +=
  `⏰ Waktu   : ${waktu}%0A%0A`;

  message +=
  `Halo Admin FLPedia 👋%0A`;

  message +=
  `Saya ingin melakukan checkout produk berikut:%0A%0A`;

  let total = 0;

  selectedItems.forEach((item,index)=>{

    const subtotal =
    item.price * item.qty;

    total += subtotal;

    message +=
    `━━━━━━━━━━━━━━━%0A` +
    `🛒 Produk ${index + 1}%0A` +
    `📦 Nama Produk : ${item.name}%0A` +
    `🧩 Quantity    : ${item.qty}%0A` +
    `💵 Harga       : Rp ${item.price.toLocaleString("id-ID")}%0A` +
    `🧾 Subtotal    : Rp ${subtotal.toLocaleString("id-ID")}%0A%0A`;

  });

  message +=
  `━━━━━━━━━━━━━━━%0A`;

  message +=
  `💳 Pembayaran : ${paymentMethod}%0A`;

  message +=
  `💰 Total Bayar: Rp ${total.toLocaleString("id-ID")}%0A%0A`;

  message +=
  `✅ Saya sudah melakukan pembayaran.%0A`;

  message +=
  `📸 Bukti transfer akan saya sertakan setelah pesan ini.%0A%0A`;

  message +=
  `Terima kasih 🙌%0A`;

  message +=
  `╚══════════════════════════════╝`;

  /* NOMOR WA */

  const phone = "6285117791278";

  const whatsappURL =
  `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappURL, "_blank");

}

function copyRekening(){

  const rekening =
  document.getElementById("rekeningNumber")
  .innerText;

  navigator.clipboard.writeText(rekening);

  alert("Nomor rekening berhasil disalin!");
}

function copyDana(){

  const dana =
  document.getElementById("danaNumber")
  .innerText;

  navigator.clipboard.writeText(dana);

  alert("Nomor Dana berhasil disalin!");

}

function openDanaApp(){

  // COBA BUKA APP DANA
  window.location.href = "dana://";

  // FALLBACK JIKA APP TIDAK TERPASANG
  setTimeout(() => {

    window.open(
  "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012012024091718302464",
  "_blank"
);

  }, 15);

}

function copyGopay(){

  const gopay =
  document.getElementById("gopayNumber")
  .innerText;

  navigator.clipboard.writeText(gopay);

  alert("Nomor Gopay berhasil disalin!");

}

const categoryFilter =
document.getElementById("categoryFilter");

const priceFilter =
document.getElementById("priceFilter");

const sortFilter =
document.getElementById("sortFilter");

const container =
document.querySelector(".product-grid");

let products =
Array.from(document.querySelectorAll(".product-card"));

function filterProducts() {

  const category =
  categoryFilter.value;

  const price =
  priceFilter.value;

  const sort =
  sortFilter.value;

  let visibleProducts = [];

  products.forEach(product => {

    const productCategory =
    product.dataset.category;

    let show = false;

    // FILTER KATEGORI
    if (
      category === "all" ||
      category === productCategory
    ) {
      show = true;
    }

    if (show) {
      product.style.display = "block";
      visibleProducts.push(product);
    } else {
      product.style.display = "none";
    }

  });

  // SORT HARGA
  if (price === "low") {

    visibleProducts.sort((a,b)=>
      Number(a.dataset.price) -
      Number(b.dataset.price)
    );

  }

  if (price === "high") {

    visibleProducts.sort((a,b)=>
      Number(b.dataset.price) -
      Number(a.dataset.price)
    );

  }

  // SORT TRENDING
  if (sort === "trending") {

    visibleProducts.sort((a,b)=>
      Number(b.dataset.trending) -
      Number(a.dataset.trending)
    );

  }

  // SORT RATING
  if (sort === "rating") {

    visibleProducts.sort((a,b)=>
      Number(b.dataset.rating) -
      Number(a.dataset.rating)
    );

  }

  // UPDATE POSISI TANPA RESET HTML
  visibleProducts.forEach(product => {
    container.appendChild(product);
  });

}

categoryFilter.addEventListener(
  "change",
  filterProducts
);

priceFilter.addEventListener(
  "change",
  filterProducts
);

sortFilter.addEventListener(
  "change",
  filterProducts
);

// AUTO RUN
filterProducts();

// list data audio

const audioThailand =
"https://www.image2url.com/r2/default/audio/1779268195257-2a5b2782-d034-42ac-b033-e36974a7e2ca.mp3";

const audioReggae =
"https://sure-emerald-hvs5v2or6l.edgeone.app/STYLE%20REGGAE%20-%20YOGI%20SJ%20RMX.mp3";