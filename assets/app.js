// ===== BRDN Discord Mesaj Oluşturucu =====

// Elementler
const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const footerInput = document.getElementById("footer");

const previewTitle = document.getElementById("previewTitle");
const previewMessage = document.getElementById("previewMessage");
const previewFooter = document.getElementById("previewFooter");

const templateSelect = document.getElementById("template");
const templateDesc = document.getElementById("templateDesc");

// Şablonlar (⚠️ her şablon BLOĞU arasında virgül var)
const TEMPLATES = {
  duyuru: {
    desc: "Genel duyuru formatı (net + kurumsal).",
    title: "📢 DUYURU",
    message: `Merhaba @everyone,

Önemli bir bilgilendirme:

• (Madde 1)
• (Madde 2)
• (Madde 3)

Detaylar için duyuruyu dikkatlice okuyunuz.`,
    footer: "Sunucu Yönetimi"
  },

  cekilis: {
    desc: "Çekiliş mesajı (şartlar + süre + ödül).",
    title: "🎁 ÇEKİLİŞ BAŞLADI",
    message: `Merhaba @everyone,

🎉 Çekilişimiz başladı!

🏆 Ödül: (Ödül yaz)
⏳ Süre: (Tarih / Saat)
✅ Katılım Şartları:
1) (Şart 1)
2) (Şart 2)
3) (Şart 3)

Bol şans! 🍀`,
    footer: "Çekiliş Ekibi"
  },

  partner: {
    desc: "Partner duyurusu (temiz + anlaşmalı).",
    title: "🤝 PARTNER DUYURUSU",
    message: `Selamlar!

Bugün yeni partnerimizi duyuruyoruz. 🎉

🔗 Partner Sunucu: (Link)
📌 Açıklama:
• (Kısa bilgi)
• (Ne sunuyor?)
• (Kimlere uygun?)

Herkese hayırlı olsun!`,
    footer: "Partner Ekibi"
  },

  bakim: {
    desc: "Bakım / güncelleme bilgilendirmesi.",
    title: "🛠️ BAKIM / GÜNCELLEME",
    message: `Merhaba,

Sistem üzerinde bakım / güncelleme yapılacaktır.

⏰ Başlangıç: (Saat)
⏳ Tahmini süre: (Süre)
📌 Not: Bu süre boyunca bazı özellikler geçici olarak kapalı olabilir.

Anlayışınız için teşekkürler.`,
    footer: "Teknik Ekip"
  },

  etkinlik: {
    desc: "Etkinlik duyurusu (tarih + katılım).",
    title: "🎉 ETKİNLİK DUYURUSU",
    message: `Merhaba @everyone,

Yeni etkinliğimiz hazır! 🎉

📅 Tarih: (Tarih)
🕘 Saat: (Saat)
📍 Yer: (Kanal / Sunucu içi)
✅ Katılım:
• (Nasıl katılınır?)
• (Kurallar)

Herkesi bekliyoruz!`,
    footer: "Etkinlik Ekibi"
  },

  // ✅ Yeni şablonlar (hata veren "kurallar" burada düzgün)
  kurallar: {
    desc: "Kurallar mesajı (net, profesyonel, uygulanabilir).",
    title: "📌 SUNUCU KURALLARI",
    message: `Değerli üyelerimiz,

Sunucumuzun düzeni ve güvenliği için aşağıdaki kurallara uymanız zorunludur:

1) Saygı: Küfür, hakaret, nefret söylemi ve taciz yasaktır.
2) Spam/Flood: Gereksiz etiket, reklam ve flood yasaktır.
3) Gizlilik: Kişisel bilgi paylaşımı (ifşa/dox) kesinlikle yasaktır.
4) Reklam: Yetkisiz sunucu/ürün reklamı yasaktır.
5) Yetkili kararları: Yetkili uyarılarına uyulmalıdır.

İhlallerde; uyarı → susturma → uzaklaştırma uygulanabilir.

Teşekkürler.`,
    footer: "Yönetim Ekibi"
  },

  yetkili: {
    desc: "Yetkili alım duyurusu (ciddi ve iş odaklı).",
    title: "🛡️ YETKİLİ ALIMI",
    message: `Merhaba!

Sunucumuz için yeni yetkili arkadaşlar arıyoruz.

✅ Aranan özellikler:
• Aktiflik ve sorumluluk bilinci
• İletişimi güçlü, sakin ve çözüm odaklı
• Kurallara hakim, adil yaklaşım

📌 Başvuru:
• Ticket açarak “Yetkili Başvuru” seçeneğini kullanın.
• Kısa bir tanıtım + aktif olduğunuz saatleri yazın.

Uygun görülen adaylara dönüş sağlanacaktır.`,
    footer: "Yetkili Ekibi"
  },

  ticket: {
    desc: "Destek/ticket yönlendirme (düzenli ve net).",
    title: "🎫 DESTEK / TICKET",
    message: `Destek almak için lütfen ticket açın.

📌 Ticket açarken:
• Konuyu net yazın (rol, ödeme, şikayet, öneri vb.)
• Gerekirse ekran görüntüsü ekleyin
• Etiket spam’i yapmayın

Yetkililer en kısa sürede dönüş sağlayacaktır.

Teşekkürler.`,
    footer: "Destek Ekibi"
  },

  tanitim: {
    desc: "Sunucu tanıtım / reklam metni (profesyonel vitrin).",
    title: "📣 SUNUCU TANITIMI",
    message: `Merhaba! Sunucumuza davetlisin 👋

✨ Sunucumuzda neler var?
• Aktif sohbet ve düzenli etkinlikler
• Çekilişler / özel rol sistemleri
• Yardımsever topluluk ve ilgili yetkililer

📌 Katıl:
👉 Davet linki: (buraya link)

Gelin, birlikte büyüyelim!`,
    footer: "BRDN • Topluluk"
  }
};

