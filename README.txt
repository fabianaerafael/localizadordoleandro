LEANDRO TRACKER — COMO USAR
===========================

Arquivos:
- index.html
- style.css
- app.js
- assets/leandro.png

COMO ABRIR
----------
Abra o arquivo index.html em um navegador com internet.
O mapa usa Leaflet + OpenStreetMap via CDN.

COMO PUBLICAR NO GITHUB PAGES
-----------------------------
1. Crie um repositório no GitHub.
2. Envie todos os arquivos e a pasta assets mantendo a mesma estrutura.
3. Vá em Settings > Pages.
4. Em "Build and deployment", escolha "Deploy from a branch".
5. Branch: main / root.
6. Salve e aguarde o link ser liberado.

COMO ALTERAR A LOCALIZAÇÃO
--------------------------
Abra app.js e edite o PRIMEIRO objeto de "trackingPoints".

Exemplo:
{
  city: "Paris",
  region: "França",
  lat: 48.8584,
  lng: 2.2945,
  note: "Avistado perto da Torre Eiffel",
  when: "agora"
}

Para manter histórico, não apague os pontos antigos: coloque a nova localização em primeiro lugar e mantenha as anteriores abaixo.

IMPORTANTE
----------
O rastreamento é satírico e não utiliza GPS real.
