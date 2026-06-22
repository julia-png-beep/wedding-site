// src/pages/RSVP.jsx
import React from "react";
import "./rsvp.css";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzQDmtuPDy-36bIB7KFQ0aJcOkwXPGWdhU5W9VjvwZXTQj4CEzuGhA_v05LvSUWKRR9YA/exec";

const RSVP_DEADLINE = new Date("2026-09-01T23:59:59+10:00");
const RSVP_CLOSED = Date.now() > RSVP_DEADLINE.getTime();

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
  const [transport, setTransport] = React.useState("Shuttle");
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
    if (RSVP_CLOSED) return;
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
      const hasResponded = members.some((m) => m.rsvp);

      members.forEach((m) => {
        a[m.guestId] = hasResponded ? (m.rsvp || "") : "";
        diets[m.guestId] = {
          needed: m.dietary ? "Yes" : "No",
          details: m.dietary || "",
        };
      });

      const firstEmail =
        hh.email1 || members.find((m) => m.email)?.email || "";
      setEmail1(firstEmail);
      setEmail2(hh.email2 || "");
      setFriday(hasResponded ? (hh.friday || "No") : "");
      setSunday(hasResponded ? (hh.sunday || "No") : "");
      setNotes(hh.notes || "");

      const transportVal = String(hh.transport || "");
      if (transportVal.toLowerCase().startsWith("shuttle")) {
        setTransport("Shuttle");
        const parts = transportVal.split(" - ");
        setStayWhere(parts.length > 1 ? parts.slice(1).join(" - ").trim() : "");
      } else if (transportVal) {
        setTransport("Drive");
      }

      const plusOneMember = members.find((m) => m.plusOne && m.plusOneName);
      if (plusOneMember) {
        setPlusOneEnabled(true);
        setPlusOneName(plusOneMember.plusOneName);
      }

      prepared.anyPlusAllowed = members.some((m) => m.plusOneAllowed);
      prepared.hasResponded = hasResponded;

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
        isUpdate: !!household.hasResponded,
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

        {RSVP_CLOSED && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p className="lead">
              RSVPs closed on 1 September 2026 and can no longer be
              submitted or updated online.
            </p>
            <p>
              If you need to change your response, please get in touch with
              us directly.
            </p>
          </div>
        )}

        {!RSVP_CLOSED && step === "lookup" && (
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

        {!RSVP_CLOSED && step === "form" && household && (
          <form className="form" onSubmit={handleSubmit}>
            <div className="household-banner">
              <div className="household-name">{household.householdName}</div>

              <div style={{ color: "#6b7280", marginTop: 4 }}>
                Code: <code>{code}</code>
              </div>
            </div>

            {household.hasResponded && (
              <div
                className="rsvp-tile"
                style={{ background: "#eef3ec", border: "1px solid #cdd9cf" }}
              >
                <strong>You've already submitted an RSVP.</strong>
                <p style={{ margin: "6px 0 0" }}>
                  Your previous answers are pre-filled below — feel free to
                  update anything and send it again to amend your RSVP.
                </p>
              </div>
            )}

            <p className="lead" style={{ textAlign: "center" }}>
              We’re getting married! Can you make it to our celebration?
            </p>

            <div className="guest-grid">
              {household.members.map((m) => {
                const att = attendance[m.guestId] ?? "";
                const diet = dietByGuest[m.guestId] || {
                  needed: "No",
                  details: "",
                };

                return (
                  <div key={m.guestId} className="rsvp-tile guest-card">
                    <div className="guest-name">
                      {m.first}
                    </div>

                    <div className="choice-row two-col">
                      <label className="choice">
                        <input
                          type="radio"
                          checked={att === "Yes"}
                          onChange={() => setAttendanceFor(m.guestId, "Yes")}
                        />
                        <span>Yes, looking forward to celebrating!</span>
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
                        <span>Yes, looking forward to it.</span>
                      </label>

                      <label className="choice">
                        <input
                          type="radio"
                          checked={friday === "No"}
                          onChange={() => setFriday("No")}
                        />
                        <span>No thanks, see you on Saturday.</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="rsvp-tile">
                  <h4>
  We’ll be wrapping up the weekend with a relaxed farewell brunch on Sunday morning — would you like to join us?
</h4>

                  <div className="choice-row two-col">
                    <label className="choice">
                      <input
                        type="radio"
                        checked={sunday === "Yes"}
                        onChange={() => setSunday("Yes")}
                      />
                      <span>
                        Yes, see you there. 
                      </span>
                    </label>

                    <label className="choice">
                      <input
                        type="radio"
                        checked={sunday === "No"}
                        onChange={() => setSunday("No")}
                      />
                      <span>
                        No thanks.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="rsvp-tile">
                  <h4>Getting to the venue</h4>

                  <p style={{ margin: "0 0 10px" }}>
                    We'll have a shuttle bus running for all guests to and from
                    Wildwood, as there is very limited parking on site. Please
                    let us know where you're staying so we can plan the route
                    and pick-up times.
                  </p>

                  <input
                    placeholder="Your accommodation — helps us plan pick-up stops"
                    value={stayWhere}
                    onChange={(e) => setStayWhere(e.target.value)}
                    required
                  />

                  <p style={{ margin: "12px 0 4px" }}>
                    If you're unable to use the shuttle bus and need to drive,
                    please get in touch with us directly to arrange a parking
                    spot:
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Gerard</strong> 0405 320 758<br />
                    <strong>Julia</strong> 0411 821 932 · julia.grosshagauer@gmail.com
                  </p>
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
                  <h4>For important updates and details please provide your email address
              </h4>

                  <input
                    type="email"
                    placeholder="Email 1"
                    value={email1}
                    onChange={(e) => setEmail1(e.target.value)}
                    required
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
                : household.hasResponded
                ? allNo
                  ? "Update regrets 💌"
                  : "Update RSVP 🥂"
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