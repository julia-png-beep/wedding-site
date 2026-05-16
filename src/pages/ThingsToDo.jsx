import React from "react";

export default function ThingsToDo() {
  return (
    <main className="container">
      <section className="block">
<button
  type="button"
  className="btn-link"
  onClick={() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = "#/"; // fallback to home if no history
    }
  }}
>
  ← Back
</button>        
<h2 className="title">Things to Do Around Kangaroo Valley</h2>

        <p>
          Kangaroo Valley is a slice of paradise surrounded by rolling hills,
          waterfalls, and winding country roads. If you’re staying a little longer, it’s the perfect excuse to turn the weekend into a mini getaway.
        </p>

        <h3 className="subtitle">Nature & Adventure</h3>
        <ul className="things">
          <li>Walk across <strong>Hampden Bridge</strong> and paddle along the Kangaroo River</li>
          <li>Hike to <strong>Fitzroy Falls</strong> or explore Morton National Park</li>
          <li>Visit <strong>Tallowa Dam</strong> or enjoy a picnic by the water</li>
        </ul>

        <h3 className="subtitle">Food & Wine</h3>
        <ul className="things">
          <li>Enjoy coffee or brunch at <strong>The General</strong></li>
          <li>
            Explore nearby wineries — our favourites are{" "}
            <strong>
              <a
                href="https://www.yarrawaestate.com/"
                target="_blank"
                rel="noreferrer"
              >
                Yarrawa Estate
              </a>
            </strong>{" "}
            and{" "}
            <strong>
              <a
                href="https://www.twofigs.com.au/"
                target="_blank"
                rel="noreferrer"
              >
                Two Figs Winery
              </a>
            </strong>
            , or if you want to stop along the way to Kangaroo Valley, drop by{" "}
            <strong>
              <a
                href="https://www.cherrytreehill.com.au/"
                target="_blank"
                rel="noreferrer"
              >
                Cherry Tree Hill
              </a>
            </strong>
            .
          </li>
        </ul>

        <h3 className="subtitle">Explore the Region</h3>
        <ul className="things">
          <li>Take a scenic drive to <strong>Berry</strong> for boutique shopping</li>
          <li>Head south to <strong>Seven Mile Beach</strong> for a coastal walk</li>
          <li>Stop at <strong>Belmore Falls</strong> for breathtaking views</li>
        </ul>
      </section>
    </main>
  );
}
