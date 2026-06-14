import React from "react";

export default function WeekendSunday() {
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
        <h2 className="title">Sunday · Recovery Brunch</h2>

        <p>
          <strong>Location TBC</strong>
          <br />
          Details will be shared closer to the date
        </p>

        <p>
          The celebrations aren't quite over yet — join us Sunday morning for a
          slow, relaxed recovery brunch. Think good food, good company, and
          absolutely no rush. Whether you're nursing a sore head or just not
          ready to say goodbye, come as you are and ease into the day with us.
        </p>

        <p>
          We're still finalising the perfect spot, so keep an eye out for
          details closer to the date. We promise it'll be worth the wait.
        </p>
      </section>
    </main>
  );
}
