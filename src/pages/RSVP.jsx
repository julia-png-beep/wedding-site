import React from 'react';
export default function RSVP(){
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title">RSVP</h2>
        <p>Please RSVP by 1 September 2026.</p>
        <form action="https://formspree.io/f/xkgbweqw" method="POST" className="form">
          <input name="name" placeholder="Your Name" required />
          <input name="email" type="email" placeholder="Your Email" required />
          <input name="dietaries" placeholder="Dietary requirements" />
          <input name="bus" placeholder="Will you take the shuttle?" />
          <button type="submit" className="btn">Send RSVP</button>
        </form>
      </section>
    </main>
  );
}
