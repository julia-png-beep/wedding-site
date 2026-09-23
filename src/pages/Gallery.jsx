import React from "react";
import "./gallery.css";

const PHOTO_API_URL = import.meta.env.VITE_PHOTO_API_URL || "";
const CHUNK_SIZE = 2 * 1024 * 1024;

function readAsBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(reader.error || new Error("Could not read file"));
    reader.readAsDataURL(blob);
  });
}

async function callPhotoApi(payload) {
  if (!PHOTO_API_URL) throw new Error("Photo uploads are not connected yet.");
  const response = await fetch(PHOTO_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

function formatSize(bytes) {
  if (!Number.isFinite(bytes)) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

function MediaCard({ item }) {
  const isVideo = item.mimeType?.startsWith("video/");
  return (
    <a className="gallery-card sparkle" href={item.viewUrl} target="_blank" rel="noreferrer" aria-label={`Open ${item.name || (isVideo ? "video" : "photo")}`}>
      {item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" loading="lazy" /> : <div className="gallery-card__fallback" aria-hidden="true">{isVideo ? "▶" : "✦"}</div>}
      {isVideo && <span className="gallery-card__video">▶ Video</span>}
      {item.uploader && <span className="gallery-card__credit">By {item.uploader}</span>}
    </a>
  );
}

export default function Gallery({ qrEntry = false }) {
  const [name, setName] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [loadingGallery, setLoadingGallery] = React.useState(Boolean(PHOTO_API_URL));
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");
  const fileInputRef = React.useRef(null);

  const loadGallery = React.useCallback(async () => {
    if (!PHOTO_API_URL) { setLoadingGallery(false); return; }
    try {
      const data = await callPhotoApi({ action: "listGallery" });
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingGallery(false);
    }
  }, []);

  React.useEffect(() => { loadGallery(); }, [loadGallery]);

  function chooseFiles(event) {
    const selected = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));
    setFiles(selected);
    setError("");
    setStatus("");
  }

  async function uploadOne(file, completedBytes, totalBytes) {
    const start = await callPhotoApi({ action: "startUpload", name: file.name, mimeType: file.type || "application/octet-stream", size: file.size, uploader: name.trim() });
    let offset = 0;
    while (offset < file.size) {
      const end = Math.min(offset + CHUNK_SIZE, file.size);
      const chunk = await readAsBase64(file.slice(offset, end));
      await callPhotoApi({ action: "uploadChunk", uploadId: start.uploadId, offset, total: file.size, data: chunk });
      offset = end;
      setProgress(Math.round(((completedBytes + offset) / totalBytes) * 100));
    }
  }

  async function handleUpload(event) {
    event.preventDefault();
    if (!name.trim()) { setError("Please add your name so we know who shared these moments."); return; }
    if (!files.length) { setError("Choose at least one photo or video first."); return; }
    setUploading(true); setProgress(0); setError(""); setStatus("");
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    let completedBytes = 0;
    try {
      for (const file of files) {
        await uploadOne(file, completedBytes, totalBytes);
        completedBytes += file.size;
      }
      setProgress(100);
      setStatus(`Thank you — ${files.length === 1 ? "your moment is" : "your moments are"} now in the gallery.`);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadGallery();
    } catch (err) {
      setError(err.message || "The upload stopped. Please check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className={`container gallery-page ${qrEntry ? "gallery-page--qr" : ""}`}>
      <section className="block">
        {!qrEntry && <a className="btn-link" href="#/?goto=essentials">← Back</a>}
        <div className="gallery-heading">
          <p className="gallery-kicker">Julia &amp; Gerard · 24 October 2026</p>
          <h2 className="title">Share the moments you captured</h2>
          <p className="lead">Add your favourite photos and videos from our weekend at Wildwood. They’ll appear below for everyone to enjoy.</p>
        </div>

        <form className="upload-card" onSubmit={handleUpload}>
          <label htmlFor="uploader-name">Your name</label>
          <input id="uploader-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Alex & Sam" autoComplete="name" disabled={uploading} />
          <label className="file-picker" htmlFor="wedding-media">
            <span className="file-picker__icon" aria-hidden="true">＋</span>
            <strong>Choose photos or videos</strong>
            <span>Original quality · select more than one</span>
          </label>
          <input ref={fileInputRef} id="wedding-media" className="visually-hidden" type="file" accept="image/*,video/*" multiple onChange={chooseFiles} disabled={uploading} />
          {files.length > 0 && <div className="upload-selection" aria-live="polite"><strong>{files.length} {files.length === 1 ? "file" : "files"} selected</strong><span>{formatSize(files.reduce((sum, file) => sum + file.size, 0))}</span></div>}
          {uploading && <div className="upload-progress" aria-live="polite"><div className="upload-progress__track"><span style={{ width: `${progress}%` }} /></div><span>{progress}% uploaded — please keep this page open</span></div>}
          <button className="btn upload-button" type="submit" disabled={uploading || !files.length}>{uploading ? "Uploading…" : "Add to our wedding gallery"}</button>
          {status && <p className="upload-message upload-message--success" role="status">{status}</p>}
          {error && <p className="upload-message upload-message--error" role="alert">{error}</p>}
        </form>

        <div className="shared-gallery">
          <div className="shared-gallery__heading"><h3>Shared moments</h3>{items.length > 0 && <span>{items.length} {items.length === 1 ? "upload" : "uploads"}</span>}</div>
          {loadingGallery ? <p className="gallery-empty">Gathering everyone’s photos…</p> : items.length ? <div className="gallery-grid">{items.map((item) => <MediaCard key={item.id} item={item} />)}</div> : <div className="gallery-empty"><span aria-hidden="true">🌿</span><p>Be the first to add a moment from the wedding.</p></div>}
        </div>
      </section>
    </main>
  );
}
