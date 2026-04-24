export const PIXEL_ID = '616771109174492';

export type PixelEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'InitiateCheckout'
  | 'Contact'
  | 'Purchase'
  | 'CompleteRegistration';

export type PixelParams = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  [key: string]: unknown;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const trackPixel = (event: PixelEvent, params?: PixelParams) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (params) {
    window.fbq('track', event, params);
  } else {
    window.fbq('track', event);
  }
};
