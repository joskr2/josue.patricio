/**
 * reCAPTCHA v3 integration for the Formspree contact form.
 *
 * The form's Formspree settings use a custom reCAPTCHA key pair (set at
 * https://formspree.io -> form -> Settings). AJAX submissions are then only
 * accepted when they carry a token generated with the public site key below.
 */

export const RECAPTCHA_SITE_KEY = '6Ld_IvktAAAAAM1jIW9NBuTq2k3iRwjhEyoHS1QJ'

type Grecaptcha = {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

/**
 * Loads the reCAPTCHA v3 script. Injected through the DOM on purpose: a
 * <script> rendered by React never executes when the component is
 * client-rendered (e.g. arriving at the page through a soft navigation), and
 * reCAPTCHA needs to run early anyway so it can score the visit. Idempotent.
 */
export function loadRecaptchaScript() {
  if (typeof document === 'undefined') return
  if (document.querySelector('script[src*="recaptcha/api.js"]')) return

  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
  script.async = true
  document.head.appendChild(script)
}

/**
 * Returns a reCAPTCHA v3 token, or undefined when the API is unavailable
 * (script still loading, or blocked by an ad blocker) — Formspree then
 * answers with the form-level error, which the form already surfaces.
 */
export function getRecaptchaToken(): Promise<string | undefined> {
  return new Promise((resolve) => {
    const grecaptcha =
      typeof window === 'undefined' ? undefined : window.grecaptcha

    if (!grecaptcha) {
      resolve(undefined)
      return
    }

    // ready() fires as soon as the API has finished loading.
    grecaptcha.ready(() => {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' }).then(
        (token) => resolve(token),
        () => resolve(undefined),
      )
    })
  })
}
