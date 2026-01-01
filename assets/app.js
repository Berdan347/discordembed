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
