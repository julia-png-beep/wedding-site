import React, { useState } from "react";

const base = import.meta.env.BASE_URL;

const europeMap = `${base}Europe.png`;
const australiaMap = `${base}Australia.png`;

export default function Moments() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const europePins = [
    { top: "65%", left: "42%", img: `${base}Switzerland.jpg`, label: "Lucerne" },
    { top: "62%", left: "50%", img: `${base}Austria 2.jpg`, label: "Wachau" },
       { top: "64%", left: "51%", img: `${base}Vienna2.jpeg`, label: "Vienna" },
 { top: "55%", left: "38%", img: `${base}Brussels.jpg`, label: "Brussels" },
    { top: "71%", left: "45%", img: `${base}Florence.jpg`, label: "Verona" },
    { top: "73%", left: "44.6%", img: `${base}Florence2.jpg`, label: "Florence" },
    { top: "69%", left: "46%", img: `${base}Venice.jpg`, label: "Venice" },
    { top: "66%", left: "46%", img: `${base}Bolzano 2023.jpg`, label: "Dolomites" },
    { top: "79%", left: "27.5%", img: `${base}Montserrat.jpg`, label: "Montserrat" },
    { top: "78%", left: "29%", img: `${base}Barcelona 2017.jpg`, label: "Barcelona" },
    { top: "14%", left: "15%", img: `${base}Iceland2026.jpg`, label: "Reykjavik" },
    {
      top: "14%",
      left: "20%",
      youtube:
        "https://www.youtube.com/embed/wbqJqfYt2c4?autoplay=1&mute=1&loop=1&playlist=wbqJqfYt2c4",
      label: "Iceland",
    },
   
  ];

  const australiaPins = [
    { top: "90.5%", left: "60.6%", img: `${base}tassieproposal1.jpg`, label: "McGowans Falls" },
    { top: "90.5%", left: "62.5%", img: `${base}Hiking11.jpg`, label: "Central Plateau" },
    { top: "93%", left: "61%", img: `${base}Cradle Mountain 2025.jpg`, label: "Cradle Mountain" },
    { top: "69%", left: "56%", img: `${base}Outback.jpg`, label: "Kings Canyon" },
    { top: "56%", left: "56%", img: `${base}Kakadu1.jpg`, label: "Kakadu National Park" },
    { top: "90%", left: "73%", img: `${base}NZ1.jpg`, label: "Milford Sound" },
    { top: "63%", left: "66%", img: `${base}palm.jpg`, label: "Palm Cove" },
    { top: "72%", left: "68%", img: `${base}Lamington.jpg`, label: "Lamington National Park" },
    { top: "58%", left: "64.6%", img: `${base}Cape Trib 2021.jpg`, label: "Cape Tribulation" },
    { top: "88%", left: "75%", img: `${base}HikeNZ.jpg`, label: "Mount Cook" },
    { top: "60%", left: "95%", img: `${base}Fiji2024.jpg`, label: "Fiji" },
    { top: "22%", left: "35%", img: `${base}Vietnam2024.jpg`, label: "Hoi An" },
    { top: "81%", left: "63%", video: `${base}snowys2024.mp4`, label: "Snowy Mountains" },
    { top: "77%", left: "65%", img: `${base}Blue Mountains hike 2017.jpg`, label: "Blue Mountains" },
      { top: "77%", left: "68%", img: `${base}Sydney.jpg`, label: "Sydney" },
        { top: "80%", left: "66%", img: `${base}Budawang.jpg`, label: "Budawang National Park" },
{
      top: "92.5%",
      left: "63%",
      youtube:
        "https://www.youtube.com/embed/9jV7_wfMm8s?autoplay=1&mute=1&loop=1&playlist=9jV7_wfMm8s",
      label: "Walls of Jerusalem",
    },
    { top: "67%", left: "69%", img: `${base}Hamilton2022.jpeg`, label: "Hamilton Island" },
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

  function TravelMap({ title, image, pins }) {
    return (
      <section className="map-block">
        <h3 className="map-subtitle">{title}</h3>

        <div className="map-wrapper" onClick={() => setSelectedPin(null)}>
          <img src={image} alt={`${title} map`} className="map-bg" />

          {pins.map((pin, i) => (
            <div
              key={`${title}-${i}`}
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
      </section>
    );
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

        .map-intro {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 55px auto;
          line-height: 1.9;
          color: #5a636e;
          font-size: 1.05rem;
        }

        .map-block {
          margin-bottom: 80px;
        }

        .map-subtitle {
          text-align: center;
          font-family: "Cormorant Garamond", serif;
          font-size: 2.2rem;
          font-weight: 500;
          margin-bottom: 22px;
          color: #2c3e50;
        }

        .map-wrapper {
          position: relative;
          width: 95%;
          max-width: 1100px;
          margin: 0 auto;
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
          .map-section-title {
            font-size: 2.3rem;
          }

          .map-subtitle {
            font-size: 1.9rem;
          }

          .map-wrapper {
            width: 100%;
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

      <section className="proposal-section"></section>

      <h2 className="map-section-title">
        A few places we've explored together
      </h2>

      <p className="map-intro">
        Some favourite places from the last ten years of travelling, hiking,
        getting lost and occasionally surviving questionable camping weather.
      </p>

    

      <TravelMap image={australiaMap} pins={australiaPins} />
  <TravelMap image={europeMap} pins={europePins} />
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