// ============================================================
// LEANDRO TRACKER
// Para mudar a localização futuramente,
// altere apenas o PRIMEIRO item de trackingPoints.
// ============================================================

const trackingPoints = [

  // LOCALIZAÇÃO ATUAL
  {
    city: "Porto",
    region: "Portugal",
    lat: 41.1579,
    lng: -8.6291,
    note: "Novo sinal detectado na cidade do Porto",
    when: "agora"
  },

  // LOCALIZAÇÃO ANTERIOR
  {
    city: "Farol da Nazaré",
    region: "Nazaré, Portugal",
    lat: 39.6049,
    lng: -9.0847,
    note: "Último avistamento confirmado antes do deslocamento ao norte",
    when: "anterior"
  }

];


// ============================================================
// STATUS ALEATÓRIOS
// ============================================================

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

  "Foi à Europa e aparentemente decidiu andar o continente inteiro a pé.",

  "Detectado em área turística. Comportamento previsível.",

  "Possivelmente pagando caro por uma água sem gás.",

  "Tentando descobrir onde fica o banheiro sem falar português europeu.",

  "Nenhum boletim de ocorrência emitido até o momento.",

  "Turista brasileiro detectado em habitat europeu.",

  "Fiscalizando pessoalmente a qualidade das cervejas locais.",

  "Em missão diplomática não autorizada.",

  "Último contato indica níveis perigosos de confiança.",

  "Localizado. Motivações permanecem desconhecidas.",

  "Aparentemente ainda sabe onde deixou o passaporte.",

  "Sistema detectou movimentação em direção a algum bar.",

  "Apreciando a cultura local. Principalmente a parte líquida.",

  "Nenhuma tentativa de falar espanhol em Portugal detectada até agora.",

  "Operação Europa segue sem grandes incidentes.",

  "Sinal positivo. Conta bancária possivelmente negativa."

];


// ============================================================
// MÉTRICAS ALEATÓRIAS
// ============================================================

const alcoholLevels = [
  "Em análise",
  "Controlado",
  "Europeu",
  "Suspeito",
  "Socialmente aceitável",
  "Dados inconclusivos"
];

const euroLevels = [
  "Informação sigilosa",
  "Diminuindo rapidamente",
  "Prefere não comentar",
  "Crise controlada",
  "Abaixo do recomendado",
  "Auditoria pendente"
];

const interpolLevels = [
  "Sem interesse",
  "Ainda não",
  "Monitorando de longe",
  "Nenhuma ocorrência",
  "Zero chamados",
  "Situação tranquila"
];


// ============================================================
// LOCALIZAÇÃO ATUAL
// ============================================================

const current = trackingPoints[0];


// Texto principal

const locationTitle =
  document.getElementById("location-title");

locationTitle.textContent =
  `${current.city} — ${current.region}`;


document.getElementById("updated-time")
  .textContent = current.when;


// ============================================================
// MAPA
// ============================================================

const map = L.map(
  "map",
  {
    zoomControl: true,
    scrollWheelZoom: true
  }
).setView(
  [current.lat, current.lng],
  14
);


// OpenStreetMap

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }
).addTo(map);


// ============================================================
// MARCADOR PERSONALIZADO
// ============================================================

const customIcon = L.divIcon({

  className: "tracker-div-icon",

  html: `
    <div class="tracker-icon">

      <div class="ring"></div>

      <img
        src="assets/leandro.png"
        alt="Leandro Henriques"
      >

    </div>
  `,

  iconSize: [58, 58],

  iconAnchor: [29, 29],

  popupAnchor: [0, -35]

});


const marker = L.marker(
  [current.lat, current.lng],
  {
    icon: customIcon
  }
).addTo(map);


// ============================================================
// POPUP
// ============================================================

marker.bindPopup(`

  <div class="popup-card">

    <strong>
      🎯 ALVO LOCALIZADO
    </strong>

    <br>

    ${current.city}

    <br>

    <span>
      ${current.region}
    </span>

    <div class="popup-status">

      Sinais vitais preservados.
      Turistando normalmente.

    </div>

  </div>

`).openPopup();


// ============================================================
// CÍRCULO DE "PRECISÃO"
// ============================================================

L.circle(
  [current.lat, current.lng],
  {

    radius: 280,

    color: "#69e7ff",

    weight: 1,

    opacity: 0.65,

    fillColor: "#69e7ff",

    fillOpacity: 0.06

  }
).addTo(map);


// ============================================================
// ROTA
// ============================================================

if (trackingPoints.length > 1) {

  const route =
    trackingPoints.map(
      point => [point.lat, point.lng]
    );


  L.polyline(
    route,
    {

      color: "#69e7ff",

      weight: 2,

      opacity: 0.55,

      dashArray: "7 9"

    }
  ).addTo(map);

}


// ============================================================
// HISTÓRICO
// ============================================================

const historyList =
  document.getElementById("history-list");


trackingPoints.forEach(
  (point, index) => {

    const item =
      document.createElement("div");


    item.className =
      "history-item";


    item.innerHTML = `

      <div class="history-dot"></div>

      <div>

        <div class="history-city">
          ${point.city}
        </div>

        <div class="history-note">

          ${point.region}

          ·

          ${point.note}

        </div>

      </div>

      <div class="history-time">

        ${
          index === 0
          ? "ATUAL"
          : point.when
        }

      </div>

    `;


    historyList.appendChild(item);

  }
);


// ============================================================
// STATUS ALEATÓRIO
// ============================================================

const statusText =
  document.getElementById("status-text");


let lastStatus = -1;


function rotateStatus() {

  let next;


  do {

    next =
      Math.floor(
        Math.random() *
        funnyStatuses.length
      );

  }
  while (
    next === lastStatus &&
    funnyStatuses.length > 1
  );


  lastStatus = next;


  statusText.style.opacity = 0;

  statusText.style.transform =
    "translateY(4px)";


  setTimeout(
    () => {

      statusText.textContent =
        funnyStatuses[next];


      statusText.style.transition =
        "opacity .28s ease, transform .28s ease";


      statusText.style.opacity = 1;

      statusText.style.transform =
        "translateY(0)";

    },

    180
  );

}


rotateStatus();


// muda a cada 12 segundos

setInterval(
  rotateStatus,
  12000
);


// ============================================================
// MÉTRICAS ALEATÓRIAS
// ============================================================

function pick(arr) {

  return arr[
    Math.floor(
      Math.random() *
      arr.length
    )
  ];

}


function rand(min, max) {

  return Math.floor(
    Math.random() *
    (max - min + 1)
  ) + min;

}


function refreshMetrics() {

  document
    .getElementById("metric-alcool")
    .textContent =
    pick(alcoholLevels);


  document
    .getElementById("metric-euros")
    .textContent =
    pick(euroLevels);


  document
    .getElementById("metric-mala")
    .textContent =
    `${rand(18, 63)}%`;


  document
    .getElementById("metric-romance")
    .textContent =
    `${rand(4, 31)}%`;


  document
    .getElementById("metric-interpol")
    .textContent =
    pick(interpolLevels);

}


refreshMetrics();


setInterval(
  refreshMetrics,
  24000
);


// ============================================================
// "ATUALIZADO HÁ X MINUTOS"
// ============================================================

let minutesAgo = 0;


setInterval(
  () => {

    minutesAgo += 1;


    document
      .getElementById("updated-time")
      .textContent =

      minutesAgo === 1

      ? "há 1 min"

      : `há ${minutesAgo} min`;

  },

  60000
);
