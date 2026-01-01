// ===== BRDN Discord Mesaj Aracı - app.js =====

const templates = {
  duyuru: {
    title: "📢 DUYURU",
    message:
      "Merhaba @everyone,\n\n📌 **Önemli güncelleme:**\n• Detay 1\n• Detay 2\n\n🕒 Saat: 21:00\n✅ Katılımınızı bekliyoruz.",
    footer: "BRDN • Duyuru Sistemi",
  },
  cekilis: {
    title: "🎁 ÇEKİLİŞ BAŞLADI",
    message:
      "🎉 **Ödül:** Nitro / Oyun / Hediye\n👥 **Katılım:** ✅ Emoji ile tepki ver\n⏳ **Bitiş:** 24 saat\n\n🍀 Bol şans!",
    footer: "BRDN • Çekiliş",
  },
  partner: {
    title: "🤝 PARTNERLİK",
    message:
      "Selam! Partnerlik için hazırız.\n\n✅ **Şartlar:**\n• Aktif sunucu\n• Düzenli destek\n• Karşılıklı paylaşım\n\n📩 İletişim: Yetkiliye DM",
    footer: "BRDN • Partner",
  },
  etkinlik: {
    title: "🎉 ETKİNLİK",
    message:
      "Bu akşam etkinlik var!\n\n📍 **Konu:** Oyun / Sohbet / Turnuva\n🕘 **Saat:** 22:00\n🎙️ **Ses:** Açık\n\nHerkesi bekliyoruz!",
    footer: "BRDN • Etkinlik",
  },
};

function $(id) {
  return document.getElementById(id);
}

// ---- Elemanlar
const templateSelect = $("template");
const titleInput = $("title");
const messageInput = $("message");
const footerInput = $("footer");

const previewTitle = $("previewTitle");
const previewMessage = $("previewMessage");
const previewFooter = $("previewFooter");

const copyBtn = $("copyBtn");
const clearBtn = $("clearBtn");
const toast = $("toast");

// ---- Önizleme
function updatePreview() {
  previewTitle.textContent = titleInput.value.trim() || "Başlık";
  previewMessage.textContent =
    messageInput.value.trim() || "Mesaj içeriği burada görünecek.";
  previewFooter.textContent = footerInput.value.trim() || "Footer";
}

// ---- Şablon seçimi
function applyTemplate(key) {
  const t = templates[key];
  if (!t) return;
  titleInput.value = t.title;
  messageInput.value = t.message;
  footerInput.value = t.footer;
  updatePreview();
}

// ---- Toast
function showToast(text = "Kopyalandı ✅") {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
}

// ---- Kopyalama
async function copyText() {
  // Discord’a yapıştırılacak düz metin:
  const out =
    (titleInput.value.trim() ? `**${titleInput.value.trim()}**\n` : "") +
    (messageInput.value.trim() ? `${messageInput.value.trim()}\n` : "") +
    (footerInput.value.trim() ? `\n_${footerInput.value.trim()}_` : "");

  try {
    await navigator.clipboard.writeText(out.trim());
    copyBtn.classList.add("pulse");
    showToast("Kopyalandı ✅");
    setTimeout(() => copyBtn.classList.remove("pulse"), 250);
  } catch (e) {
    showToast("Kopyalama başarısız ❌");
  }
}

// ---- Temizle
function clearAll() {
  titleInput.value = "";
  messageInput.value = "";
  footerInput.value = "";
  // dropdown'u ilk seçeneğe al
  if (templateSelect) templateSelect.value = "";
  updatePreview();
  showToast("Temizlendi 🧹");
}

// ---- Eventler
if (templateSelect) {
  templateSelect.addEventListener("change", (e) => {
    const key = e.target.value;
    applyTemplate(key);
  });
}

[titleInput, messageInput, footerInput].forEach((el) => {
  el.addEventListener("input", updatePreview);
});

copyBtn.addEventListener("click", copyText);
clearBtn.addEventListener("click", clearAll);

// ilk açılış
updatePreview();
