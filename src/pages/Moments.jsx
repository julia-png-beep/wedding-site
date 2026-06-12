import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const base = import.meta.env.BASE_URL;

const pinIcon = L.divIcon({
  className: "",
  html: `<div class="pin-marker"><span class="pin-marker-dot"></span></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -24],
});

const activePinIcon = L.divIcon({
  className: "",
  html: `<div class="pin-marker pin-marker-active"><span class="pin-marker-dot"></span></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -24],
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
  { lat: 48.3779, lng: 15.4730, img: `${base}AggsteinCastle.jpg`, label: "Aggstein Castle" },
  { lat: 45.4593, lng: 12.3536, img: `${base}Murano.jpg`, label: "Murano" },
  { lat: 47.3769, lng: 8.5417, img: `${base}Zurich.jpg`, label: "Zurich" },

  // Middle East
  { lat: 25.2854, lng: 51.5310, img: `${base}Doha2.jpg`, label: "Doha" },
  { lat: 24.4539, lng: 54.3773, img: `${base}AbuDhabi.jpg`, label: "Abu Dhabi" },

  // Australia & New Zealand
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
  { lat: -25.3444, lng: 131.0369, img: `${base}Uluru2.jpg`, label: "Uluru" },
  { lat: -42.6817, lng: 146.7186, img: `${base}RussellFalls.jpg`, label: "Mount Field National Park" },
  { lat: -42.65, lng: 148.0833, img: `${base}MariaIsland.jpg`, label: "Maria Island" },
  { lat: -40.8667, lng: 145.4833, img: `${base}RockyCape.jpg`, label: "Rocky Cape National Park" },
  { lat: -41.7986, lng: 145.4569, img: `${base}MontezumaFalls.jpg`, label: "Montezuma Falls" },
  { lat: -41.65, lng: 145.65, img: `${base}MountRagoona.jpg`, label: "Mount Ragoona" },
  { lat: -16.4845, lng: 145.4654, img: `${base}PortDouglas.jpg`, label: "Port Douglas" },
  { lat: -33.7167, lng: 150.3333, img: `${base}MountSolitary.jpg`, label: "Mount Solitary" },
  { lat: -32.75, lng: 151.3, img: `${base}HunterValley.jpg`, label: "Hunter Valley" },
  { lat: -37.8136, lng: 144.9631, img: `${base}Melbourne2016.jpg`, label: "Melbourne" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth <= 768;
}

function MapRefCapture({ mapRef }) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  return null;
}

function FitToMoments({ moments }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(moments.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, moments]);

  return null;
}

function FlyToMoment({ moment }) {
  const map = useMap();

  useEffect(() => {
    if (!moment) return;
    map.flyTo([moment.lat, moment.lng], 6, { duration: 1.1 });
  }, [map, moment]);

  return null;
}

function clusterIcon(cluster) {
  const count = cluster.getChildCount();
  return L.divIcon({
    html: `<div class="cluster-marker"><span>${count}</span></div>`,
    className: "",
    iconSize: [36, 36],
  });
}

function ClusteredMarkers({ moments, onSelect, onDeselect }) {
  const map = useMap();

  useEffect(() => {
    const group = L.markerClusterGroup({
      iconCreateFunction: clusterIcon,
      maxClusterRadius: 18,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
    });

    let hideTimer = null;

    function cancelHide() {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    }

    function scheduleHide() {
      cancelHide();
      hideTimer = setTimeout(() => {
        onDeselect();
        hideTimer = null;
      }, 80);
    }

    moments.forEach((moment) => {
      const marker = L.marker([moment.lat, moment.lng], { icon: pinIcon });
      marker.on("mouseover", (e) => {
        cancelHide();
        onSelect(e, moment);
      });
      marker.on("mousemove", (e) => {
        cancelHide();
        onSelect(e, moment);
      });
      marker.on("mouseout", scheduleHide);
      marker.on("click", (e) => onSelect(e, moment));
      group.addLayer(marker);
    });

    map.addLayer(group);
    map.on("mouseout", scheduleHide);
    map.getContainer().addEventListener("mouseleave", scheduleHide);

    return () => {
      cancelHide();
      map.off("mouseout", scheduleHide);
      map.getContainer().removeEventListener("mouseleave", scheduleHide);
      map.removeLayer(group);
    };
  }, [map, moments, onSelect, onDeselect]);

  return null;
}

