const $ = (id) => document.getElementById(id);

function clampHex(hex){
  const v = String(hex||"").trim();
  const h = v.startsWith("#") ? v : `#${v}`;
  return /^#[0-9a-fA-F]{6}$/.test(h) ? h : "#5865F2";
}
function hexToInt(hex){ return parseInt(clampHex(hex).replace("#",""), 16); }
function safeUrl(u){
  const v = String(u||"").trim();
  if(!v) return "";
  try{
    const url = new URL(v);
    return (url.protocol==="http:"||url.protocol==="https:") ? url.toString() : "";
  }catch{ return ""; }
}
function copyToClipboard(text){
  navigator.clipboard.writeText(text).then(()=>toast("Kopyalandı ✅")).catch(()=>toast("Kopyalanamadı ❌"));
}
let toastTimer=null;
function toast(msg){
  clearTimeout(toastTimer);
  let el=document.querySelector(".toast");
  if(!el){
    el=document.createElement("div");
    el.className="toast";
    Object.assign(el.style,{
      position:"fixed",left:"50%",bottom:"22px",transform:"translateX(-50%)",
      background:"rgba(15,23,42,.92)",color:"#fff",padding:"10px 12px",
      borderRadius:"12px",fontWeight:"900",fontSize:"12px",zIndex:9999,
      boxShadow:"0 12px 30px rgba(2,8,23,.25)"
    });
    document.body.appendChild(el);
  }
  el.textContent=msg;
  el.style.opacity="1";
  toastTimer=setTimeout(()=>el.style.opacity="0",1400);
}

const presetsEmbed = {
  partner: {
    title:"🤝 Partner Duyurusu",
    desc:`Partner olmak için şartlar:
• Sunucu aktif olmalı
• Reklam/NSFW yasak
• Karşılıklı paylaşım

Başvuru: Discord üzerinden iletişime geç.`,
    color:"#2b6df3",
    footer:"BRDN • Partner • Grow",
    b1Text:"Discord'a Katıl",
    b1Url:"https://discord.gg/vT4DMhkDu9",
    b2Text:"Partner Şartları",
    b2Url:""
  },
  giveaway: {
    title:"🎁 Çekiliş Başladı!",
    desc:`Ödül: (buraya yaz)
Bitiş: (tarih/saat)
Şartlar:
• Sunucuya katıl
• Tepki bırak
• Arkadaş etiketle (opsiyonel)

Bol şans!`,
    color:"#5865F2",
    footer:"BRDN • Giveaways",
    b1Text:"Katıl",
    b1Url:"https://discord.gg/vT4DMhkDu9",
    b2Text:"Kurallar",
    b2Url:""
  },
  event: {
    title:"📣 Etkinlik Duyurusu",
    desc:`Etkinlik: (adı)
Tarih/Saat: (yaz)
Detay: (kısa açıklama)

Katılım: Discord üzerinden.`,
    color:"#1f5bd4",
    footer:"BRDN • Events",
    b1Text:"Discord",
    b1Url:"https://discord.gg/vT4DMhkDu9",
    b2Text:"Detaylar",
    b2Url:""
  },
  rules: {
    title:"📌 Sunucu Kuralları",
    desc:`1) Saygı şart.
2) Spam/flood yok.
3) Reklam yasak.
4) NSFW yasak.
5) Yetkililere saygı.

İhlalde uyarı/timeout/ban uygulanır.`,
    color:"#0ea5e9",
    footer:"BRDN • Kurallar",
    b1Text:"Rol Al",
    b1Url:"",
    b2Text:"Destek",
    b2Url:""
  }
};

function collectEmbed(){
  const title=$("eTitle").value.trim();
  const desc=$("eDesc").value.trim();
  const color=clampHex($("eColor").value);
  const footer=$("eFooter").value.trim();
  const thumb=safeUrl($("eThumb").value);
  const image=safeUrl($("eImage").value);

  const b1Text=$("b1Text").value.trim();
  const b1Url=safeUrl($("b1Url").value);
  const b2Text=$("b2Text").value.trim();
  const b2Url=safeUrl($("b2Url").value);

  const buttons=[];
  if(b1Text && b1Url) buttons.push({label:b1Text,url:b1Url});
  if(b2Text && b2Url) buttons.push({label:b2Text,url:b2Url});

  const embed={
    title: title || undefined,
    description: desc || undefined,
    color: hexToInt(color),
    thumbnail: thumb ? {url:thumb} : undefined,
    image: image ? {url:image} : undefined,
    footer: footer ? {text:footer} : undefined,
    timestamp: new Date().toISOString()
  };
  Object.keys(embed).forEach(k=>embed[k]===undefined && delete embed[k]);

  const webhookPayload={
    content:"",
    embeds:[embed],
    components: buttons.length ? [{
      type:1,
      components: buttons.map(b=>({type:2,style:5,label:b.label,url:b.url}))
    }] : []
  };

  const textLines=[];
  if(title) textLines.push(`**${title}**`);
  if(desc) textLines.push(desc);
  if(buttons.length){
    textLines.push("");
    buttons.forEach(b=>textLines.push(`• ${b.label}: ${b.url}`));
  }

  return {title,desc,color,footer,buttons,webhookPayload,text:textLines.join("\n")};
}

function renderPreview(d){
  $("pvTitle").textContent=d.title || "Başlık";
  $("pvDesc").textContent=d.desc || "Açıklama burada görünür.";
  $("pvFooter").textContent=d.footer || "Footer";
  $("pvColor").textContent=d.color || "#5865F2";

  const btnWrap=$("pvButtons");
  btnWrap.innerHTML="";
  (d.buttons||[]).forEach(b=>{
    const a=document.createElement("a");
    a.className="pv-btn";
    a.href=b.url; a.target="_blank"; a.rel="noopener";
    a.textContent=b.label;
    btnWrap.appendChild(a);
  });
}

function build(){
  const d=collectEmbed();
  renderPreview(d);
  $("outText").value=d.text || "";
  $("outJson").value=JSON.stringify(d.webhookPayload,null,2);
  return d;
}

function applyPreset(key){
  const p=presetsEmbed[key]; if(!p) return;
  $("eTitle").value=p.title;
  $("eDesc").value=p.desc;
  $("eColor").value=p.color;
  $("eFooter").value=p.footer;
  $("b1Text").value=p.b1Text;
  $("b1Url").value=p.b1Url;
  $("b2Text").value=p.b2Text;
  $("b2Url").value=p.b2Url;
  $("eThumb").value="";
  $("eImage").value="";
  build();
  toast("Şablon yüklendi ✅");
}

document.querySelectorAll(".preset").forEach(btn=>{
  btn.addEventListener("click",()=>applyPreset(btn.dataset.preset));
});

["eTitle","eDesc","eColor","eFooter","eThumb","eImage","b1Text","b1Url","b2Text","b2Url"].forEach(id=>{
  $(id).addEventListener("input",()=>build());
});

$("btnBuildEmbed").addEventListener("click",()=>build());
$("btnCopyText").addEventListener("click",()=>copyToClipboard($("outText").value));
$("btnCopyJson").addEventListener("click",()=>copyToClipboard($("outJson").value));
$("btnClearEmbed").addEventListener("click",()=>{
  ["eTitle","eDesc","eFooter","eThumb","eImage","b1Text","b1Url","b2Text","b2Url"].forEach(id=>$(id).value="");
  $("eColor").value="#5865F2";
  build();
  toast("Temizlendi");
});

build();
