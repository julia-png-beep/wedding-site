// src/pages/EntryGate.jsx
import React from "react";
import "./entrygate.css";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyN1xtpATf4Ha5rLvEGEnD1-ds42KgezWBnlw2_dnz6nYVwxdgoy9zSo1xeF5ivyBYPpw/exec";
function computeTimeLeft() {
  const target = new Date("2026-10-24T15:00:00+11:00"); 
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function EntryGate({ onUnlock }) {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(() => computeTimeLeft());

  React.useEffect(() => {
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalizedCode = code.trim().toUpperCase();

    try {
      // We validate the code against your Google Sheet immediately
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "validate", code: normalizedCode }),
      });
      const data = await res.json();

      if (data.ok) {
        // Save the code in the browser so the RSVP page can find it later
        localStorage.setItem("guestCode", normalizedCode);
        onUnlock?.(normalizedCode);
      } else {
        setError("Invalid guest code. Please check your invitation.");
      }
    } catch (err) {
      setError("Technical glitch. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="entrygate">
      <div className="entrygate-card">
        <h1 className="entry-title">Gerard &amp; Julia&apos;s</h1>
        <p className="entry-sub">Bush Wedding</p>

        <div className="entry-count-plain">
          {days} days, {hours} hrs, {minutes} mins, {seconds} secs to go
        </div>

        <p className="entry-body">
          Please enter the guest code from your invitation to access our wedding details.
        </p>

        <form className="entry-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={loading}
          />
          <button className="entry-btn" disabled={loading}>
            {loading ? "Checking..." : "View wedding details"}
          </button>
          {error && <p className="entry-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}