function MomentMarker({ moment, active, onSelect, onDeselect }) {
  return (
    <Marker
      position={[moment.lat, moment.lng]}
      icon={active ? activePinIcon : pinIcon}
      eventHandlers={{
        mouseover: (e) => onSelect(e, moment),
        mousemove: (e) => onSelect(e, moment),
        mouseout: onDeselect,
        click: (e) => onSelect(e, moment),
      }}
    />
  );
}

function MemoryMedia({ moment }) {
  if (moment.youtube) {
    return (
      <iframe
        src={moment.youtube}
        title={moment.label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (moment.video) {
    return <video src={moment.video} autoPlay muted loop playsInline controls />;
  }
  return <img src={moment.img} alt={moment.label} loading="lazy" />;
}

export default function Moments() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(isMobileViewport());
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const [shuffledMoments] = useState(() => shuffle(moments));
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem("momentsSwiped")
  );
  const carouselRef = useRef(null);
  const desktopMapRef = useRef(null);

  const handleResetView = useCallback(() => {
    const map = desktopMapRef.current;
    if (!map) return;
    const bounds = L.latLngBounds(moments.map((m) => [m.lat, m.lng]));
    map.flyToBounds(bounds, { padding: [40, 40] });
  }, []);

  const scrollRaf = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileViewport());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = useCallback(function handleSelect(e, moment) {
    const sourceEvent = e.originalEvent || e;
    const cardWidth = 640;
    const cardHeight = 680;
    const padding = 20;

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

    setSelectedMoment(moment);
    setCardPos({ x, y });
  }, []);

  const handleDeselect = useCallback(function handleDeselect() {
    setSelectedMoment(null);
  }, []);

  const scrollToIndex = useCallback(function scrollToIndex(i) {
    setActiveIndex(i);
    const el = carouselRef.current;
    if (el) {
      el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    }
  }, []);

  function handleCarouselScroll() {
    if (showSwipeHint) {
      setShowSwipeHint(false);
      sessionStorage.setItem("momentsSwiped", "1");
    }
    if (scrollRaf.current) clearTimeout(scrollRaf.current);
    scrollRaf.current = setTimeout(() => {
      const el = carouselRef.current;
      if (!el) return;
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex((prev) => (prev === index ? prev : index));
    }, 120);
  }

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

  const activeMoment = shuffledMoments[activeIndex];

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
          z-index: 0;
          width: 95%;
          max-width: 1200px;
          height: 640px;
          margin: 0 auto 80px auto;
          background: #eef0e9;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          border: 1px solid rgba(123,79,63,0.15);
          isolation: isolate;
        }

        .map-reset-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(123,79,63,0.25);
          background: rgba(255,250,244,0.92);
          color: #5e3b2f;
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .map-reset-btn:hover {
          background: #fffaf4;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .map-reset-btn {
            display: none;
          }
        }

        .moments-leaflet {
          width: 100%;
          height: 100%;
          background: #eef0e9;
          font-family: "Cormorant Garamond", serif;
        }

        /* Hand-drawn / illustrated wash over the base map tiles */
        .moments-leaflet .leaflet-tile-pane {
          filter: sepia(38%) saturate(78%) hue-rotate(-6deg) brightness(1.06) contrast(0.92);
        }

        .moments-leaflet::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 450;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10), transparent 60%),
            repeating-linear-gradient(
              45deg,
              rgba(123,79,63,0.025) 0px,
              rgba(123,79,63,0.025) 2px,
              transparent 2px,
              transparent 6px
            );
          mix-blend-mode: multiply;
        }

        .pin-marker {
          position: relative;
          width: 22px;
          height: 22px;
          background: #7b4f3f;
          border: 2px solid #fbf7f1;
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
          background: #fbf7f1;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .cluster-marker {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #7b4f3f;
          border: 3px solid #fbf7f1;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fbf7f1;
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: 1.05rem;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .cluster-marker:hover {
          transform: scale(1.1);
          background: #5e3b2f;
        }

        .pin-marker-active {
          background: #c9742f;
          transform: rotate(-45deg) scale(1.25);
          z-index: 1000;
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
          width: 640px;
          background: #fffaf4;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.2);
          z-index: 9999;
          pointer-events: none;
          transform: translate(0, -50%);
        }

        .hover-memory-card .memory-image {
          height: 380px;
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

        .hover-memory-card .memory-title {
          font-family: "Cormorant Garamond", serif;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #2c3e50;
          text-align: center;
          padding: 16px 16px;
        }

        /* ===== Mobile: fullscreen map + carousel ===== */
        .mobile-moments {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          flex-direction: column;
          background: #eef0e9;
        }

        .mobile-back {
          position: absolute;
          top: calc(14px + env(safe-area-inset-top));
          right: calc(14px + env(safe-area-inset-right));
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          border-radius: 999px;
          border: 0;
          background: rgba(44,62,80,0.6);
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          backdrop-filter: blur(4px);
        }

        .mobile-moments .mobile-map {
          position: relative;
          flex: 0 0 56%;
          z-index: 0;
          isolation: isolate;
        }

        .mobile-moments .mobile-map .moments-leaflet {
          width: 100%;
          height: 100%;
        }

        .mobile-carousel {
          flex: 1;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-carousel-card {
          flex: 0 0 100%;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          padding: 10px 16px 16px;
        }

        .mobile-carousel-card .memory-image {
          position: relative;
          flex: 1;
          min-height: 0;
          background: #f7f3ee;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-carousel-card .memory-image img,
        .mobile-carousel-card .memory-image video,
        .mobile-carousel-card .memory-image iframe {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          border: 0;
        }

        .mobile-carousel-card .memory-title {
          flex-shrink: 0;
          font-family: "Cormorant Garamond", serif;
          font-size: 1.4rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #2c3e50;
          text-align: center;
          padding: 10px 8px 0;
        }

        @media (max-width: 768px) {
          .map-section-title,
          .map-intro,
          .map-wrapper {
            display: none;
          }
        }

        .swipe-hint {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0,0,0,0.32);
          color: #fff;
          font-size: 1.2rem;
          line-height: 1;
          pointer-events: none;
          z-index: 5;
          animation: swipeHintFade 2.6s ease-in-out infinite;
        }

        .swipe-hint.left {
          left: 10px;
          animation-name: swipeHintFadeLeft;
        }

        .swipe-hint.right {
          right: 10px;
          animation-name: swipeHintFadeRight;
        }

        @keyframes swipeHintFadeRight {
          0%, 100% { opacity: 0.55; transform: translate(0, -50%); }
          50% { opacity: 1; transform: translate(4px, -50%); }
        }

        @keyframes swipeHintFadeLeft {
          0%, 100% { opacity: 0.55; transform: translate(0, -50%); }
          50% { opacity: 1; transform: translate(-4px, -50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .swipe-hint {
            animation: none;
          }
        }
      `}</style>

      <h2 className="map-section-title">
        A few places we've explored together
      </h2>

      <p className="map-intro">
        Some favourite places from the last ten years of travelling, hiking,
        getting lost and occasionally surviving questionable camping weather.
        Zoom and drag around the map to explore — tap a pin to see the memory.
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
          <MapRefCapture mapRef={desktopMapRef} />
          <ClusteredMarkers moments={moments} onSelect={handleSelect} onDeselect={handleDeselect} />
        </MapContainer>

        <button className="map-reset-btn" onClick={handleResetView}>
          ⤢ Reset view
        </button>
      </div>

      {selectedMoment && (
        <div
          className="hover-memory-card"
          style={{ left: `${cardPos.x}px`, top: `${cardPos.y}px` }}
        >
          <div className="memory-image">
            <MemoryMedia moment={selectedMoment} />
          </div>
          <div className="memory-title">{selectedMoment.label}</div>
        </div>
      )}

      {isMobile && (
        <div className="mobile-moments">
          <button className="mobile-back" aria-label="Back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="mobile-map">
            <MapContainer
              className="moments-leaflet"
              center={[activeMoment.lat, activeMoment.lng]}
              zoom={6}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyToMoment moment={activeMoment} />
              {shuffledMoments.map((moment, i) => (
                <MomentMarker
                  key={i}
                  moment={moment}
                  active={i === activeIndex}
                  onSelect={() => scrollToIndex(i)}
                  onDeselect={() => {}}
                />
              ))}
            </MapContainer>
          </div>

          <div className="mobile-carousel" ref={carouselRef} onScroll={handleCarouselScroll}>
            {shuffledMoments.map((moment, i) => (
              <div className="mobile-carousel-card" key={i}>
                <div className="memory-image">
                  <MemoryMedia moment={moment} />
                  {i === 0 && showSwipeHint && (
                    <>
                      <div className="swipe-hint left" aria-hidden>‹</div>
                      <div className="swipe-hint right" aria-hidden>›</div>
                    </>
                  )}
                </div>
                <div className="memory-title">{moment.label}</div>
              </div>
            ))}
          </div>

        </div>
      )}
    </main>
  );
}
