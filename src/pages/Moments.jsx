import React from "react";

export default function Moments() {
  return (
    <main className="container">
      {/* Intro */}
      <section className="block">
        <h2 className="title">Moments</h2>
        <p className="lead" style={{ maxWidth: 720 }}>
          Ten years of snowstorms, sunsets and snacks — a little collage of the places
          and people that stitched our story together. Travel, food, photos… and lots of bush.
        </p>
      </section>

      {/* 1) The Proposal & Wildwood */}
      <MasonrySection
        heading="The Proposal"
        caption="Just us and a hidden waterfall in the Tarkine."
        images={[
          "/tassieproposal1.jpg",
        ]}
      />

      {/* 2) Hikes & Wild Places */}
      <MasonrySection
        heading="Hikes & Wild Places"
        caption="Lost trails, hidden valleys, and the kind of places that still feel untouched."
        images={[
          "/Hiking1NSW.jpg",
          "/Hiking2.jpg",
          "/Hiking3.jpg",
          "/Hiking4.jpg",
          "/Hiking5.jpeg",
          "/Hiking6.jpg",
          "/Hiking8.jpg",
          "/Hiking9.jpg",
          "/Hiking11.jpg",
          "/Hiking2Tas.jpg",
          "/KingsCanyon.jpg",
           "/tassie1.jpg",
        ]}
      />

      {/* 3) Across Australia */}
      <MasonrySection
        heading="Across Australia"
        caption="Ocean breezes, desert skies, and everything in between."
        images={[
          "/horeridingqld.jpg",
          "/palms.jpg",
          "/CricketMelbourne.jpg",
          "/Kakadu1.jpg",
          "/uluru.jpg",
          "/Outback.jpg",
        ]}
      />

      {/* 4) Overseas Adventures */}
      <MasonrySection
        heading="Overseas Adventures"
        images={[
                   "/backlake.jpg",
                   "/Florence.jpg",
          "/Iceland2.jpg",
          "/NZ1.jpg",
                    "/Brussels.jpg",
          "/Switzerland.jpg",
                    "/Vietnam.jpg",
          "/Austria1.jpg",
          "/Venice.jpg",
          "/Tuscany.jpg",
                    "/HikeNZ.jpg",
          "/Vietnam2.jpg",
          ,
        ]}
      />

      {/* 5) Home & Everyday */}
      <MasonrySection
        heading="Home & Everyday"
        images={[
          "/familycat.jpg",
          "/Ussilly.jpg",,
        ]}
      />
    </main>
  );
}

/* ---------- Helpers ---------- */

function MasonrySection({ heading, caption, images = [] }) {
  return (
    <section className="block">
      <h3 className="subtitle" style={{ marginBottom: 6 }}>{heading}</h3>
      {caption ? <p className="lead" style={{ marginBottom: 14 }}>{caption}</p> : null}
      <div className="masonry">
        {images.map((src, i) => (
          <figure key={src + i} className="masonry-item">
            <img
              src={src}
              alt={friendlyAltFromPath(src)}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

function friendlyAltFromPath(path) {
  try {
    const file = path.split("/").pop().split(".")[0];
    return file.replace(/[-_]/g, " ");
  } catch {
    return "Moment photo";
  }
}
