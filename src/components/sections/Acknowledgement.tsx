import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ACKNOWLEDGEMENT } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/**
 * Endpoint the acknowledgement form submits to.
 *
 * To connect the form:
 *   1. Create a form endpoint on Formspree (https://formspree.io) or Google Forms.
 *   2. Paste the resulting endpoint URL below in place of the empty string.
 *
 * Until this is set, the form displays an "endpoint not configured" notice
 * when the user submits — nothing is sent.
 */
const FORM_ENDPOINT: string = '';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Acknowledgement() {
  const { t, locale } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [period, setPeriod] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !period.trim() || !consent) {
      setStatus('error');
      setErrorMessage(t(ACKNOWLEDGEMENT.requiredFields));
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus('error');
      setErrorMessage(t(ACKNOWLEDGEMENT.errorNotConfigured));
      return;
    }

    try {
      setStatus('submitting');
      setErrorMessage('');
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName,
          trainingPeriod: period,
          consent,
          language: locale,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(t(ACKNOWLEDGEMENT.errorGeneric));
    }
  };

  return (
    <Section id="acknowledgement" tone="muted">
      <div className="shell">
        <SectionHeading
          id="acknowledgement"
          eyebrow={t(ACKNOWLEDGEMENT.eyebrow)}
          title={t(ACKNOWLEDGEMENT.title)}
        />

        <Reveal delay={0.1}>
          <div className="mt-10 max-w-3xl rounded-lg border border-navy/10 bg-white p-8 shadow-card md:p-10">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start gap-4"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green text-white">
                  <Check className="h-6 w-6" strokeWidth={2.4} aria-hidden="true" />
                </span>
                <h3 className="text-h2 text-navy-900">{t(ACKNOWLEDGEMENT.successTitle)}</h3>
                <p className="text-body text-navy/75">{t(ACKNOWLEDGEMENT.successBody)}</p>
              </motion.div>
            ) : (
              <>
                <p className="text-body text-navy-900/90">{t(ACKNOWLEDGEMENT.statement)}</p>

                <form onSubmit={submit} className="mt-8 space-y-6" noValidate>
                  <fieldset className="space-y-6">
                    <legend className="tech-label mb-2 text-navy/70">
                      {t(ACKNOWLEDGEMENT.informationLabel)}
                    </legend>

                    <div className="grid gap-6 md:grid-cols-2">
                      <label className="block">
                        <span className="text-small font-medium text-navy-900">
                          {t(ACKNOWLEDGEMENT.fullNameLabel)}
                        </span>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                          placeholder={t(ACKNOWLEDGEMENT.fullNamePlaceholder)}
                          className="mt-2 w-full rounded-md border border-navy/15 bg-neutralx-50 px-4 py-3 text-body text-navy-900 placeholder:text-navy/40 focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/30"
                        />
                      </label>

                      <label className="block">
                        <span className="text-small font-medium text-navy-900">
                          {t(ACKNOWLEDGEMENT.periodLabel)}
                        </span>
                        <input
                          type="text"
                          name="trainingPeriod"
                          required
                          value={period}
                          onChange={(event) => setPeriod(event.target.value)}
                          placeholder={t(ACKNOWLEDGEMENT.periodPlaceholder)}
                          className="mt-2 w-full rounded-md border border-navy/15 bg-neutralx-50 px-4 py-3 text-body text-navy-900 placeholder:text-navy/40 focus:border-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-green/30"
                        />
                      </label>
                    </div>
                  </fieldset>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      required
                      className="mt-1 h-4 w-4 shrink-0 rounded border-navy/20 text-green focus:ring-2 focus:ring-green/40"
                    />
                    <span className="text-small text-navy-900">{t(ACKNOWLEDGEMENT.consent)}</span>
                  </label>

                  {status === 'error' && errorMessage ? (
                    <div
                      role="alert"
                      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-small text-red-800"
                    >
                      {errorMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={cn(
                      'group inline-flex items-center gap-3 rounded-md bg-navy px-6 py-3.5 text-small font-medium text-white transition-all duration-base',
                      status === 'submitting'
                        ? 'cursor-not-allowed opacity-70'
                        : 'hover:-translate-y-0.5 hover:bg-green hover:shadow-card-hover',
                    )}
                  >
                    {status === 'submitting'
                      ? t(ACKNOWLEDGEMENT.submitting)
                      : t(ACKNOWLEDGEMENT.submit)}
                    <Send
                      className="h-4 w-4 transition-transform duration-base ease-technical group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
