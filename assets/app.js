const title = document.getElementById("title");
const message = document.getElementById("message");
const footer = document.getElementById("footer");
const result = document.getElementById("result");

function update() {
  result.textContent =
`${title.value || "📢 DUYURU"}

${message.value || "Mesaj burada görünecek."}

— ${footer.value || "BRDN • Discord"}`;
}

title.addEventListener("input", update);
message.addEventListener("input", update);
footer.addEventListener("input", update);

function copyText() {
  navigator.clipboard.writeText(result.textContent);
  alert("Metin kopyalandı! Discord’a yapıştırabilirsin.");
}
