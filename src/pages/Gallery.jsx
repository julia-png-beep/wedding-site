/** @jsxRuntime automatic */
/** @jsxImportSource react */
import React from 'react';
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
export default function Gallery(){
  return (
    <main className="container">
      <section className="block">
<a className="btn-link" href="#/?goto=essentials">← Back</a>
        <h2 className="title">Gallery</h2>
        <p>Photos will appear here after the wedding 🌿</p>
      </section>
    </main>
  );
}
