'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface GridElement {
  id: string;
  name: string;
  type: 'substation' | 'transformer' | 'line' | 'consumer';
  lat: number;
  lng: number;
  status: 'normal' | 'warning' | 'critical';
  details?: string;
}

const gridElements: GridElement[] = [
  { id: 'sub-1', name: 'Main Substation', type: 'substation', lat: 51.505, lng: -0.09, status: 'normal', details: 'Capacity: 500MW' },
  { id: 'sub-2', name: 'North District', type: 'substation', lat: 51.515, lng: -0.1, status: 'normal', details: 'Capacity: 250MW' },
  { id: 'sub-3', name: 'South District', type: 'substation', lat: 51.495, lng: -0.08, status: 'normal', details: 'Capacity: 300MW' },
  { id: 'trans-1', name: 'Transformer T-12', type: 'transformer', lat: 51.51, lng: -0.095, status: 'warning', details: 'Temperature: 78°C' },
  { id: 'trans-2', name: 'Transformer T-15', type: 'transformer', lat: 51.508, lng: -0.085, status: 'normal', details: 'Temperature: 62°C' },
  { id: 'line-1', name: 'Line L-14', type: 'line', lat: 51.512, lng: -0.092, status: 'normal', details: 'Load: 45%' },
  { id: 'line-2', name: 'Line L-15', type: 'line', lat: 51.502, lng: -0.088, status: 'normal', details: 'Load: 38%' },
  { id: 'cons-1', name: 'Industrial Zone A', type: 'consumer', lat: 51.52, lng: -0.105, status: 'normal', details: 'Demand: 45MW' },
  { id: 'cons-2', name: 'Commercial Hub', type: 'consumer', lat: 51.498, lng: -0.075, status: 'normal', details: 'Demand: 28MW' },
  { id: 'cons-3', name: 'Residential Complex', type: 'consumer', lat: 51.505, lng: -0.11, status: 'warning', details: 'Demand: 15MW' },
];

interface GridMapProps {
  onElementClick?: (element: GridElement) => void;
}

const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

export default function GridMap({ onElementClick }: GridMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getTileUrl = (themeValue: string | undefined) => {
    if (themeValue === 'dark') return DARK_TILES;
    if (themeValue === 'light') return LIGHT_TILES;
    return LIGHT_TILES;
  };

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    let mounted = true;

    const initMap = async () => {
      if (!mounted || !mapRef.current) return;

      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      const currentTileUrl = getTileUrl(theme);
      const tileLayer = L.tileLayer(currentTileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      });
      
      tileLayer.addTo(map);
      tileLayerRef.current = tileLayer;

      const getIcon = (type: string, status: string) => {
        const color = status === 'critical' ? '#EF4444' : status === 'warning' ? '#F59E0B' : '#10B981';
        
        if (type === 'substation') {
          return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background:${color};width:20px;height:20px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                   </div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
        }
        if (type === 'transformer') {
          return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background:${color};width:16px;height:16px;border-radius:3px;border:2px solid white;display:flex;align-items:center;justify-content:center;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
                   </div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
        }
        if (type === 'line') {
          return L.divIcon({
            className: 'custom-icon',
            html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });
        }
        return L.divIcon({
          className: 'custom-icon',
          html: `<div style="background:${color};width:14px;height:14px;border-radius:2px;border:2px solid white;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
      };

      gridElements.forEach((element) => {
        const marker = L.marker([element.lat, element.lng], {
          icon: getIcon(element.type, element.status),
        }).addTo(map);

        const popupContent = `
          <div style="min-width: 150px;">
            <strong style="font-size: 14px;">${element.name}</strong><br/>
            <span style="color: #666; font-size: 12px;">${element.type}</span><br/>
            <span style="color: ${element.status === 'critical' ? '#EF4444' : element.status === 'warning' ? '#F59E0B' : '#10B981'}; font-size: 12px;">
              ${element.status.toUpperCase()}
            </span><br/>
            <span style="font-size: 12px; color: #888;">${element.details}</span>
          </div>
        `;
        marker.bindPopup(popupContent);

        marker.on('click', () => {
          onElementClick?.(element);
        });
      });

      const lines: [number, number][][] = [
        [[51.505, -0.09], [51.515, -0.1]],
        [[51.505, -0.09], [51.495, -0.08]],
        [[51.515, -0.1], [51.52, -0.105]],
        [[51.495, -0.08], [51.498, -0.075]],
      ];

      lines.forEach((lineCoords, i) => {
        L.polyline(lineCoords, {
          color: i < 2 ? '#10B981' : '#3B82F6',
          weight: 3,
          opacity: 0.7,
        }).addTo(map);
      });
    };

    initMap();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !mapInstanceRef.current || !tileLayerRef.current) return;

    const L = require('leaflet');
    const newTileUrl = getTileUrl(theme);
    
    tileLayerRef.current.setUrl(newTileUrl);
  }, [isClient, theme]);

  if (!isClient) {
    return (
      <div ref={mapRef} className="w-full h-full min-h-[500px] rounded-lg bg-muted animate-pulse" />
    );
  }

  return (
    <div ref={mapRef} className="w-full h-full min-h-[500px] rounded-lg" style={{ zIndex: 0 }} />
  );
}
