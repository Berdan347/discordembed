const title = document.getElementById("title");
const desc = document.getElementById("description");
const color = document.getElementById("color");
const footer = document.getElementById("footer");

const pTitle = document.getElementById("pTitle");
const pDesc = document.getElementById("pDesc");
const pFooter = document.getElementById("pFooter");
const embedColor = document.getElementById("embedColor");

function update() {
  pTitle.textContent = title.value || "Başlık";
  pDesc.textContent = desc.value || "Açıklama";
  pFooter.textContent = footer.value || "";
  embedColor.style.background = color.value;
}

title.addEventListener("input", update);
desc.addEventListener("input", update);
footer.addEventListener("input", update);
color.addEventListener("input", update);

function copyJSON() {
  const data = {
    embeds: [
      {
        title: title.value,
        description: desc.value,
        color: parseInt(color.value.replace("#", ""), 16),
        footer: footer.value ? { text: footer.value } : undefined
      }
    ]
  };

  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  alert("Embed JSON kopyalandı!");
}
