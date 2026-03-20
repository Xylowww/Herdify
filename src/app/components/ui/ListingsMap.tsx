import { useEffect, useRef } from 'react';
import { Listing } from '../../data/mockData';

interface ListingsMapProps {
  listings: Listing[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  height?: string;
}

declare global {
  interface Window {
    L: any;
  }
}

export function ListingsMap({ listings, selectedId, onSelect, height = '480px' }: ListingsMapProps) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically load Leaflet CSS if not already loaded
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Dynamically load Leaflet JS
    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (mapRef.current) return;

      const map = L.map(containerRef.current!, {
        center: [14.0998, 121.0583],
        zoom: 8,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = map;

      // Add markers
      listings.forEach((listing) => {
        const icon = L.divIcon({
          html: `
            <div style="
              background: ${listing.status === 'Available' ? '#2F6B3F' : listing.status === 'Reserved' ? '#C68A3A' : '#9CA3AF'};
              color: white;
              border-radius: 50% 50% 50% 0;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: 700;
              transform: rotate(-45deg);
              border: 2px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
              <span style="transform: rotate(45deg)">${listing.type.charAt(0)}</span>
            </div>
          `,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -34],
        });

        const formatPrice = (n: number) =>
          new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);

        const marker = L.marker([listing.location.lat, listing.location.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: Inter, system-ui, sans-serif; min-width: 180px;">
              <img src="${listing.photo}" alt="${listing.title}" style="width:100%;height:90px;object-fit:cover;border-radius:6px;margin-bottom:8px;" />
              <div style="font-size:12px;font-weight:600;color:#2F6B3F;margin-bottom:2px;">${listing.type} · ${listing.breed}</div>
              <div style="font-size:13px;font-weight:600;color:#1F2937;margin-bottom:4px;line-height:1.3;">${listing.title}</div>
              <div style="font-size:13px;font-weight:700;color:#C68A3A;">${formatPrice(listing.price)}/head</div>
              <div style="font-size:11px;color:#6B7280;margin-top:2px;">${listing.head} head(s) available</div>
              <a href="/listings/${listing.id}" style="display:block;margin-top:8px;padding:6px;background:#2F6B3F;color:white;text-align:center;border-radius:6px;text-decoration:none;font-size:12px;font-weight:600;">View Listing</a>
            </div>
          `);

        marker.on('click', () => {
          if (onSelect) onSelect(listing.id);
        });

        markersRef.current.push(marker);
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%' }}
      className="rounded-xl overflow-hidden border border-[#E2DDD5] z-0"
    />
  );
}
