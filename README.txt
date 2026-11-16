UKEMI SOUND TRAINER — WEB / PHONE DEPLOYMENT
============================================

Everything needed to put the app online and install it on phones
as a PWA (Progressive Web App).

FILES
  index.html            the whole app in one file
  manifest.webmanifest  name, colours, icons (makes it installable)
  sw.js                 service worker: offline use after the first visit
  icon-192.png          app icon (home screen)
  icon-512.png          app icon (splash screen)
  icon-maskable.png     app icon (Android adaptive shape)

UPDATING THE LIVE SITE (GitHub Pages)
  1. Open the repository on github.com.
  2. Add file -> Upload files. Drag in ALL six files from this folder
     and let them replace the old ones. Commit.
  3. Wait about a minute, then reload the site. The new version loads
     on the first visit; installed apps pick it up the next time they
     are opened with a connection.

INSTALL ON A PHONE
  Android:  open the link in Chrome -> menu -> "Add to Home screen".
  iPhone:   open the link in Safari -> Share -> "Add to Home Screen".
  Computer: open the link in any browser, or use the Install icon in
            Chrome's address bar.

NOTES
  * The camera needs https. GitHub Pages provides it.
  * The first time the camera is started, the tracking model downloads
    once (Fast about 6 MB, Balanced about 9 MB, Precise about 30 MB)
    and is then kept on the device.
  * Fonts come from Google Fonts and are cached after the first visit.
  * Exports (CSV / JSON) are saved to the device. Nothing is uploaded.
