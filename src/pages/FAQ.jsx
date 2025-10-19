import React from 'react';
export default function FAQ(){
  return (
    <main className="container">
      <section className="block">
        <a className="btn-link" href="#/home">← Back</a>
        <h2 className="title">Q&amp;A</h2>
        <p className="lead">
          We’re so excited to celebrate with you. Here are some helpful details — and if there’s anything we haven’t covered, feel free to reach out.
        </p>

        <div className="faq-list">
          {[
            ["📅 When do I need to RSVP?", "Please RSVP by 1 September 2026 so we can finalise numbers and make sure everything is ready to celebrate with you. You can RSVP via the form on this website."],
            ["👫 Can I bring a date?", "We’re keeping things intimate, so only those named on your invitation are invited. We hope you understand and can't wait to celebrate together."],
            ["👗👔 What's the dress code?", "Think cocktail attire. The venue's surrounded by bushland with some natural, uneven ground, so we recommend leaving stilettos at home. And while we love a statement outfit, white is best left for the bride for this one day."],
            ["🌿 Is the wedding indoors or outdoors?", "Ceremony & cocktail hour outdoors; reception covered with wet-weather options. If conditions permit, we’ll light a firepit in the evening."],
            ["🧒 Are children welcome?", "Children named on your invitation are very welcome. Wildwood is surrounded by natural bushland and unfenced cliffs, so supervision is required at all times. Prefer a night out? South Coast Nannies offers local babysitting services."],
            ["🚗 Is there parking at the venue?", "Yes, limited parking is available on site. If you need to drive, please let us know in your RSVP so we can allocate a spot. Car-pooling is encouraged. As Wildwood is set in bushland, night-time driving may mean sharing the road with kangaroos and wombats! We'll also run a shuttle bus with pick-ups near the main accommodation areas."],
            ["🚌 Where will the Shuttle bus be picking me up?", "We’ll share pickup times and locations closer to the day. When choosing accommodation, try to stay near one of the common stops along the shuttle route if you are planning on taking the shuttle."],
            ["🎁 Do you have a gift register?", "Your presence is the gift we value most. If you’d like to help us create memories on our honeymoon, a wishing well will be available at the reception."],
            ["🥗 Do you cater for Dietary requirements?", "Of course! Just include any dietary requirements in your RSVP and our amazing caterer, Jo, and her team will look after you."],
            ["🌤️ What's the weather like?", "Spring in Kangaroo Valley is usually mild (10–24°C). Evenings can be cool — bring a jacket for after dark."],
            ["📷 Can I take photos during the ceremony?", "We're having an unplugged ceremony - please keep phones and cameras away so everyone can be fully present. Once the party starts, snap away at the reception!"],
            ["📶 Will there be phone reception?", "Mobile reception at Wildwood is limited and a bit patchy. Think of it as a good excuse to switch off and enjoy the bush!"]
          ].map(([q, a]) => (
            <details className="faq" key={q}>
              <summary>{q}</summary>
              <div className="faq-content"><p>{a}</p></div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
