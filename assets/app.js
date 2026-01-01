const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const footerInput = document.getElementById("footer");

const preview = document.getElementById("preview");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

function updatePreview() {
  const title = titleInput.value.trim();
  const message = messageInput.value.trim();
  const footer = footerInput.value.trim();

  let text = "";

  if (title) text += title + "\n\n";
  if (message) text += message + "\n";
  if (footer) text += "\n— " + footer;

  preview.innerText = text || "Mesaj içeriği burada görünecek.";
}

titleInput.addEventListener("input", updatePreview);
messageInput.addEventListener("input", updatePreview);
footerInput.addEventListener("input", updatePreview);

copyBtn.addEventListener("click", () => {
  const text = preview.innerText;
  if (!text || text.includes("görünecek")) return;

  navigator.clipboard.writeText(text);
  copyBtn.innerText = "✅ Kopyalandı";
  setTimeout(() => copyBtn.innerText = "📋 Kopyala", 1500);
});

clearBtn.addEventListener("click", () => {
  titleInput.value = "";
  messageInput.value = "";
  footerInput.value = "";
  updatePreview();
});
