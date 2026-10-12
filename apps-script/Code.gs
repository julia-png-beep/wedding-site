/* Julia & Gerard wedding photo API. Deploy as a Web app executing as the owner, accessible to anyone. */
const FOLDER_ID = "1GY-rRfoU1gyjfBHt1HFlMrocmK0n8S0p";
const MAX_FILE_BYTES = 500 * 1024 * 1024;
const SESSION_TTL_SECONDS = 21600;

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    switch (payload.action) {
      case "startUpload": return json_(startUpload_(payload));
      case "uploadChunk": return json_(uploadChunk_(payload));
      case "listGallery": return json_(listGallery_(payload.guestId));
      case "toggleLike": return json_(toggleLike_(payload));
      default: return json_({ ok: false, error: "Unknown action" });
    }
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: error && error.message ? error.message : "Unexpected error" });
  }
}

function startUpload_(payload) {
  const originalName = sanitizeFileName_(payload.name || "wedding-upload");
  const mimeType = String(payload.mimeType || "application/octet-stream");
  const size = Number(payload.size || 0);
  const uploader = sanitizeText_(payload.uploader || "Guest", 80);
  if (!/^image\//.test(mimeType) && !/^video\//.test(mimeType)) throw new Error("Only photos and videos can be uploaded.");
  if (!size || size > MAX_FILE_BYTES) throw new Error("Files must be smaller than 500 MB.");

  DriveApp.getFolderById(FOLDER_ID);
  const stampedName = Utilities.formatDate(new Date(), "Australia/Sydney", "yyyyMMdd-HHmmss") + "-" + originalName;
  const metadata = { name: stampedName, parents: [FOLDER_ID], appProperties: { uploader: uploader, originalName: originalName } };
  const response = UrlFetchApp.fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,mimeType,createdTime,thumbnailLink,webViewLink,appProperties", {
    method: "post",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken(), "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Type": mimeType, "X-Upload-Content-Length": String(size) },
    payload: JSON.stringify(metadata),
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() !== 200) throw new Error("Could not begin the upload.");
  const sessionUrl = response.getHeaders().Location || response.getHeaders().location;
  if (!sessionUrl) throw new Error("Google Drive did not return an upload session.");
  const uploadId = Utilities.getUuid();
  CacheService.getScriptCache().put("upload:" + uploadId, sessionUrl, SESSION_TTL_SECONDS);
  return { ok: true, uploadId: uploadId };
}

function uploadChunk_(payload) {
  const uploadId = String(payload.uploadId || "");
  const offset = Number(payload.offset);
  const total = Number(payload.total);
  const bytes = Utilities.base64Decode(String(payload.data || ""));
  const sessionUrl = CacheService.getScriptCache().get("upload:" + uploadId);
  if (!sessionUrl) throw new Error("This upload expired. Please start it again.");
  if (!Number.isFinite(offset) || !Number.isFinite(total) || !bytes.length) throw new Error("Invalid upload chunk.");

  const end = offset + bytes.length - 1;
  const response = UrlFetchApp.fetch(sessionUrl, {
    method: "put",
    contentType: "application/octet-stream",
    headers: { "Content-Range": "bytes " + offset + "-" + end + "/" + total },
    payload: bytes,
    muteHttpExceptions: true,
  });
  const status = response.getResponseCode();
  if (status === 308) return { ok: true, done: false, received: end + 1 };
  if (status !== 200 && status !== 201) throw new Error("Google Drive rejected part of the upload. Please try again.");

  CacheService.getScriptCache().remove("upload:" + uploadId);
  const file = JSON.parse(response.getContentText());
  makePublic_(file.id);
  return { ok: true, done: true, file: normaliseFile_(file) };
}

function listGallery_(guestId) {
  DriveApp.getFolderById(FOLDER_ID);
  const q = encodeURIComponent("'" + FOLDER_ID + "' in parents and trashed = false");
  const fields = encodeURIComponent("files(id,name,mimeType,size,createdTime,thumbnailLink,webViewLink,appProperties)");
  const response = UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files?q=" + q + "&orderBy=createdTime%20desc&pageSize=200&fields=" + fields, {
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() !== 200) throw new Error("Could not load the gallery.");
  const files = JSON.parse(response.getContentText()).files || [];
  const safeGuestId = sanitizeGuestId_(guestId);
  const likeProperties = PropertiesService.getScriptProperties().getProperties();
  return { ok: true, items: files.map(function(file) { return normaliseFile_(file, safeGuestId, likeProperties); }) };
}

function toggleLike_(payload) {
  const fileId = String(payload.fileId || "");
  const guestId = sanitizeGuestId_(payload.guestId);
  if (!/^[a-zA-Z0-9_-]{10,200}$/.test(fileId) || !guestId) throw new Error("This like could not be saved.");

  const file = DriveApp.getFileById(fileId);
  const parents = file.getParents();
  let belongsToGallery = false;
  while (parents.hasNext()) {
    if (parents.next().getId() === FOLDER_ID) { belongsToGallery = true; break; }
  }
  if (!belongsToGallery) throw new Error("That item is not in the wedding gallery.");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const properties = PropertiesService.getScriptProperties();
    const key = "likes:" + fileId;
    const guests = JSON.parse(properties.getProperty(key) || "[]");
    const existingIndex = guests.indexOf(guestId);
    const shouldLike = payload.liked !== false;
    if (shouldLike && existingIndex === -1) guests.push(guestId);
    if (!shouldLike && existingIndex !== -1) guests.splice(existingIndex, 1);
    if (guests.length) properties.setProperty(key, JSON.stringify(guests));
    else properties.deleteProperty(key);
    return { ok: true, likes: guests.length, liked: guests.indexOf(guestId) !== -1 };
  } finally {
    lock.releaseLock();
  }
}

function makePublic_(fileId) {
  const response = UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(fileId) + "/permissions", {
    method: "post",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken(), "Content-Type": "application/json" },
    payload: JSON.stringify({ type: "anyone", role: "reader" }),
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) throw new Error("The file uploaded, but could not be added to the shared gallery.");
}

function normaliseFile_(file, guestId, likeProperties) {
  const storedLikes = likeProperties ? likeProperties["likes:" + file.id] : null;
  const likedBy = storedLikes ? JSON.parse(storedLikes) : [];
  return {
    id: file.id,
    name: (file.appProperties && file.appProperties.originalName) || file.name,
    mimeType: file.mimeType,
    size: Number(file.size || 0),
    createdTime: file.createdTime,
    uploader: (file.appProperties && file.appProperties.uploader) || "",
    likes: likedBy.length,
    liked: Boolean(guestId && likedBy.indexOf(guestId) !== -1),
    thumbnailUrl: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+$/, "=s1200") : "",
    viewUrl: file.webViewLink || ("https://drive.google.com/file/d/" + file.id + "/view"),
  };
}

function sanitizeGuestId_(value) {
  const guestId = String(value || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 200);
  return guestId.length >= 10 ? guestId : "";
}

function sanitizeFileName_(value) {
  const cleaned = String(value).replace(/[\\/:*?"<>|\r\n]+/g, "-").replace(/\s+/g, " ").trim();
  return cleaned.slice(0, 160) || "wedding-upload";
}

function sanitizeText_(value, maxLength) {
  return String(value).replace(/[<>\r\n]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
