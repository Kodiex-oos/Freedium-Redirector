self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activated.');
    event.waitUntil(clients.claim());
  });
  
  chrome.webNavigation.onBeforeNavigate.addListener(details => {
    try {
      const url = new URL(details.url);
      console.log('Navigating to:', url.hostname);
      if (url.hostname.endsWith('medium.com')) {
        const newUrl = `https://freedium.cfd/${url.hostname}${url.pathname}${url.search}${url.hash}`;
        console.log('Redirecting to:', newUrl);
        chrome.tabs.update(details.tabId, { url: newUrl });
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  }, {
    url: [{ hostSuffix: 'medium.com' }]
  });
  