// Enhancement only: direct file:// and browsers without service workers still play.
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Local-storage saves and the loaded game remain usable if caching is denied.
    });
  });
}
