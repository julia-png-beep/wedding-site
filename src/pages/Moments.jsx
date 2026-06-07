import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const base = import.meta.env.BASE_URL;

const pinIcon = L.divIcon({
  className: "",
  html: `<div class="pin-marker"><span class="pin-marker-dot"></span></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

const moments = [
  // Europe
  { lat: 47.05, lng: 8.31, img: `${base}Switzerland.jpg`, label: "Lucerne" },
  { lat: 48.35, lng: 15.5, img: `${base}Austria 2.jpg`, label: "Wachau" },
  { lat: 48.2082, lng: 16.3738, img: `${base}Vienna2.jpeg`, label: "Vienna" },
  { lat: 50.8503, lng: 4.3517, img: `${base}Brussels.jpg`, label: "Brussels" },
  { lat: 45.4384, lng: 10.9916, img: `${base}Florence.jpg`, label: "Verona" },
  { lat: 43.7696, lng: 11.2558, img: `${base}Florence2.jpg`, label: "Florence" },
  { lat: 45.4408, lng: 12.3155, img: `${base}Venice.jpg`, label: "Venice" },
  { lat: 46.4983, lng: 11.3548, img: `${base}Bolzano 2023.jpg`, label: "Dolomites" },
  { lat: 41.5938, lng: 1.8362, img: `${base}Montserrat.jpg`, label: "Montserrat" },
  { lat: 41.3851, lng: 2.1734, img: `${base}Barcelona 2017.jpg`, label: "Barcelona" },
  { lat: 64.1466, lng: -21.9426, img: `${base}Iceland2026.jpg`, label: "Reykjavik" },
  {
    lat: 64.9631,
    lng: -19.0208,
    youtube: "https://www.youtube.com/embed/wbqJqfYt2c4?autoplay=1&mute=1&loop=1&playlist=wbqJqfYt2c4",
    label: "Iceland",
  },

  // Australia & New Zealand
  { lat: -42.0, lng: 146.6, img: `${base}tassieproposal1.jpg`, label: "McGowans Falls" },
  { lat: -41.9, lng: 146.6, img: `${base}Hiking11.jpg`, label: "Central Plateau" },
  { lat: -41.6831, lng: 145.955, img: `${base}Cradle Mountain 2025.jpg`, label: "Cradle Mountain" },
  { lat: -24.255, lng: 131.55, img: `${base}Outback.jpg`, label: "Kings Canyon" },
  { lat: -12.6, lng: 132.95, img: `${base}Kakadu1.jpg`, label: "Kakadu National Park" },
  { lat: -44.6, lng: 167.9, img: `${base}NZ1.jpg`, label: "Milford Sound" },
  { lat: -16.7458, lng: 145.6717, img: `${base}palm.jpg`, label: "Palm Cove" },
  { lat: -28.2333, lng: 153.1667, img: `${base}Lamington.jpg`, label: "Lamington National Park" },
  { lat: -16.0833, lng: 145.45, img: `${base}Cape Trib 2021.jpg`, label: "Cape Tribulation" },
  { lat: -43.734, lng: 170.0963, img: `${base}HikeNZ.jpg`, label: "Mount Cook" },
  { lat: -17.7134, lng: 178.065, img: `${base}Fiji2024.jpg`, label: "Fiji" },
  { lat: 15.8801, lng: 108.338, img: `${base}Vietnam2024.jpg`, label: "Hoi An" },
  { lat: -36.4559, lng: 148.2669, video: `${base}snowys2024.mp4`, label: "Snowy Mountains" },
  { lat: -33.7, lng: 150.3, img: `${base}Blue Mountains hike 2017.jpg`, label: "Blue Mountains" },
  { lat: -33.8688, lng: 151.2093, img: `${base}Sydney.jpg`, label: "Sydney" },
  { lat: -35.45, lng: 150.15, img: `${base}Budawang.jpg`, label: "Budawang National Park" },
  {
    lat: -41.85,
    lng: 146.4,
    youtube: "https://www.youtube.com/embed/9jV7_wfMm8s?autoplay=1&mute=1&loop=1&playlist=9jV7_wfMm8s",
    label: "Walls of Jerusalem",
  },
  { lat: -20.3417, lng: 148.9521, img: `${base}Hamilton2022.jpeg`, label: "Hamilton Island" },
];

function FitToMoments({ moments }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(moments.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, moments]);

  return null;
}

export default function Moments() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const urls = moments.map((m) => m.img).filter(Boolean);

    let cancelled = false;
    let index = 0;

    function preloadNext() {
      if (cancelled || index >= urls.length) return;
      const img = new Image();
      img.src = urls[index++];
      img.onload = img.onerror = () => {
        const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        schedule(preloadNext);
      };
    }

    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    schedule(preloadNext);

    return () => {
      cancelled = true;
    };
  }, []);

  function handlePinHover(e, pin) {
    const cardWidth = 340;
    const cardHeight = 360;
    const padding = 20;

    const sourceEvent = e.originalEvent || e;
    let x = sourceEvent.clientX + 18;
    let y = sourceEvent.clientY;

    if (x + cardWidth > window.innerWidth - padding) {
      x = sourceEvent.clientX - cardWidth - 18;
    }

    if (y - cardHeight / 2 < padding) {
      y = padding + cardHeight / 2;
    }

    if (y + cardHeight / 2 > window.innerHeight - padding) {
      y = window.innerHeight - padding - cardHeight / 2;
    }

    setSelectedPin(pin);
    setCardPos({ x, y });
  }

  return (
    <main className="container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap');

        .map-section-title {
          text-align: center;
          font-family: "Cormorant Garamond", serif;
          font-size: 2.8rem;
          margin-bottom: 30px;
          color: #2c3e50;
        }

        .map-intro {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 45px auto;
          line-height: 1.9;
          color: #5a636e;
          font-size: 1.05rem;
        }

        .map-wrapper {
          position: relative;
          width: 95%;
          max-width: 1200px;
          height: 640px;
          margin: 0 auto 80px auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .moments-leaflet {
          width: 100%;
          height: 100%;
          background: #eef3f6;
          font-family: "Cormorant Garamond", serif;
        }

        .pin-marker {
          position: relative;
          width: 22px;
          height: 22px;
          background: #7b4f3f;
          border: 2px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 3px 8px rgba(0,0,0,0.25), 0 0 0 0 rgba(123,79,63,0.35);
          animation: pulse 4s infinite;
          transition: transform 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }

        .pin-marker-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .leaflet-marker-icon:hover .pin-marker {
          transform: rotate(-45deg) scale(1.15);
          background: #5e3b2f;
        }

        @keyframes pulse {
          0% { box-shadow: 0 3px 8px rgba(0,0,0,0.25), 0 0 0 0 rgba(123,79,63,0.45); }
          70% { box-shadow: 0 3px 8px rgba(0,0,0,0.25), 0 0 0 14px rgba(123,79,63,0); }
          100% { box-shadow: 0 3px 8px rgba(0,0,0,0.25), 0 0 0 0 rgba(123,79,63,0); }
        }

        .hover-memory-card {
          position: fixed;
          width: 320px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.18);
          z-index: 9999;
          pointer-events: none;
          transform: translate(0, -50%);
        }

        .hover-memory-card .memory-image {
          height: 190px;
          background: #f7f3ee;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hover-memory-card .memory-image img,
        .hover-memory-card .memory-image video,
        .hover-memory-card .memory-image iframe {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          border: 0;
        }

        .memory-content {
          padding: 0;
        }

        .memory-title {
          font-family: "Cormorant Garamond", serif;
          font-size: 1.65rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #2c3e50;
          text-align: center;
          padding: 22px 18px;
        }

        @media (max-width: 768px) {
          .map-section-title {
            font-size: 2.3rem;
          }

          .map-wrapper {
            width: 100%;
            height: 480px;
            border-radius: 14px;
          }

          .hover-memory-card {
            position: fixed;
            left: 15px !important;
            right: 15px;
            bottom: 15px;
            top: auto !important;
            transform: none;
            width: auto;
            z-index: 9999;
          }
        }
      `}</style>

      <h2 className="map-section-title">
        A few places we've explored together
      </h2>

      <p className="map-intro">
        Some favourite places from the last ten years of travelling, hiking,
        getting lost and occasionally surviving questionable camping weather.
        Zoom and drag around the map to explore.
      </p>

      <div className="map-wrapper">
        <MapContainer
          className="moments-leaflet"
          center={[20, 30]}
          zoom={2}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitToMoments moments={moments} />
          {moments.map((pin, i) => (
            <Marker
              key={i}
              position={[pin.lat, pin.lng]}
              icon={pinIcon}
              eventHandlers={{
                mouseover: (e) => handlePinHover(e, pin),
                mousemove: (e) => handlePinHover(e, pin),
                mouseout: () => setSelectedPin(null),
                click: (e) => handlePinHover(e, pin),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {selectedPin && (
        <div
          className="hover-memory-card"
          style={{
            left: `${cardPos.x}px`,
            top: `${cardPos.y}px`,
          }}
        >
          <div className="memory-image">
            {selectedPin.youtube ? (
              <iframe
                src={selectedPin.youtube}
                title={selectedPin.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : selectedPin.video ? (
              <video
                src={selectedPin.video}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            ) : (
              <img src={selectedPin.img} alt={selectedPin.label} />
            )}
          </div>

          <div className="memory-content">
            <div className="memory-title">{selectedPin.label}</div>
          </div>
        </div>
      )}
    </main>
  );
}
