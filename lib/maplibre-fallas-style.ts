// Fallas-themed MapLibre Style (OpenStreetMap-based)
// Fire, celebration, warmth - Valencia Las Fallas festival vibes
// Works WITHOUT Mapbox token - uses OSM tiles

import type { StyleSpecification } from 'maplibre-gl';

export const FALLAS_MAPLIBRE_STYLE: StyleSpecification = {
  version: 8,
  name: 'Fallas Valencia',
  sources: {
    'osm': {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
    },
  },
  sprite: 'https://openmaptiles.github.io/osm-bright-gl-style/sprite',
  glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  layers: [
    // Background - deep dark charcoal
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#0D0D0D',
      },
    },
    // Land areas - dark charcoal
    {
      id: 'landcover',
      type: 'fill',
      source: 'osm',
      'source-layer': 'landcover',
      paint: {
        'fill-color': '#1A1A1A',
      },
    },
    // Water - deep blue
    {
      id: 'water',
      type: 'fill',
      source: 'osm',
      'source-layer': 'water',
      paint: {
        'fill-color': '#0A1929',
      },
    },
    // Water outline
    {
      id: 'water-outline',
      type: 'line',
      source: 'osm',
      'source-layer': 'water',
      paint: {
        'line-color': '#1E3A5F',
        'line-width': 1,
      },
    },
    // Parks - dark forest green
    {
      id: 'park',
      type: 'fill',
      source: 'osm',
      'source-layer': 'park',
      paint: {
        'fill-color': '#1A2F1A',
        'fill-opacity': 0.8,
      },
    },
    // Landuse park
    {
      id: 'landuse-park',
      type: 'fill',
      source: 'osm',
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
      source: 'osm',
      'source-layer': 'building',
      minzoom: 13,
      paint: {
        'fill-color': '#2D1A1A',
        'fill-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          13, 0,
          15, 0.9,
        ],
      },
    },
    // Building outlines - ember glow
    {
      id: 'building-outline',
      type: 'line',
      source: 'osm',
      'source-layer': 'building',
      minzoom: 13,
      paint: {
        'line-color': '#4A2020',
        'line-width': 0.5,
        'line-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          13, 0,
          15, 0.6,
        ],
      },
    },
    // Minor roads - warm orange
    {
      id: 'road-minor',
      type: 'line',
      source: 'osm',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['match', ['get', 'class'], ['minor', 'service', 'track'], true, false],
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
      source: 'osm',
      'source-layer': 'transportation',
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
      source: 'osm',
      'source-layer': 'transportation',
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
      source: 'osm',
      'source-layer': 'transportation',
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
    // Motorway - intense fire
    {
      id: 'road-motorway',
      type: 'line',
      source: 'osm',
      'source-layer': 'transportation',
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
      source: 'osm',
      'source-layer': 'transportation',
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
      source: 'osm',
      'source-layer': 'transportation',
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
      source: 'osm',
      'source-layer': 'place',
      filter: ['==', ['get', 'class'], 'city'],
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Bold'],
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
    // Town/village labels
    {
      id: 'place-label-town',
      type: 'symbol',
      source: 'osm',
      'source-layer': 'place',
      filter: ['match', ['get', 'class'], ['town', 'village', 'suburb'], true, false],
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Regular'],
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
      source: 'osm',
      'source-layer': 'transportation_name',
      minzoom: 14,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Regular'],
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
  ],
};

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
