// src/pages/EntryGate.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import "./entrygate.css";

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzQDmtuPDy-36bIB7KFQ0aJcOkwXPGWdhU5W9VjvwZXTQj4CEzuGhA_v05LvSUWKRR9YA/exec";
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
  const { t } = useTranslation();

  React.useEffect(() => {
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

const normalizedCode = code.trim();

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
        setError(t('entryGate.invalidCode'));
      }
    } catch (err) {
      setError(t('entryGate.technicalError'));
    } finally {
      setLoading(false);
    }
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="entrygate">
      <div className="entrygate-card">
        <h1 className="entry-title" dangerouslySetInnerHTML={{ __html: t('entryGate.title') }} />
        <p className="entry-sub">{t('entryGate.subtitle')}</p>

        <div className="entry-count-plain">
          {days} {t('entryGate.countdownLabel').split(',')[0]}, {hours} {t('entryGate.countdownLabel').split(',')[1]}, {minutes} {t('entryGate.countdownLabel').split(',')[2]}, {seconds} {t('entryGate.countdownLabel').split(',')[3]}
        </div>

        <p className="entry-body">
          {t('entryGate.prompt')}
        </p>

        <form className="entry-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('entryGate.placeholder')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={loading}
          />
          <button className="entry-btn" disabled={loading}>
            {loading ? t('entryGate.checking') : t('entryGate.submitBtn')}
          </button>
          {error && <p className="entry-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}