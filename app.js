// ============================================================
// LEANDRO TRACKER — configuração principal
// Para mudar a localização, altere o PRIMEIRO item deste array.
// ============================================================
const trackingPoints = [
  {
    city: "Farol da Nazaré",
    region: "Nazaré, Portugal",
    lat: 39.6049,
    lng: -9.0847,
    note: "Último sinal confirmado no litoral português",
    when: "agora"
  }
];

const funnyStatuses = [
  "Fingindo que sabe onde está.",
  "Turistando com confiança excessiva.",
  "Vivo, aparentemente.",
  "Tentando parecer europeu.",
  "Última vez visto tomando decisões questionáveis.",
  "Contemplando patrimônio histórico sem entender absolutamente nada.",
  "Provavelmente procurando cerveja.",
  "Em deslocamento não autorizado.",
  "GPS interno completamente comprometido.",
  "Operando em modo turista premium.",
  "Sem incidentes diplomáticos registrados nas últimas horas.",
  "Fotografando coisas que nunca mais vai olhar.",
  "Convertendo euro para real e se arrependendo imediatamente.",
  "Financeiramente abalado, emocionalmente europeu.",
  "Possivelmente procurando um banheiro.",
  "Mantendo distância segura de qualquer responsabilidade.",
  "Suspeita de consumo excessivo de pastel de nata.",
  "Passaporte ainda não perdido. Consideramos uma vitória.",
  "Atividade incomum detectada: caminhando mais que no Brasil.",
  "Tentando descobrir se 7 euros numa cerveja é normal.",
  "Sinal estável. Bom senso: instável.",
  "Interagindo com nativos por meio de gestos e convicção.",
  "Ainda não apareceu em nenhum consulado. Excelente notícia.",
  "Modo férias ativado; responsabilidade temporariamente indisponível.",
  "Foi à Europa e aparentemente decidiu andar o continente inteiro a pé."
];

const alcoholLevels = ["Em análise", "Controlado", "Europeu", "Suspeito", "Socialmente aceitável", "Dados inconclusivos"];
const euroLevels = ["Informação sigilosa", "Diminuindo rapidamente", "Prefere não comentar", "Crise controlada", "Abaixo do recomendado", "Auditoria pendente"];
const interpolLevels = ["Sem interesse", "Ainda não", "Monitorando de longe", "Nenhuma ocorrência", "Zero chamados", "Situação tranquila"];

const current = trackingPoints[0];

// Atualiza textos principais
const locationTitle = document.getElementById("location-title");
locationTitle.textContent = `${current.city} — ${current.region}`;

document.getElementById("updated-time").textContent = current.when;

// Mapa
const map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView([current.lat, current.lng], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const customIcon = L.divIcon({
  className: "tracker-div-icon",
  html: `<div class="tracker-icon"><div class="ring"></div><img src="assets/leandro.png" alt="Leandro"></div>`,
  iconSize: [58, 58],
  iconAnchor: [29, 29],
  popupAnchor: [0, -35]
});

const marker = L.marker([current.lat, current.lng], { icon: customIcon }).addTo(map);
marker.bindPopup(`
  <div class="popup-card">
    <strong>🎯 ALVO LOCALIZADO</strong><br>
    ${current.city}<br>
    <span>${current.region}</span>
    <div class="popup-status">Sinais vitais preservados. Turistando normalmente.</div>
  </div>
`).openPopup();

// Círculo de "precisão" completamente inventado
L.circle([current.lat, current.lng], {
  radius: 280,
  color: "#69e7ff",
  weight: 1,
  opacity: .65,
  fillColor: "#69e7ff",
  fillOpacity: .06
}).addTo(map);

// Histórico
const historyList = document.getElementById("history-list");
trackingPoints.forEach((point, index) => {
  const item = document.createElement("div");
  item.className = "history-item";
  item.innerHTML = `
    <div class="history-dot"></div>
    <div>
      <div class="history-city">${point.city}</div>
      <div class="history-note">${point.region} · ${point.note}</div>
    </div>
    <div class="history-time">${index === 0 ? "ATUAL" : point.when}</div>
  `;
  historyList.appendChild(item);
});

// Status aleatório
const statusText = document.getElementById("status-text");
let lastStatus = -1;
function rotateStatus() {
  let next;
  do {
    next = Math.floor(Math.random() * funnyStatuses.length);
  } while (next === lastStatus && funnyStatuses.length > 1);

  lastStatus = next;
  statusText.style.opacity = 0;
  statusText.style.transform = "translateY(4px)";

  setTimeout(() => {
    statusText.textContent = funnyStatuses[next];
    statusText.style.transition = "opacity .28s ease, transform .28s ease";
    statusText.style.opacity = 1;
    statusText.style.transform = "translateY(0)";
  }, 180);
}
rotateStatus();
setInterval(rotateStatus, 12000);

// Métricas aleatórias e obviamente duvidosas
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function refreshMetrics() {
  document.getElementById("metric-alcool").textContent = pick(alcoholLevels);
  document.getElementById("metric-euros").textContent = pick(euroLevels);
  document.getElementById("metric-mala").textContent = `${rand(18, 63)}%`;
  document.getElementById("metric-romance").textContent = `${rand(4, 31)}%`;
  document.getElementById("metric-interpol").textContent = pick(interpolLevels);
}
refreshMetrics();
setInterval(refreshMetrics, 24000);

// "Atualizado há X" apenas para dar vida ao painel.
let minutesAgo = 0;
setInterval(() => {
  minutesAgo += 1;
  document.getElementById("updated-time").textContent = minutesAgo === 1 ? "há 1 min" : `há ${minutesAgo} min`;
}, 60000);
