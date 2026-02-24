declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA4_ID = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_GA4_ID : undefined;
const HEATMAP_ID = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_HEATMAP_ID : undefined;

export const analytics = {
  init() {
    if (typeof window === 'undefined') return;

    if (GA4_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA4_ID);
    }

    if (HEATMAP_ID) {
      console.debug('[Heatmap] Would initialize with ID:', HEATMAP_ID);
    }
  },

  track(event: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined') {
      console.debug('[Analytics:track]', event, properties);
      if (GA4_ID && window.gtag) {
        window.gtag('event', event, properties);
      }
    }
  },

  identify(userId: string, traits?: Record<string, unknown>) {
    if (typeof window !== 'undefined') {
      console.debug('[Analytics:identify]', userId, traits);
      if (GA4_ID && window.gtag) {
        window.gtag('set', 'user_properties', { user_id: userId, ...traits });
      }
    }
  },

  page(name: string, properties?: Record<string, unknown>) {
    if (typeof window !== 'undefined') {
      console.debug('[Analytics:page]', name, properties);
      if (GA4_ID && window.gtag) {
        window.gtag('event', 'page_view', { page_title: name, ...properties });
      }
    }
  },
};
