const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const footerInput = document.getElementById("footer");
const preview = document.getElementById("preview");

function updatePreview() {
  let text = "";

  if (titleInput.value.trim()) {
    text += titleInput.value.trim() + "\n\n";
  }

  if (messageInput.value.trim()) {
    text += messageInput.value.trim() + "\n\n";
  }

  if (footerInput.value.trim()) {
    text += "— " + footerInput.value.trim();
  }

  preview.textContent = text || "Mesaj içeriği burada görünecek.";
}

titleInput.addEventListener("input", updatePreview);
messageInput.addEventListener("input", updatePreview);
footerInput.addEventListener("input", updatePreview);

function copyText() {
  navigator.clipboard.writeText(preview.textContent);
  alert("Metin kopyalandı, Discord'a yapıştırabilirsin.");
}

function clearAll() {
  titleInput.value = "";
  messageInput.value = "";
  footerInput.value = "";
  updatePreview();
}

function wrapText(symbol) {
  const start = messageInput.selectionStart;
  const end = messageInput.selectionEnd;

  const before = messageInput.value.substring(0, start);
  const selected = messageInput.value.substring(start, end);
  const after = messageInput.value.substring(end);

  messageInput.value = before + symbol + selected + symbol + after;
  messageInput.focus();

  updatePreview();
}
function applyTemplate() {
  const t = document.getElementById("template").value;

  if (t === "duyuru") {
    titleInput.value = "📢 DUYURU";
    messageInput.value =
`Değerli üyelerimiz,

Sunucumuzla ilgili önemli bir bilgilendirme yapılmıştır.
Lütfen mesajı dikkatlice okuyunuz.

İyi eğlenceler dileriz.`;
    footerInput.value = "Sunucu Yönetimi";
  }

  if (t === "cekilis") {
    titleInput.value = "🎁 ÇEKİLİŞ BAŞLADI";
    messageInput.value =
`Herkese merhaba!

Sunucumuzda yeni bir çekiliş başlamıştır.
Katılım şartları aşağıda belirtilmiştir.

Bol şans! 🍀`;
    footerInput.value = "BRDN Ekibi";
  }

  if (t === "partner") {
    titleInput.value = "🤝 PARTNER DUYURUSU";
    messageInput.value =
`Yeni partnerimiz aramıza katıldı.

Karşılıklı destekle büyümeye devam ediyoruz.
Partnerimize hoş geldiniz diyelim!`;
    footerInput.value = "Partner Ekibi";
  }

  if (t === "bakim") {
    titleInput.value = "🛠️ BAKIM BİLDİRİMİ";
    messageInput.value =
`Sunucumuzda kısa süreli bakım çalışması yapılacaktır.

Bu süreçte bazı sistemler geçici olarak kapalı olabilir.
Anlayışınız için teşekkür ederiz.`;
    footerInput.value = "Teknik Ekip";
  }

  if (t === "etkinlik") {
    titleInput.value = "🎉 ETKİNLİK DUYURUSU";
    messageInput.value =
`Sunucumuzda yeni bir etkinlik başlıyor!

Katılım detayları aşağıda paylaşılmıştır.
Herkesi bekliyoruz!`;
    footerInput.value = "Etkinlik Ekibi";
  }

  updatePreview();
}
