# Wedding photo gallery setup

The guest-facing gallery is available at `#/gallery` for guests already inside the site and at `#/share` for the reception QR code.

## Connect the Google Drive upload API

1. Open [Google Apps Script](https://script.google.com/) with the Google account that owns the wedding photo folder.
2. Create a project named `Julia & Gerard Wedding Photos`.
3. Replace `Code.gs` with `apps-script/Code.gs` from this repository.
4. In Project Settings, enable **Show appsscript.json manifest file**, then replace it with `apps-script/appsscript.json`.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as** to `Me` and **Who has access** to `Anyone`.
7. Authorise Drive access, deploy, and copy the `/exec` URL.
8. Add a repository variable named `VITE_PHOTO_API_URL` containing that URL.

The Drive destination is `Julia & Gerard Wedding Photos` (`1GY-rRfoU1gyjfBHt1HFlMrocmK0n8S0p`). Uploaded items are link-visible so they can appear in the shared gallery; the folder itself is not made publicly browsable.

## QR destination

Point the reception QR code to `https://www.gerardandjulia.com/#/share`.

The QR route bypasses the invitation-code screen. It is unlisted from the main navigation, while the normal Gallery page remains inside the guest-code gate.
