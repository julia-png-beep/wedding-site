import React from "react";

export default function WeekendShuttle() {
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title">Shuttle Bus</h2>

        <p>
          A shuttle will run between common accommodation spots in town and Wildwood on Saturday.
          Check the route below. Tap the image to open it full size.
        </p>

        {/* Bus Route Image */}
        <a href="/bus-route.png" target="_blank" rel="noreferrer">
          <img
            src="/bus-route.png"
            alt="Bus route map"
            style={{
              width: "100%",
              borderRadius: "14px",
              marginTop: "1rem",
              boxShadow: "0 3px 16px rgb(0 0 0 / 0.1)"
            }}
          />
        </a>
      </section>
    </main>
  );
}
