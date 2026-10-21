'use client'

import { useForm, ValidationError } from '@formspree/react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { getRecaptchaToken, loadRecaptchaScript } from '@/lib/recaptcha'

const FORMSPREE_FORM_ID = 'moejonao'

const inputStyles =
  'mt-2 block w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-teal-400'

const labelStyles = 'block font-medium text-sm text-zinc-900 dark:text-zinc-100'

const errorStyles = 'mt-2 text-sm text-red-600 dark:text-red-400'

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12 3.269 3.125A59.768 59.768 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

export function ContactForm() {
  const { t } = useTranslation()
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)

  // Formspree only accepts AJAX submissions when they carry a reCAPTCHA
  // token, so the script is loaded as soon as the form mounts (it needs to
  // run early to score the visit) and the token is attached on submit. The
  // field name Formspree verifies is `g-recaptcha-response`.
  useEffect(() => {
    loadRecaptchaScript()
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const token = await getRecaptchaToken()
    if (token) data.set('g-recaptcha-response', token)
    return handleSubmit(data)
  }

  if (state.succeeded) {
    return (
      <motion.div
        className="rounded-3xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-800 dark:bg-teal-900/20"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40">
          <CheckCircleIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
        </div>
        <h2 className="mt-4 font-bold text-2xl text-zinc-900 tracking-tight dark:text-zinc-100">
          {t('contact.formSuccessTitle')}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
          {t('contact.formSuccessMessage')}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-teal-600 px-6 py-3 font-semibold text-sm text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 active:scale-[0.98]"
        >
          {t('contact.formSendAnother')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-700/40 dark:bg-zinc-800/50"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-bold text-2xl text-zinc-900 tracking-tight dark:text-zinc-100">
        {t('contact.formTitle')}
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {t('contact.formIntro')}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelStyles}>
              {t('contact.formName')}
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder={t('contact.formNamePlaceholder')}
              className={inputStyles}
            />
            <ValidationError
              field="name"
              prefix="Name"
              errors={state.errors}
              className={errorStyles}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelStyles}>
              {t('contact.formEmail')}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={t('contact.formEmailPlaceholder')}
              className={inputStyles}
            />
            <ValidationError
              field="email"
              prefix="Email"
              errors={state.errors}
              className={errorStyles}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelStyles}>
            {t('contact.formMessage')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder={t('contact.formMessagePlaceholder')}
            className={inputStyles}
          />
          <ValidationError
            field="message"
            prefix="Message"
            errors={state.errors}
            className={errorStyles}
          />
        </div>

        <ValidationError errors={state.errors} className={errorStyles} />

        {state.errors && state.errors.getFormErrors().length > 0 && (
          <p role="alert" className={errorStyles}>
            {t('contact.formError')}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={state.submitting}
            className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-4 font-semibold text-sm text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            <SendIcon className="h-4 w-4" />
            {state.submitting
              ? t('contact.formSending')
              : t('contact.formSend')}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
