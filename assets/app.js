const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const footerInput = document.getElementById("footer");
const preview = document.getElementById("preview");

function updatePreview() {
  const title = titleInput.value.trim();
  const msg = messageInput.value.trim();
  const footer = footerInput.value.trim();

  let text = "";
  if (title) text += title + "\n\n";
  if (msg) text += msg + "\n\n";
  if (footer) text += "— " + footer;

  preview.textContent = text || "Başlık\n\nMesaj içeriği burada görünecek.\n\n— Footer";
}

titleInput.oninput = updatePreview;
messageInput.oninput = updatePreview;
footerInput.oninput = updatePreview;

function copyText() {
  navigator.clipboard.writeText(preview.textContent);
  alert("Metin kopyalandı ✔");
}

function clearAll() {
  titleInput.value = "";
  messageInput.value = "";
  footerInput.value = "";
  updatePreview();
}

function template(type) {
  const date = new Date().toLocaleString("tr-TR");

  if (type === "duyuru") {
    titleInput.value = "📢 DUYURU";
    messageInput.value = "Sunucumuzla ilgili önemli bir bilgilendirme vardır.";
    footerInput.value = "BRDN • " + date;
  }

  if (type === "cekilis") {
    titleInput.value = "🎁 ÇEKİLİŞ";
    messageInput.value = "Çekilişimiz başlamıştır!\nKatılmak için kuralları yerine getirin.";
    footerInput.value = "Bol şans! • " + date;
  }

  if (type === "partner") {
    titleInput.value = "🤝 PARTNERLİK";
    messageInput.value = "Partner sunucu alımları açıktır.\nDM veya ticket açabilirsiniz.";
    footerInput.value = "BRDN Partner • " + date;
  }

  if (type === "bakim") {
    titleInput.value = "🛠️ BAKIM";
    messageInput.value = "Sunucumuz kısa süreli bakıma alınacaktır.";
    footerInput.value = date;
  }

  updatePreview();
}

const templates = {
  duyuru: `📢 ÖNEMLİ DUYURU

Değerli üyelerimiz,

Sunucumuzla ilgili önemli bir bilgilendirme yapılmıştır.
Lütfen aşağıdaki açıklamayı dikkatlice okuyunuz.

• Kurallara uyum zorunludur
• Aksi durumlarda işlem uygulanacaktır

Anlayışınız için teşekkür ederiz.

— Sunucu Yönetimi`,

  cekilis: `🎁 ÇEKİLİŞ BAŞLADI

Herkese merhaba,

Sunucumuz adına özel olarak düzenlenen çekilişimiz aktif hale gelmiştir.

📌 Katılım Şartları:
• Sunucuda aktif olmak
• Kurallara uymak
• Gerekli kanalları takip etmek

Bol şans dileriz 🍀

— Yetkili Ekibi`,

  partner: `🤝 PARTNERLİK BAŞVURULARI

Partner sunucu alımlarımız açılmıştır.

📌 Şartlar:
• Aktif ve düzenli sunucu
• Karşılıklı reklam
• Kurallara uygunluk

Başvurular ticket üzerinden alınmaktadır.

— Partner Sorumluları`,

  bakim: `🛠️ BAKIM BİLGİLENDİRMESİ

Sunucumuz kısa süreli bakım sürecine alınacaktır.

Bu süreçte bazı sistemler geçici olarak kapalı olabilir.

Bilginize sunarız.

— Teknik Ekip`,

  uyari: `⚠️ ÖNEMLİ UYARI

Sunucu kurallarına uymayan kullanıcılar hakkında işlem yapılacaktır.

Tekrar eden ihlallerde kalıcı yaptırımlar uygulanabilir.

— Yönetim Ekibi`
};

document.getElementById("templateSelect").addEventListener("change", e => {
  const mesaj = document.getElementById("message");
  mesaj.value = templates[e.target.value] || "";
  updatePreview();
});
