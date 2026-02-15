
import { Product } from './types';

declare global {
  interface Window {
    gtag: (
      type: 'event' | 'config' | 'js',
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

export {};
