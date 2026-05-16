// src/pages/RSVP.jsx
import React from "react";
import "./rsvp.css";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyN1xtpATf4Ha5rLvEGEnD1-ds42KgezWBnlw2_dnz6nYVwxdgoy9zSo1xeF5ivyBYPpw/exec";

export default function RSVP() {
  const [step, setStep] = React.useState("lookup");
  const [code, setCode] = React.useState("");
  const [lookupError, setLookupError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [household, setHousehold] = React.useState(null);
  const [attendance, setAttendance] = React.useState({});
  const [dietByGuest, setDietByGuest] = React.useState({});

  const [email1, setEmail1] = React.useState("");
  const [email2, setEmail2] = React.useState("");
  const [friday, setFriday] = React.useState("No");
  const [sunday, setSunday] = React.useState("No");
  const [transport, setTransport] = React.useState("Drive");
  const [stayWhere, setStayWhere] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [plusOneEnabled, setPlusOneEnabled] = React.useState(false);
  const [plusOneName, setPlusOneName] = React.useState("");
  const [plusOneAttending, setPlusOneAttending] = React.useState("");
  const [plusOneDietNeeded, setPlusOneDietNeeded] = React.useState("No");
  const [plusOneDietDetails, setPlusOneDietDetails] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  const [showThanks, setShowThanks] = React.useState(false);
  const [thanksDone, setThanksDone] = React.useState(false);

  React.useEffect(() => {
    const savedCode = localStorage.getItem("guestCode");
    if (savedCode && step === "lookup") {
      handleLookup(null, savedCode);
    }
  }, []);

  async function handleLookup(e, autoCode = null) {
    if (e) e.preventDefault();
    setLookupError("");
    setLoading(true);

    const codeToUse = autoCode || code.trim().toUpperCase();

    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "validate", code: codeToUse }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Invalid code");

      const hh = data.household || {};
      const members = data.members || [];
      const prepared = { ...hh, members };

      const a = {};
      const diets = {};

      members.forEach((m) => {
        a[m.guestId] = m.invited ? "Yes" : "No";
        diets[m.guestId] = { needed: "No", details: "" };
      });

      const firstEmail = members.find((m) => m.email)?.email || "";
      setEmail1(firstEmail);

      prepared.anyPlusAllowed = members.some((m) => m.plusOneAllowed);

      setCode(codeToUse);
      setHousehold(prepared);
      setAttendance(a);
      setDietByGuest(diets);
      setStep("form");
    } catch (err) {
      setLookupError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function setAttendanceFor(guestId, val) {
    setAttendance((p) => ({ ...p, [guestId]: val }));
  }

  function setDietNeeded(guestId, needed) {
    setDietByGuest((p) => ({
      ...p,
      [guestId]: { ...p[guestId], needed },
    }));
  }

  function setDietDetails(guestId, details) {
    setDietByGuest((p) => ({
      ...p,
      [guestId]: { ...p[guestId], details },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!household) throw new Error("Missing household");

      let plusOneGuestId = null;

      if (household.anyPlusAllowed && plusOneEnabled && plusOneName.trim()) {
        const found = household.members.find((m) => m.plusOneAllowed);
        if (found) plusOneGuestId = found.guestId;
      }

      const updates = household.members.map((m) => {
        const att = attendance[m.guestId] || "No";
        const diet = dietByGuest[m.guestId] || {
          needed: "No",
          details: "",
        };

        return {
          guestId: m.guestId,
          rsvp: att,
          email: email1 || "",
          dietary:
            att === "Yes" && diet.needed === "Yes"
              ? (diet.details || "").trim()
              : "",
          plusOne: plusOneGuestId === m.guestId,
          plusOneName:
            plusOneGuestId === m.guestId ? plusOneName.trim() : "",
        };
      });

      const memberDietEntries = household.members
        .filter(
          (m) =>
            attendance[m.guestId] === "Yes" &&
            dietByGuest[m.guestId]?.needed === "Yes"
        )
        .map((m) => {
          const name = [m.first, m.last].filter(Boolean).join(" ");
          const d = (dietByGuest[m.guestId]?.details || "").trim();
          return d ? `${name}: ${d}` : name;
        });

      const hasPlusOneDiet =
        household.anyPlusAllowed &&
        plusOneEnabled &&
        plusOneName.trim() &&
        plusOneAttending === "Yes" &&
        plusOneDietNeeded === "Yes" &&
        plusOneDietDetails.trim();

      const plusOneDietEntry = hasPlusOneDiet
        ? `Plus one (${plusOneName.trim()}): ${plusOneDietDetails.trim()}`
        : "";

      const allDietEntries = plusOneDietEntry
        ? [...memberDietEntries, plusOneDietEntry]
        : memberDietEntries;

      const payload = {
        action: "submit",
        householdId: household.householdId,
        code: code.trim(),
        updates,
        email1: (email1 || "").trim(),
        email2: (email2 || "").trim(),
        friday,
        sunday,
        transport:
          transport === "Shuttle"
            ? `Shuttle${stayWhere ? " - " + stayWhere.trim() : ""}`
            : "Drive",
        dietNeeded: allDietEntries.length > 0 ? "Yes" : "No",
        dietDetails: allDietEntries.join("; "),
        notes: (notes || "").trim(),
      };

      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Error saving");

      setSubmitStatus("ok");
      setShowThanks(true);
      setThanksDone(false);
      setTimeout(() => setThanksDone(true), 3600);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const anyAttending = Object.values(attendance).some((v) => v === "Yes");

  const allNo =
    Object.values(attendance).length > 0 &&
    Object.values(attendance).every((v) => v === "No");

  const fridayInvited =
  String(household?.fridayInvite || "")
    .trim()
    .toLowerCase() === "yes";

  return (
    <main className="container container--narrow">
      <section className="block">
        <a className="btn-link" href="#/?goto=essentials">
          ← Back
        </a>

        <h2 className="title" style={{ textAlign: "center" }}>
          RSVP
        </h2>

        <p style={{ textAlign: "center" }}>
          Please RSVP by 1 September 2026.
        </p>

        {step === "lookup" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p className="lead">
              {loading ? "Recognising you..." : "Checking your invitation..."}
            </p>

            {lookupError && (
              <p style={{ color: "crimson", marginTop: 6 }}>
                {lookupError}
              </p>
            )}
          </div>
        )}

        {step === "form" && household && (
          <form className="form" onSubmit={handleSubmit}>
            <div className="household-banner">
              <div className="household-name">{household.householdName}</div>

              <div style={{ color: "#6b7280", marginTop: 4 }}>
                Code: <code>{code}</code>
              </div>
            </div>

            <p className="lead" style={{ textAlign: "center" }}>
              We’re getting married! Can you make it to our celebration?
            </p>

            <div className="guest-grid">
              {household.members.map((m) => {
                const att = attendance[m.guestId] || "No";
                const diet = dietByGuest[m.guestId] || {
                  needed: "No",
                  details: "",
                };

                return (
                  <div key={m.guestId} className="rsvp-tile guest-card">
                    <div className="guest-name">
                      {m.first} {m.last}
                    </div>

                    <div className="choice-row two-col">
                      <label className="choice">
                        <input
                          type="radio"
                          checked={att === "Yes"}
                          onChange={() => setAttendanceFor(m.guestId, "Yes")}
                        />
                        <span>Yes, I’ll be there to dance under the gum trees</span>
                      </label>

                      <label className="choice">
                        <input
                          type="radio"
                          checked={att === "No"}
                          onChange={() => setAttendanceFor(m.guestId, "No")}
                        />
                        <span>
                          Sorry, can’t make it but will celebrate from afar
                        </span>
                      </label>
                    </div>

                    {att === "Yes" && (
                      <div className="diet-section">
                        <div className="diet-label">
                          Do you have any dietary requirements?
                        </div>

                        <div className="choice-row">
                          <label className="choice">
                            <input
                              type="radio"
                              checked={diet.needed === "Yes"}
                              onChange={() =>
                                setDietNeeded(m.guestId, "Yes")
                              }
                            />
                            <span>Yes</span>
                          </label>

                          <label className="choice">
                            <input
                              type="radio"
                              checked={diet.needed === "No"}
                              onChange={() =>
                                setDietNeeded(m.guestId, "No")
                              }
                            />
                            <span>No</span>
                          </label>
                        </div>

                        {diet.needed === "Yes" && (
                          <input
                            placeholder="Please specify (e.g., vegan, gluten-free)"
                            value={diet.details}
                            onChange={(e) =>
                              setDietDetails(m.guestId, e.target.value)
                            }
                            required
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {anyAttending && (
              <>
                {fridayInvited && (
                  <div className="rsvp-tile">
                    <h4>
                        We’ll be kicking off the weekend with a relaxed Friday evening dinner with close family and friends — we’d love you to join us.
                    </h4>

                    <div className="choice-row two-col">
                      <label className="choice">
                        <input
                          type="radio"
                          checked={friday === "Yes"}
                          onChange={() => setFriday("Yes")}
                        />
                        <span>Yes, we’d love to join.</span>
                      </label>

                      <label className="choice">
                        <input
                          type="radio"
                          checked={friday === "No"}
                          onChange={() => setFriday("No")}
                        />
                        <span>No, we’ll see you on Saturday.</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="rsvp-tile">
                  <h4>
  We’ll be wrapping up the weekend with a relaxed farewell breakfast on Sunday morning — would you like to join us?
</h4>

<p className="small-note">
  To help cover catering costs, guests attending the breakfast will be asked to contribute $20 per person closer to the date.
</p>

                  <div className="choice-row two-col">
                    <label className="choice">
                      <input
                        type="radio"
                        checked={sunday === "Yes"}
                        onChange={() => setSunday("Yes")}
                      />
                      <span>
                        Absolutely — we’ll be there for one last hug and a flat
                        white.
                      </span>
                    </label>

                    <label className="choice">
                      <input
                        type="radio"
                        checked={sunday === "No"}
                        onChange={() => setSunday("No")}
                      />
                      <span>
                        We’ll be hitting the road, but we’ll miss you already.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="rsvp-tile">
                  <h4>How will you be getting to the venue?</h4>

                  <div className="choice-row two-col">
                    <label className="choice">
                      <input
                        type="radio"
                        checked={transport === "Shuttle"}
                        onChange={() => setTransport("Shuttle")}
                      />
                      <span>
                        Shuttle all the way — we’re here to relax and ride.
                      </span>
                    </label>

                    <label className="choice">
                      <input
                        type="radio"
                        checked={transport === "Drive"}
                        onChange={() => setTransport("Drive")}
                      />
                      <span>
                        We’ll be driving ourselves — save us a parking spot.
                      </span>
                    </label>
                  </div>

                  {transport === "Shuttle" && (
                    <input
                      style={{ marginTop: 8 }}
                      placeholder="Where will you be staying?"
                      value={stayWhere}
                      onChange={(e) => setStayWhere(e.target.value)}
                      required
                    />
                  )}
                </div>

                {household.anyPlusAllowed && (
                  <div className="rsvp-tile">
                    <h4>Plus one</h4>

                    <label className="choice">
                      <input
                        type="checkbox"
                        checked={plusOneEnabled}
                        onChange={(e) => setPlusOneEnabled(e.target.checked)}
                      />
                      <span>Will you bring a guest?</span>
                    </label>

                    {plusOneEnabled && (
                      <div className="plusone-fields" style={{ marginTop: 12 }}>
                        <input
                          placeholder="Guest full name"
                          value={plusOneName}
                          onChange={(e) => setPlusOneName(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="rsvp-tile">
                  <h4>Emails for updates & Notes</h4>

                  <input
                    type="email"
                    placeholder="Email 1"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                  />

                  <textarea
                    style={{ marginTop: 8 }}
                    rows={3}
                    placeholder="Any other notes?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              className="btn"
              disabled={submitting}
              style={{ width: "100%", marginTop: 24 }}
            >
              {submitting
                ? "Sending…"
                : allNo
                ? "Send regrets 💌"
                : "Send RSVP 🥂"}
            </button>

            {submitStatus === "ok" && showThanks && (
              <div className={`thanks-overlay ${thanksDone ? "is-done" : ""}`}>
                {anyAttending ? (
                  <div className="thanks-card confetti-burst">
                    🥂 Thanks! We’ve got your RSVP — can’t wait to celebrate
                    under the gum trees! 🌿
                  </div>
                ) : (
                  <div className="thanks-card soft-farewell">
                    💌 Thanks for letting us know — we’ll miss you, but we’ll
                    raise a glass from Wildwood! 🕊️
                  </div>
                )}
              </div>
            )}

            {thanksDone && (
              <div
                className="return-wrap"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                <a className="btn" href="#/">
                  Return home
                </a>

                <div
                  className="return-sub"
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "8px",
                    opacity: 0.7,
                  }}
                >
                  Your response has been saved.
                </div>
              </div>
            )}
          </form>
        )}
      </section>
    </main>
  );
}