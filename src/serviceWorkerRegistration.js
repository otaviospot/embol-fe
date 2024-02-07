// serviceWorkerRegistration.js
const swUrl = `${process.env.PUBLIC_URL}/custom-service-worker.js`;
// Função para registrar o service worker
export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  }
};

// Função para desregistrar o service worker
export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};
