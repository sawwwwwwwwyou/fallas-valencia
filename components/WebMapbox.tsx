import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FALLAS_MAPLIBRE_STYLE, INITIAL_VIEW_STATE } from '../lib/maplibre-fallas-style';

export interface FallaMarker {
  id: string;
  name: string;
  district: string;
  category: 'special' | 'firstA' | 'firstB' | 'second';
  latitude: number;
  longitude: number;
  image?: string;
}

interface WebMapboxProps {
  markers: FallaMarker[];
  onMarkerClick?: (marker: FallaMarker) => void;
  selectedMarkerId?: string | null;
  showUserLocation?: boolean;
}

// Create fire marker HTML element
function createFireMarkerElement(marker: FallaMarker, isSelected: boolean): HTMLDivElement {
  const el = document.createElement('div');
  const isSpecial = marker.category === 'special';

  el.className = 'fallas-marker';
  el.innerHTML = `
    <div class="fire-marker ${isSpecial ? 'special' : ''} ${isSelected ? 'selected' : ''}">
      ${isSelected ? '<div class="marker-selected-ring"></div><div class="marker-selected-ring delay"></div>' : ''}
      <div class="marker-body">
        <span class="marker-icon">🔥</span>
      </div>
      <div class="marker-tail"></div>
    </div>
  `;

  return el;
}

// Create user location marker
function createUserLocationElement(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = 'user-location-marker';
  el.innerHTML = `
    <div class="user-pulse"></div>
    <div class="user-dot"></div>
  `;
  return el;
}

export default function WebMapbox({
  markers,
  onMarkerClick,
  selectedMarkerId,
  showUserLocation = true,
}: WebMapboxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: FALLAS_MAPLIBRE_STYLE,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      attributionControl: false,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Handle markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current.clear();

    // Add new markers
    markers.forEach(marker => {
      const el = createFireMarkerElement(marker, selectedMarkerId === marker.id);

      el.addEventListener('click', () => {
        onMarkerClick?.(marker);

        // Fly to marker
        map.current?.flyTo({
          center: [marker.longitude, marker.latitude],
          zoom: 15,
          duration: 1000,
        });
      });

      const mapMarker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map.current!);

      markersRef.current.set(marker.id, mapMarker);
    });
  }, [markers, selectedMarkerId, mapLoaded, onMarkerClick]);

  // Handle user location
  useEffect(() => {
    if (!map.current || !mapLoaded || !showUserLocation) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Remove old user marker
          userMarkerRef.current?.remove();

          // Add new user marker
          const el = createUserLocationElement();
          userMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'center' })
            .setLngLat([longitude, latitude])
            .addTo(map.current!);
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, [mapLoaded, showUserLocation]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: '#0D0D0D'
    }}>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '100%',
          opacity: mapLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out', // Smoother fade-in
          zIndex: 1
        }}
      />

      {/* Loading Overlay with transition */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D0D0D',
        zIndex: 10,
        opacity: mapLoaded ? 0 : 1, // Fade out
        transition: 'opacity 0.8s ease-in-out',
        pointerEvents: mapLoaded ? 'none' : 'auto',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🗺️</div>
        <div style={{
          color: 'rgba(255,107,53,0.8)',
          fontSize: 14,
          fontWeight: '700',
          letterSpacing: 2,
          textTransform: 'uppercase'
        }}>
          Cargando mapa
        </div>
      </div>

      {/* Inject styles */}
      <style>{`
        .fallas-marker {
          cursor: pointer;
        }
        
        .fire-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .marker-body {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6B35 0%, #E63946 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(230, 57, 70, 0.5), 0 0 20px rgba(255, 107, 53, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          z-index: 2;
        }
        
        .marker-tail {
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 12px solid #E63946;
          margin-top: -2px;
          filter: drop-shadow(0 2px 4px rgba(230, 57, 70, 0.5));
        }
        
        .fire-marker:hover .marker-body {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(230, 57, 70, 0.7), 0 0 30px rgba(255, 107, 53, 0.5);
        }
        
        .fire-marker.special .marker-body {
          border-color: #FFB800;
          box-shadow: 0 4px 16px rgba(255, 184, 0, 0.6), 0 0 30px rgba(255, 184, 0, 0.4);
          animation: fire-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes fire-glow {
          0% {
            box-shadow: 0 4px 16px rgba(255, 184, 0, 0.6), 0 0 30px rgba(255, 184, 0, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6);
          }
        }
        
        .fire-marker.selected .marker-body {
          transform: scale(1.15);
          box-shadow: 0 6px 24px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 184, 0, 0.6);
        }
        
        .marker-icon {
          font-size: 22px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          animation: flame-flicker 0.5s ease-in-out infinite alternate;
        }
        
        @keyframes flame-flicker {
          0% { transform: scale(1) rotate(-2deg); }
          100% { transform: scale(1.05) rotate(2deg); }
        }
        
        .marker-pulse {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255, 184, 0, 0.6);
          animation: ripple 2s linear infinite;
          z-index: 1;
          top: 22px; /* Center of marker body */
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        
        .marker-pulse.delay {
          animation-delay: 1s;
        }
        
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        
        .marker-selected-ring {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 184, 0, 0.4);
          animation: ring-ripple 3s linear infinite;
          z-index: 1;
          top: 22px;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        
        .marker-selected-ring.delay {
          animation-delay: 1.5s;
        }
        
        @keyframes ring-ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }
        
        /* User location styles */
        .user-location-marker {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .user-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
          z-index: 2;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .user-pulse {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          animation: user-pulse 2s ease-out infinite;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        @keyframes user-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        
        /* Map controls styling */
        .maplibregl-ctrl-group {
          background: rgba(26, 26, 26, 0.9) !important;
          border: 1px solid rgba(255, 107, 53, 0.3) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
        }
        
        .maplibregl-ctrl-group button {
          background-color: transparent !important;
          border-color: rgba(255, 107, 53, 0.2) !important;
        }
        
        .maplibregl-ctrl-group button:hover {
          background-color: rgba(255, 107, 53, 0.2) !important;
        }
        
        .maplibregl-ctrl-group button span {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(-10deg);
        }
        
        /* Attribution */
        .maplibregl-ctrl-attrib {
          background: rgba(0,0,0,0.5) !important;
          color: rgba(255,255,255,0.6) !important;
          font-size: 10px !important;
        }
        
        .maplibregl-ctrl-attrib a {
          color: rgba(255,255,255,0.6) !important;
        }
      `}</style>

      {/* Attribution overlay */}
      <div style={{
        position: 'absolute',
        bottom: 4,
        right: 4,
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
        padding: '2px 6px',
        background: 'rgba(0,0,0,0.6)',
        borderRadius: 4,
        pointerEvents: 'none',
      }}>
        © OpenFreeMap © OpenStreetMap
      </div>
    </div>
  );
}
