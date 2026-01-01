// ===== Elementler =====
const templateSelect = document.getElementById("template");
const templateDesc = document.getElementById("templateDesc");

const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const footerInput = document.getElementById("footer");

const previewTitle = document.getElementById("previewTitle");
const previewMessage = document.getElementById("previewMessage");
const previewFooter = document.getElementById("previewFooter");

const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const toast = document.getElementById("toast");

// ===== Profesyonel Şablonlar =====
const TEMPLATES = {
  duyuru: {
    desc: "Genel bilgilendirme ve resmi duyurular için.",
    title: "📢 DUYURU",
    message:
`@everyone

Değerli üyelerimiz,

Sunucumuzla ilgili önemli bir bilgilendirme yapılmıştır.
Lütfen aşağıdaki metni dikkatlice okuyunuz.

• Güncelleme / Duyuru: …
• Etkilenen kanal / sistem: …
• Gerekli aksiyon: …

Anlayışınız için teşekkür ederiz.`,
    footer: "Sunucu Yönetimi"
  },

  cekilis: {
    desc: "Ödüllü çekilişler için hazır profesyonel metin.",
    title: "🎁 ÇEKİLİŞ BAŞLADI",
    message:
`🎉 ÇEKİLİŞ AKTİF!

🏆 Ödül: …
👥 Katılım: Bu mesaja tepki bırak / ilgili kanalı takip et
⏰ Bitiş: …

📌 Not: Çoklu hesap / spam kesinlikle yasaktır.

🍀 Herkese bol şans!`,
    footer: "Çekiliş Ekibi"
  },

  partner: {
    desc: "Partner tanıtımı ve karşılıklı destek duyuruları.",
    title: "🤝 PARTNER DUYURUSU",
    message:
`Yeni partner sunucumuzu duyurmaktan mutluluk duyuyoruz.

🔗 Sunucu: …
📌 Kategori / İçerik: …

Destek olmak için sunucularını ziyaret etmeyi unutmayın. 💙`,
    footer: "Partner Ekibi"
  },

  bakim: {
    desc: "Bakım ve güncelleme süreçleri için net bilgilendirme.",
    title: "🛠️ BAKIM / GÜNCELLEME",
    message:
`Sunucumuz kısa süreli bakım/güncelleme sürecine alınacaktır.

🕒 Başlangıç: …
🕒 Tahmini Bitiş: …

Bu süreçte bazı sistemler geçici olarak kapalı olabilir.
Bakım tamamlandığında bilgilendirme yapılacaktır.`,
    footer: "Teknik Ekip"
  },

  etkinlik: {
    desc: "Etkinlik duyuruları için düzenli format.",
    title: "🎉 ETKİNLİK DUYURUSU",
    message:
`Etkinliğimize herkesi bekliyoruz!

📅 Tarih: …
⏰ Saat: …
📍 Kanal: …

Katılım kuralları:
• …
• …

Herkese iyi eğlenceler!`,
    footer: "Etkinlik Ekibi"
  }
};

// ===== Önizleme =====
function updatePreview() {
  const t = titleInput.value.trim();
  const m = messageInput.value.trim();
  const f = footerInput.value.trim();

  previewTitle.textContent = t || "Başlık";
  previewMessage.textContent = m || "Mesaj içeriği burada görünecek.";
  previewFooter.textContent = f ? `— ${f}` : "Footer";
}

// input yazınca da anlık güncellesin
titleInput.addEventListener("input", updatePreview);
messageInput.addEventListener("input", updatePreview);
footerInput.addEventListener("input", updatePreview);

// ===== Toast bildirimi =====
function showToast(text) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1400);
}

// ===== Şablon uygula (HTML onchange bunu çağırıyor) =====
function applyTemplate() {
  const key = templateSelect.value;
  if (!key) {
    templateDesc.textContent = "Bir şablon seçtiğinizde mesaj otomatik hazırlanır.";
    return;
  }

  const t = TEMPLATES[key];
  titleInput.value = t.title;
  messageInput.value = t.message;
  footerInput.value = t.footer;
  templateDesc.textContent = t.desc;

  updatePreview();
  showToast("Şablon yüklendi ✅");
}

// global olsun diye window’a bağla (onclick/onchange için)
window.applyTemplate = applyTemplate;

// ===== Kopyala (düz metin) =====
async function copyText() {
  const title = titleInput.value.trim();
  const message = messageInput.value.trim();
  const footer = footerInput.value.trim();

  // Düz metin çıktısı (Discord uyumlu)
  let out = "";
  if (title) out += `${title}\n\n`;
  if (message) out += `${message}\n`;
  if (footer) out += `\n— ${footer}`;

  out = out.trim();
  if (!out) {
    showToast("Kopyalanacak içerik yok ❌");
    return;
  }

  try {
    await navigator.clipboard.writeText(out);

    // Buton animasyonu
    if (copyBtn) {
      copyBtn.classList.add("pulse");
      copyBtn.textContent = "✔ Kopyalandı";
      setTimeout(() => {
        copyBtn.classList.remove("pulse");
        copyBtn.textContent = "📋 Kopyala";
      }, 900);
    }

    showToast("Kopyalandı ✅");
  } catch (e) {
    showToast("Kopyalama başarısız ❌");
  }
}
window.copyText = copyText;

// ===== Temizle =====
function clearAll() {
  titleInput.value = "";
  messageInput.value = "";
  footerInput.value = "";

  if (templateSelect) templateSelect.value = "";
  if (templateDesc) templateDesc.textContent = "Bir şablon seçtiğinizde mesaj otomatik hazırlanır.";

  updatePreview();

  if (clearBtn) {
    clearBtn.classList.add("pulse");
    setTimeout(() => clearBtn.classList.remove("pulse"), 250);
  }

  showToast("Temizlendi 🧹");
}
window.clearAll = clearAll;

// ilk açılış
updatePreview();
