import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Utensils, 
  Compass, 
  Train, 
  Hospital, 
  Wine, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  AlertCircle,
  Layers,
  Radio
} from 'lucide-react';
import { Hotel, NearbyPlace, AccessibilityCategory } from '../types';

declare global {
  interface Window {
    google: any;
  }
}

interface AccessibilityRadarProps {
  hotel: Hotel;
}

const CATEGORIES: {
  id: AccessibilityCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  { id: 'transit_station', label: 'MRT/LRT/Transjakarta', icon: Train, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'hospital', label: 'Rumah Sakit', icon: Hospital, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { id: 'shopping_mall', label: 'Shopping Mall', icon: Building2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'restaurant', label: 'Restaurant & Kuliner', icon: Utensils, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'tourist_attraction', label: 'Wisata', icon: Compass, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'bar_nightclub', label: 'Bar/Lounge/Club', icon: Wine, color: 'text-purple-600 bg-purple-50 border-purple-200' },
];

export const AccessibilityRadar: React.FC<AccessibilityRadarProps> = ({ hotel }) => {
  const [activeCategory, setActiveCategory] = useState<AccessibilityCategory | 'all'>('all');
  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(2);
  const [mapError, setMapError] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const googleMapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);
  const hotelOverlayRef = useRef<any>(null);

  // Filter nearby places based on category and radius
  const filteredPlaces = hotel.nearbyPlaces.filter((place) => {
    const matchesCategory = activeCategory === 'all' || place.category === activeCategory;
    const matchesRadius = place.distanceKm <= selectedRadiusKm;
    return matchesCategory && matchesRadius;
  });

  // Attempt to initialize Google Maps JS API if API key is provided
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDIGLlr7zmbWLn9mhUXg7CzjRcDctbbxKY';
    if (!apiKey || typeof window === 'undefined') {
      setMapLoaded(false);
      return;
    }

    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initMap = () => {
      if (!window.google || !window.google.maps || !mapContainerRef.current) {
        setMapError(true);
        return;
      }

      try {
        const hotelPos = { lat: hotel.lat, lng: hotel.lng };
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: hotelPos,
          zoom: selectedRadiusKm <= 2 ? 15 : 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        googleMapInstance.current = map;
        infoWindowRef.current = new window.google.maps.InfoWindow();

        // Remove previous overlay if exists
        if (hotelOverlayRef.current) {
          hotelOverlayRef.current.setMap(null);
        }

        // Custom Circular Pin Overlay Class
        class CustomHotelPinOverlay extends window.google.maps.OverlayView {
          private position: { lat: number; lng: number };
          private logoUrl: string;
          private hotelName: string;
          private onClickHandler: () => void;
          private containerDiv: HTMLDivElement | null = null;

          constructor(
            position: { lat: number; lng: number },
            logoUrl: string,
            hotelName: string,
            onClickHandler: () => void
          ) {
            super();
            this.position = position;
            this.logoUrl = logoUrl;
            this.hotelName = hotelName;
            this.onClickHandler = onClickHandler;
          }

          onAdd() {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.cursor = 'pointer';
            div.style.transform = 'translate(-50%, -100%)';
            div.style.zIndex = '1000';
            div.title = this.hotelName;

            div.innerHTML = `
              <div style="position: relative; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 12px rgba(6,40,70,0.4)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <div style="width: 52px; height: 52px; border-radius: 9999px; background: #ffffff; border: 3px solid #062846; padding: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 2px #E7B84B;">
                  <img src="${this.logoUrl}" alt="${this.hotelName}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 9999px;" />
                </div>
                <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #062846; margin-top: -2px;"></div>
              </div>
            `;

            div.addEventListener('click', (e) => {
              e.stopPropagation();
              this.onClickHandler();
            });

            this.containerDiv = div;
            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(div);
          }

          draw() {
            const overlayProjection = this.getProjection();
            if (!overlayProjection || !this.containerDiv) return;

            const point = overlayProjection.fromLatLngToDivPixel(
              new window.google.maps.LatLng(this.position.lat, this.position.lng)
            );

            if (point) {
              this.containerDiv.style.left = point.x + 'px';
              this.containerDiv.style.top = point.y + 'px';
            }
          }

          onRemove() {
            if (this.containerDiv && this.containerDiv.parentNode) {
              this.containerDiv.parentNode.removeChild(this.containerDiv);
              this.containerDiv = null;
            }
          }
        }

        const openInfoWindow = () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.setPosition(hotelPos);
            infoWindowRef.current.setContent(
              `<div style="width: 220px; font-family: system-ui, -apple-system, sans-serif; border-radius: 10px; overflow: hidden; background: #ffffff;">` +
                `<div style="position: relative; width: 100%; height: 115px; overflow: hidden; background-color: #f1f5f9;">` +
                  `<img src="${hotel.coverImage}" alt="${hotel.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />` +
                  `<div style="position: absolute; top: 6px; right: 6px; background: rgba(6, 40, 70, 0.88); color: #ffffff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">` +
                    `${hotel.cityZone}` +
                  `</div>` +
                `</div>` +
                `<div style="padding: 10px 12px; text-align: left;">` +
                  `<div style="color: #f59e0b; font-size: 11px; margin-bottom: 3px;">` +
                    `${'★'.repeat(hotel.stars)}` +
                  `</div>` +
                  `<h4 style="margin: 0 0 4px 0; color: #062846; font-size: 13px; font-weight: 800; line-height: 1.3;">` +
                    `${hotel.name}` +
                  `</h4>` +
                  `<p style="margin: 0 0 8px 0; color: #66788A; font-size: 11px; line-height: 1.4;">` +
                    `${hotel.address}` +
                  `</p>` +
                  `<div style="border-top: 1px solid #f1f5f9; padding-top: 6px; margin-top: 4px; display: flex; justify-content: flex-end;">` +
                    `<a href="${hotel.officialUrl}" target="_blank" rel="noopener noreferrer" style="color: #1B6FAE; font-size: 11px; font-weight: 700; text-decoration: none;">` +
                      `Buka Website Resmi &rarr;` +
                    `</a>` +
                  `</div>` +
                `</div>` +
              `</div>`
            );
            infoWindowRef.current.open(map);
          }
        };

        if (hotel.logoUrl) {
          const overlay = new CustomHotelPinOverlay(hotelPos, hotel.logoUrl, hotel.name, openInfoWindow);
          overlay.setMap(map);
          hotelOverlayRef.current = overlay;
        } else {
          // Fallback standard circle marker
          const hotelMarker = new window.google.maps.Marker({
            position: hotelPos,
            map,
            title: hotel.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#062846',
              fillOpacity: 1,
              strokeColor: '#E7B84B',
              strokeWeight: 3
            },
            zIndex: 1000
          });
          hotelMarker.addListener('click', openInfoWindow);
        }

        // Radius circle
        new window.google.maps.Circle({
          strokeColor: '#1B6FAE',
          strokeOpacity: 0.8,
          strokeWeight: 1.5,
          fillColor: '#1B6FAE',
          fillOpacity: 0.08,
          map,
          center: hotelPos,
          radius: selectedRadiusKm * 1000
        });

        setMapLoaded(true);
        setMapError(false);
      } catch (err) {
        console.warn('Google Maps initialization error:', err);
        setMapError(true);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => setMapError(true);
      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
      initMap();
    }
  }, [hotel, selectedRadiusKm]);

  // Update markers when filtered places change
  useEffect(() => {
    if (!googleMapInstance.current || !window.google || !window.google.maps) return;

    // Clear previous markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    filteredPlaces.forEach((place) => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: googleMapInstance.current,
        title: place.name,
      });

      marker.addListener('click', () => {
        setSelectedPlace(place);
        if (infoWindowRef.current) {
          const placeMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.address}`)}`;
          infoWindowRef.current.setContent(
            `<div style="padding:4px; font-family:sans-serif; max-width:200px;">` +
            `<strong style="color:#062846; font-size:12px;">${place.name}</strong><br/>` +
            `<span style="color:#1B6FAE; font-size:11px; font-weight:bold;">${place.distanceKm} km (${place.walkingOrDriving})</span><br/>` +
            `<a href="${placeMapUrl}" target="_blank" rel="noopener noreferrer" style="color:#1B6FAE; font-size:11px; font-weight:bold; text-decoration:none;">Buka di Google Maps &rarr;</a>` +
            `</div>`
          );
          infoWindowRef.current.open(googleMapInstance.current, marker);
        }
      });

      markersRef.current.push(marker);
    });
  }, [filteredPlaces]);

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel.name}, ${hotel.address}`
  )}`;

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-xs overflow-hidden" id="hotel-accessibility-radar">
      {/* Header bar */}
      <div className="p-5 border-b border-[#DCE5ED] bg-[#F8FBFE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF7FF] text-[#1B6FAE] text-[11px] font-bold uppercase tracking-wider mb-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Google Maps POI Radar (Informasional)
            </div>
            <h3 className="font-bold text-lg text-[#062846]">
              Aksesibilitas di Sekitar {hotel.name}
            </h3>
            <p className="text-xs text-[#66788A] mt-0.5">
              Informasi ini membantu PIC memilih hotel dan mengevaluasi kedekatan fasilitas penting. (Bukan rencana perjalanan/itinerary).
            </p>
          </div>

          {/* Radius selector */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-semibold text-[#66788A]">Radius:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-white border border-[#DCE5ED]">
              {[1, 2, 3, 5].map((rad) => (
                <button
                  key={rad}
                  type="button"
                  onClick={() => setSelectedRadiusKm(rad)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    selectedRadiusKm === rad
                      ? 'bg-[#062846] text-white shadow-xs'
                      : 'text-[#66788A] hover:text-[#062846]'
                  }`}
                >
                  {rad} km
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeCategory === 'all'
                ? 'bg-[#062846] text-white shadow-xs'
                : 'bg-white text-[#66788A] border border-[#DCE5ED] hover:bg-slate-50'
            }`}
          >
            Semua Kategori ({hotel.nearbyPlaces.length})
          </button>

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = hotel.nearbyPlaces.filter((p) => p.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all border ${
                  isActive
                    ? 'bg-[#1B6FAE] text-white border-[#1B6FAE] shadow-xs'
                    : 'bg-white text-[#24364B] border-[#DCE5ED] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#1B6FAE]'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map + List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Map Container Column */}
        <div className="lg:col-span-7 h-72 sm:h-96 relative bg-slate-100 border-b lg:border-b-0 lg:border-r border-[#DCE5ED]">
          {/* Live Google Map container */}
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Fallback view if API offline or loading */}
          {(!mapLoaded || mapError) && (
            <div className="absolute inset-0 bg-[#062846]/5 backdrop-blur-2xs flex flex-col items-center justify-center p-6 text-center">
              {mapError ? (
                <div className="bg-white/95 p-4 rounded-xl border border-amber-200 shadow-md max-w-sm space-y-2">
                  <div className="flex items-center justify-center text-amber-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-[#062846]">
                    Informasi peta sementara tidak tersedia.
                  </p>
                  <p className="text-[11px] text-[#66788A]">
                    {hotel.address}
                  </p>
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#062846] text-white text-xs font-bold hover:bg-[#16324E] transition-colors w-full"
                  >
                    <span>Buka Lokasi di Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                /* Interactive Radar Visual Canvas when Maps JS loads or as simulation */
                <div className="space-y-3 bg-white/90 p-5 rounded-xl border border-[#DCE5ED] shadow-sm max-w-sm">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#EBF7FF] flex items-center justify-center text-[#1B6FAE]">
                    <Layers className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-xs font-bold text-[#062846]">
                    Google Maps Radar Aktif ({selectedRadiusKm} km)
                  </div>
                  <div className="text-[11px] text-[#66788A]">
                    Koordinat Hotel: {hotel.lat.toFixed(4)}, {hotel.lng.toFixed(4)}
                  </div>
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1B6FAE] hover:underline"
                  >
                    <span>Jelajahi Langsung di Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Quick Handoff Button Overlay */}
          <div className="absolute top-3 right-3 z-10">
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#062846] text-xs font-bold shadow-md border border-[#DCE5ED] transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#1B6FAE]" />
              <span>Buka Google Maps</span>
              <ExternalLink className="w-3 h-3 text-[#66788A]" />
            </a>
          </div>
        </div>

        {/* Nearby Points List Column */}
        <div className="lg:col-span-5 p-4 sm:p-5 max-h-96 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE5ED]">
            <span className="text-xs font-bold text-[#062846]">
              Destinasi Sekitar Terverifikasi ({filteredPlaces.length})
            </span>
            <span className="text-[11px] text-[#66788A]">
              Radius ≤ {selectedRadiusKm} km
            </span>
          </div>

          {filteredPlaces.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#66788A]">
              Belum ada lokasi yang ditemukan dalam radius ini.
            </div>
          ) : (
            filteredPlaces.map((place) => {
              const catMeta = CATEGORIES.find((c) => c.id === place.category) || CATEGORIES[0];
              const Icon = catMeta.icon;
              const isSelected = selectedPlace?.id === place.id;
              const placeMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${place.name} ${place.address}`
              )}`;

              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF7FF] border-[#1B6FAE] shadow-xs'
                      : 'bg-white border-[#DCE5ED] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${catMeta.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-[#062846] leading-tight">
                          {place.name}
                        </h5>
                        <p className="text-[11px] text-[#66788A] line-clamp-1 mt-0.5">
                          {place.address}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 text-xs font-black text-[#1B6FAE]">
                        <MapPin className="w-3 h-3" />
                        <span>{place.distanceKm} km</span>
                      </div>
                      <div className="text-[10px] text-[#66788A]">
                        {place.walkingOrDriving}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#66788A]">
                      Kategori: <strong className="text-[#24364B]">{place.categoryLabel}</strong>
                    </span>
                    <a
                      href={placeMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-bold text-[#1B6FAE] hover:underline"
                    >
                      <span>Rute Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer reassurance */}
      <div className="p-3 bg-[#F8FBFE] border-t border-[#DCE5ED] text-[11px] text-[#66788A] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>
          💡 <strong>Catatan:</strong> Informasi titik aksesibilitas bersumber dari Google Places API (New) untuk mendukung pemilihan akomodasi.
        </span>
        <span className="text-[10px] font-semibold text-[#062846] bg-white px-2 py-0.5 rounded border border-[#DCE5ED]">
          Bebas Dari Itinerary Otomatis
        </span>
      </div>
    </div>
  );
};
