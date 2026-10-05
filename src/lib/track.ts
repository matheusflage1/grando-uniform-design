declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    gtag_report_conversion_lead: (url?: string) => boolean;
    gtag_report_conversion_contact: (url?: string) => boolean;
  }
}

/** Named analytics events (sent to gtag + dataLayer). */
export type TrackEvent =
  | 'cta_click'
  | 'form_start'
  | 'form_step_2'
  | 'generate_lead'
  | 'click_email'
  | 'whatsapp_modal_open'
  | 'whatsapp_lead_captured'
  | 'whatsapp_redirect'
  | 'faq_open'
  | 'scroll_50'
  | 'scroll_90';

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
    (window.dataLayer = window.dataLayer || []).push({ event, ...params });
  } catch {
    /* never break UI because of analytics */
  }
}

export const scrollToForm = (source: string) => {
  track('cta_click', { source, target: 'form' });
  document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
