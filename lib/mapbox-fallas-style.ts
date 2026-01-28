// Fallas-themed Mapbox Style
// Fire, celebration, warmth - Valencia Las Fallas festival vibes

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmFsbGFzLWFwcCIsImEiOiJjbHI5MnA4ejcwMXB5MmpwMnc5dnl2dWJxIn0.placeholder';

// Note: Replace with your own Mapbox token from https://account.mapbox.com/
// Free tier: 50,000 map loads/month

export const FALLAS_STYLE: mapboxgl.Style = {
  version: 8,
  name: 'Fallas Valencia',
  sprite: 'mapbox://sprites/mapbox/dark-v11',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  sources: {
    'mapbox-streets': {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8',
    },
  },
  layers: [
    // Background - deep dark
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#0D0D0D',
      },
    },
    // Land areas - dark charcoal
    {
      id: 'land',
      type: 'fill',
      source: 'mapbox-streets',
      'source-layer': 'land',
      paint: {
        'fill-color': '#1A1A1A',
      },
    },
    // Water - deep blue
    {
      id: 'water',
      type: 'fill',
      source: 'mapbox-streets',
      'source-layer': 'water',
      paint: {
        'fill-color': '#0A1929',
        'fill-outline-color': '#1E3A5F',
      },
    },
    // Parks - dark forest green with subtle glow
    {
      id: 'landuse-park',
      type: 'fill',
      source: 'mapbox-streets',
      'source-layer': 'landuse',
      filter: ['==', ['get', 'class'], 'park'],
      paint: {
        'fill-color': '#1A2F1A',
        'fill-opacity': 0.8,
      },
    },
    // Buildings - dark red silhouettes
    {
      id: 'building',
      type: 'fill',
      source: 'mapbox-streets',
      'source-layer': 'building',
      minzoom: 15,
      paint: {
        'fill-color': '#2D1A1A',
        'fill-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          16, 0.9,
        ],
      },
    },
    // Building outlines - ember glow
    {
      id: 'building-outline',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'building',
      minzoom: 15,
      paint: {
        'line-color': '#4A2020',
        'line-width': 0.5,
        'line-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          16, 0.6,
        ],
      },
    },
    // Minor roads - warm orange
    {
      id: 'road-minor',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: [
        'all',
        ['match', ['get', 'class'], ['street', 'street_limited', 'service'], true, false],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#4A2800',
        'line-width': [
          'interpolate',
          ['exponential', 1.5],
          ['zoom'],
          12, 0.5,
          14, 1,
          16, 3,
        ],
        'line-opacity': 0.8,
      },
    },
    // Secondary roads - brighter orange
    {
      id: 'road-secondary',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: [
        'match',
        ['get', 'class'],
        ['secondary', 'tertiary'],
        true,
        false,
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#8B4000',
        'line-width': [
          'interpolate',
          ['exponential', 1.5],
          ['zoom'],
          10, 1,
          14, 3,
          16, 6,
        ],
      },
    },
    // Primary roads - fire orange
    {
      id: 'road-primary',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: ['==', ['get', 'class'], 'primary'],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#CC5500',
        'line-width': [
          'interpolate',
          ['exponential', 1.5],
          ['zoom'],
          10, 1.5,
          14, 4,
          16, 8,
        ],
      },
    },
    // Trunk roads - bright fire
    {
      id: 'road-trunk',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: ['==', ['get', 'class'], 'trunk'],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#E65C00',
        'line-width': [
          'interpolate',
          ['exponential', 1.5],
          ['zoom'],
          10, 2,
          14, 5,
          16, 10,
        ],
      },
    },
    // Motorway - intense fire gradient effect
    {
      id: 'road-motorway',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: ['==', ['get', 'class'], 'motorway'],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#FF6B35',
        'line-width': [
          'interpolate',
          ['exponential', 1.5],
          ['zoom'],
          8, 1,
          12, 4,
          16, 12,
        ],
      },
    },
    // Motorway glow effect
    {
      id: 'road-motorway-glow',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: ['==', ['get', 'class'], 'motorway'],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#FF6B35',
        'line-width': [
          'interpolate',
          ['exponential', 1.5],
          ['zoom'],
          8, 3,
          12, 10,
          16, 25,
        ],
        'line-opacity': 0.15,
        'line-blur': 3,
      },
    },
    // Path / pedestrian - dim warm
    {
      id: 'road-path',
      type: 'line',
      source: 'mapbox-streets',
      'source-layer': 'road',
      filter: ['match', ['get', 'class'], ['path', 'pedestrian'], true, false],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#3D2800',
        'line-width': 1,
        'line-dasharray': [2, 2],
      },
    },
    // Place labels - warm orange/gold
    {
      id: 'place-label-city',
      type: 'symbol',
      source: 'mapbox-streets',
      'source-layer': 'place_label',
      filter: ['==', ['get', 'class'], 'city'],
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
        'text-size': [
          'interpolate',
          ['linear'],
          ['zoom'],
          8, 14,
          12, 22,
        ],
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.1,
      },
      paint: {
        'text-color': '#FFB347',
        'text-halo-color': '#0D0D0D',
        'text-halo-width': 2,
      },
    },
    // Neighborhood labels
    {
      id: 'place-label-neighborhood',
      type: 'symbol',
      source: 'mapbox-streets',
      'source-layer': 'place_label',
      filter: ['==', ['get', 'class'], 'neighbourhood'],
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 12,
      },
      paint: {
        'text-color': '#CC8844',
        'text-halo-color': '#0D0D0D',
        'text-halo-width': 1.5,
      },
    },
    // Street labels - light orange
    {
      id: 'road-label',
      type: 'symbol',
      source: 'mapbox-streets',
      'source-layer': 'road',
      minzoom: 14,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['DIN Pro Regular', 'Arial Unicode MS Regular'],
        'text-size': 10,
        'symbol-placement': 'line',
        'text-rotation-alignment': 'map',
      },
      paint: {
        'text-color': '#AA7744',
        'text-halo-color': '#1A1A1A',
        'text-halo-width': 1,
      },
    },
    // POI labels
    {
      id: 'poi-label',
      type: 'symbol',
      source: 'mapbox-streets',
      'source-layer': 'poi_label',
      minzoom: 15,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size': 11,
        'text-anchor': 'top',
        'text-offset': [0, 0.5],
      },
      paint: {
        'text-color': '#FFAA66',
        'text-halo-color': '#0D0D0D',
        'text-halo-width': 1,
      },
    },
  ],
} as unknown as mapboxgl.Style;

// Valencia center coordinates
export const VALENCIA_CENTER = {
  longitude: -0.3763,
  latitude: 39.4699,
};

// Initial map view state
export const INITIAL_VIEW_STATE = {
  ...VALENCIA_CENTER,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};
