import React, { useState } from "react";
import worldMap from "../map.jpg";

const base = import.meta.env.BASE_URL;

export default function Moments() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const pins = [
    { top: "39.5%", left: "14%", img: `${base}Switzerland.jpg`, label: "Switzerland" },
    { top: "39.4%", left: "17%", img: `${base}Vienna christmas 2018.jpg`, label: "Vienna" },
    { top: "35.3%", left: "15.5%", img: `${base}Brussels.jpg`, label: "Belgium" },
    { top: "44.3%", left: "17%", img: `${base}Florence.jpg`, label: "Tuscany" },
    { top: "42.5%", left: "16.3%", img: `${base}Venice.jpg`, label: "Venice" },
    { top: "41.3%", left: "15.6%", img: `${base}Bolzano 2023.jpg`, label: "Dolomites" },
    { top: "44.3%", left: "10.6%", img: `${base}Barcelona 2017.jpg`, label: "Barcelona" },
    { top: "92%", left: "72.5%", img: `${base}tassieproposal1.jpg`, label: "McGowans Falls" },
    { top: "92.6%", left: "73.5%", img: `${base}Hiking11.jpg`, label: "Walls of Jerusalem" },
    { top: "93.8%", left: "72.5%", img: `${base}Cradle Mountain 2025.jpg`, label: "Cradle Mountain" },
    { top: "81%", left: "67.5%", img: `${base}Outback.jpg`, label: "Kings Canyon" },
    { top: "74.8%", left: "68.3%", img: `${base}Kakadu1.jpg`, label: "Kakadu National Park" },
    { top: "96%", left: "82.5%", img: `${base}NZ1.jpg`, label: "Milford Sound" },
    { top: "80%", left: "74.5%", img: `${base}palm.jpg`, label: "Palm Cove" },
    { top: "77%", left: "72.5%", img: `${base}Cape Trib 2021.jpg`, label: "Cape Tribulation" },
    { top: "23%", left: "2.5%", img: `${base}Iceland2026.jpg`, label: "Reykjavik" },
    { top: "93.8%", left: "83.5%", img: `${base}HikeNZ.jpg`, label: "Mount Cook" },
    { top: "77%", left: "86.5%", img: `${base}Fiji2024.jpg`, label: "Fiji" },
    { top: "61%", left: "56.5%", img: `${base}Vietnam2024.jpg`, label: "Vietnam" },
    { top: "87.5%", left: "73%", video: `${base}snowys2024.mp4`, label: "Snowy Mountains" },
    { top: "86%", left: "74.5%", img: `${base}Blue Mountains hike 2017.jpg`, label: "Blue Mountains" },
    { top: "55%", left: "34.5%", img: `${base}qatar 2021 covid.jpg`, label: "One of many flights through Doha" },
    {
      top: "21%",
      left: "4.5%",
      youtube: "https://www.youtube.com/embed/wbqJqfYt2c4?autoplay=1&mute=1&loop=1&playlist=wbqJqfYt2c4",
      label: "Iceland",
    },
    { top: "84%", left: "76.5%", img: `${base}Hamilton2022.jpeg`, label: "Hamilton Island" },
  ];

  function handlePinHover(e, pin) {
    const cardWidth = 340;
    const cardHeight = 360;
    const padding = 20;

    let x = e.clientX + 18;
    let y = e.clientY;

    if (x + cardWidth > window.innerWidth - padding) {
      x = e.clientX - cardWidth - 18;
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

        .proposal-section {
          max-width: 900px;
          margin: 60px auto;
          text-align: center;
          padding: 0 20px;
        }

        .proposal-image-wrapper {
          width: 100%;
          max-width: 700px;
          margin: 0 auto 30px auto;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .proposal-image-wrapper img {
          width: 100%;
          display: block;
        }

        .proposal-text h1 {
          font-family: "Cormorant Garamond", serif;
          font-size: 3rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .proposal-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #5a636e;
        }

        .map-section-title {
          text-align: center;
          font-family: "Cormorant Garamond", serif;
          font-size: 2.8rem;
          margin-bottom: 30px;
          color: #2c3e50;
        }

        .map-wrapper {
          position: relative;
          width: 95%;
          max-width: 1100px;
          margin: 0 auto 100px auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .map-bg {
          width: 100%;
          display: block;
        }

        .map-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 10;
        }

        .pin-dot {
          position: relative;
          width: 8px;
          height: 8px;
          background: #7b4f3f;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 0 0 0 rgba(123,79,63,0.22);
          animation: pulse 4s infinite;
          transition: transform 0.2s ease;
        }

        .pin-dot::after {
          content: "";
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          top: 2.5px;
          left: 2.5px;
        }

        .map-pin:hover .pin-dot {
          transform: rotate(-45deg) scale(1.08);
          background: #5e3b2f;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(123,79,63,0.5); }
          70% { box-shadow: 0 0 0 12px rgba(123,79,63,0); }
          100% { box-shadow: 0 0 0 0 rgba(123,79,63,0); }
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

      <section className="proposal-section">
        <div className="proposal-image-wrapper">
          <img src={`${base}tassieproposal1.jpg`} alt="Proposal" />
        </div>

        <div className="proposal-text">
          <h1>The Proposal</h1>
          <p>
            On a crisp morning in Tasmania, surrounded by wild landscapes and
            silence, we decided on forever.
          </p>
        </div>
      </section>

      <h2 className="map-section-title">
        Our Global Footprint over the years
      </h2>

      <div className="map-wrapper" onClick={() => setSelectedPin(null)}>
        <img src={worldMap} alt="World Map" className="map-bg" />

        {pins.map((pin, i) => (
          <div
            key={i}
            className="map-pin"
            style={{
              top: pin.top,
              left: pin.left,
            }}
            onMouseEnter={(e) => handlePinHover(e, pin)}
            onMouseMove={(e) => handlePinHover(e, pin)}
            onMouseLeave={() => setSelectedPin(null)}
            onClick={(e) => {
              e.stopPropagation();
              handlePinHover(e, pin);
            }}
          >
            <div className="pin-dot"></div>
          </div>
        ))}
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