// Önizleme güncelle
function updatePreview() {
  const t = (titleInput.value || "").trim();
  const m = (messageInput.value || "").trim();
  const f = (footerInput.value || "").trim();

  previewTitle.textContent = t || "Başlık";
  previewMessage.textContent = m || "Mesaj içeriği burada görünecek.";
  previewFooter.textContent = f || "Footer";
}

// Şablon uygula
function applyTemplate() {
  const key = templateSelect.value;

  if (!key) {
    if (templateDesc) templateDesc.textContent = "Bir şablon seçtiğinizde mesaj otomatik hazırlanır.";
    return;
  }

  const t = TEMPLATES[key];
  if (!t) {
    showToast("Şablon bulunamadı ❌");
    return;
  }

  titleInput.value = t.title || "";
  messageInput.value = t.message || "";
  footerInput.value = t.footer || "";
  if (templateDesc) templateDesc.textContent = t.desc || "Şablon yüklendi ✅";

  updatePreview();
  showToast("Şablon yüklendi ✅");
}

// Temizle
function clearAll() {
  titleInput.value = "";
  messageInput.value = "";
  footerInput.value = "";
  if (templateSelect) templateSelect.value = "";
  if (templateDesc) templateDesc.textContent = "Bir şablon seçtiğinizde mesaj otomatik hazırlanır.";
  updatePreview();
  showToast("Temizlendi 🧹");
}

// Kopyala (başlık + mesaj + footer)
async function copyText() {
  const t = (titleInput.value || "").trim();
  const m = (messageInput.value || "").trim();
  const f = (footerInput.value || "").trim();

  const out =
`${t ? `**${t}**\n` : ""}${m}${f ? `\n\n_${f}_` : ""}`.trim();

  try {
    await navigator.clipboard.writeText(out);
    showToast("Kopyalandı ✅");
  } catch (e) {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = out;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Kopyalandı ✅");
  }
}

// Toast (mini bildirim)
function showToast(text) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "24px";
    el.style.transform = "translateX(-50%)";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "12px";
    el.style.background = "rgba(20, 25, 40, 0.9)";
    el.style.border = "1px solid rgba(255,255,255,0.12)";
    el.style.color = "#fff";
    el.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Arial";
    el.style.fontSize = "14px";
    el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    el.style.transition = "opacity .18s ease, transform .18s ease";
    document.body.appendChild(el);
  }

  el.textContent = text;
  el.style.opacity = "1";
  el.style.transform = "translateX(-50%) translateY(-6px)";

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(0px)";
  }, 1400);
}

// Input değişince önizleme
titleInput.addEventListener("input", updatePreview);
messageInput.addEventListener("input", updatePreview);
footerInput.addEventListener("input", updatePreview);

// HTML inline çağrılar için global yap
window.applyTemplate = applyTemplate;
window.copyText = copyText;
window.clearAll = clearAll;

// İlk yükleme
updatePreview();
