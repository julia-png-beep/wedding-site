// src/pages/FAQ.jsx
import React from "react";
import { NavLink } from "react-router-dom";


export default function FAQ() {
  const faqs = [
    {
      q: "📅 How do I RSVP and by when?",
      a: (
        <p>
          Please RSVP by 1 September 2026 so we can finalise numbers and make sure
          everything is ready to celebrate with you. You can{" "}
          <NavLink to="/rsvp" className="btn-link">
            RSVP via the form on this website.
          </NavLink>
        </p>
      ),
    },
    {
      q: "👫 Can I bring a date?",
      a: (
        <p>
          We’re keeping things intimate, so only those named on your invitation are invited.
          We hope you understand and can't wait to celebrate together.
        </p>
      ),
    },
    {
      q: "🧒 Are children welcome?",
      a: (
        <p>
          Children named on your invitation are welcome. Wildwood is surrounded by bushland
          and unfenced cliffs, so little ones will need to be supervised at all times.
          If you prefer a night out, South Coast Nannies offer local babysitting services.
        </p>
      ),
    },
    {
      q: "🌿 Is the wedding indoors or outdoors?",
      a: (
        <p>
          The ceremony and cocktail hour will be outdoors, with the reception under cover and
          wet-weather options ready just in case. If conditions permit, we’ll light a firepit
          in the evening.
        </p>
      ),
    },
    {
      q: "🚗 Is there parking at the venue?",
      a: (
        <p>
          Yes, limited parking is available on site. If you plan to drive, please let us know
          in your RSVP so we can allocate a spot. Car-pooling is encouraged.
        </p>
      ),
    },
    {
      q: "🚌 Where will the Shuttle bus be picking me up?",
      a: (
        <p>
          WWe’ll share pickup times and exact locations closer to the day.
  If you’re planning to use the shuttle bus, we recommend booking
  accommodation near one of the common pickup locations.
        </p>
      ),
    },
    {
      q: "🌤️ What's the weather like?",
      a: <p>Spring in Kangaroo Valley is usually mild (10–24°C). Evenings can be cool so bring a jacket for after dark.</p>,
    },
    {
      q: "📶 Will there be phone reception?",
      a: <p>Mobile reception at Wildwood is limited and a bit patchy. Think of it as a good excuse to switch off and enjoy the bush!</p>,
    },
    {
      q: "👗👔 What should I wear?",
      a: (
        <p>
          We're going for cocktail attire, polished but relaxed. Think jacket and trousers,
          and dresses of any length. The venue is set in natural bushland with some uneven ground so stilettos might
          not be your best friend. And while we love a statement outfit, white is best left
          for the bride for this one day.
        </p>
      ),
    },
    {
      q: "🥗 Do you cater for dietary requirements?",
      a: (
        <p>
          Of course! Just include any dietary requirements in your RSVP and our amazing
          caterer, Jo, and her team will look after you.
        </p>
      ),
    },
    {
      q: "📷 Can I take photos or videos during the ceremony?",
      a: (
        <p>
          We're having an unplugged ceremony, so please keep phones and cameras tucked away and be fully present with us. Once the party starts, feel free to snap away at the reception!
        </p>
      ),
    },
    {
      q: "🎁 Gifts?",
      a: (
        <p>
          Your presence is the gift we value most. If you’d like to help us create memories
          on our honeymoon, a wishing well will be available.
        </p>
      ),
    },
    {
      q: "❓ More questions - who should I call?",
      a: (
        <>
          <p>Feel free to contact us if you have any further questions.</p>
          <p>Julia:  0411 821 932</p>
          <p>Gerard: 0405 320 758</p>
          <p>We're happy to help with anything from travel tips to outfit dilemmas.</p>
        </>
      ),
    },
  ];

  return (
    <main className="container">
      <section className="block">
<a className="btn-link" href="#/?goto=essentials">← Back</a>
        <h2 className="title">Q&amp;A</h2>
        <p className="lead">
          We’re so excited to celebrate with you! Here's everything you might want to know before the big day.
        </p>

        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <details className="faq" key={q}>
              <summary>{q}</summary>
              <div className="faq-content">{a}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
