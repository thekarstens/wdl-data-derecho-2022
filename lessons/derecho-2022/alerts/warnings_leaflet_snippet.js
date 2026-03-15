
// Leaflet layer for May 12, 2022 tornado + severe thunderstorm warnings
// Data file: may12_2022_tornado_severe_warnings.geojson

async function loadMay12Warnings(map) {
  const response = await fetch('./data/may12_2022_tornado_severe_warnings.geojson');
  const geojson = await response.json();

  const warningsLayer = L.geoJSON(geojson, {
    style: feature => ({
      color: feature.properties.outlineColor || feature.properties.color,
      fillColor: feature.properties.fillColor || feature.properties.color,
      weight: feature.properties.weight ?? 2,
      opacity: 0.95,
      fillOpacity: feature.properties.fillOpacity ?? 0.18
    }),
    onEachFeature: (feature, layer) => {
      const popup = feature.properties.popupHtml || `<strong>${feature.properties.event}</strong>`;
      layer.bindPopup(popup, { maxWidth: 480 });
    }
  });

  return warningsLayer;
}
