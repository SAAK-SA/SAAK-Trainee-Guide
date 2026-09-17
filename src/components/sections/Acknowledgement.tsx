import { useState } from 'react';
import { Check, Send, FileCheck2, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ACKNOWLEDGEMENT } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { cn } from '@/lib/cn';

/**
 * Where the trainee's acknowledgement is sent.
 *
 * Default is FormSubmit.co, a free relay that emails every submission
 * to the address in the URL — no account or backend needed.
 *
 *   Before the first live submission, FormSubmit sends ONE verification
 *   email to AbdulazizA@saaksa.com. Click the link inside it and every
 *   subsequent submission arrives as an email automatically.
 *
 * To switch to another provider (Formspree, a Google Apps Script web
 * app, etc.), paste the endpoint URL below and — if the new provider
 * wants form-encoded data instead of JSON — flip `USE_JSON` to false.
 */
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/AbdulazizA@saaksa.com';
const USE_JSON = true;

/** Path to the work-regulations document, relative to public/. */
const REGULATIONS_URL = 'work-regulations.pdf';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Acknowledgement() {
  const { t, locale } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [period, setPeriod] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

    const payload: Record<string, string | boolean> = {
      fullName,
      trainingPeriod: period,
      consent,
      language: locale,
      submittedAt: new Date().toISOString(),
      // FormSubmit hooks — ignored by other providers.
      _subject: `SAAK International — Trainee acknowledgement (${fullName})`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      setStatus('submitting');
      setErrorMessage('');
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: USE_JSON
          ? { 'Content-Type': 'application/json', Accept: 'application/json' }
          : { Accept: 'application/json' },
        body: USE_JSON
          ? JSON.stringify(payload)
          : new URLSearchParams(
              Object.fromEntries(
                Object.entries(payload).map(([k, v]) => [k, String(v)]),
              ),
            ),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(t(ACKNOWLEDGEMENT.errorGeneric));
    }
  };

  const regulationsHref = `${import.meta.env.BASE_URL}${REGULATIONS_URL}`;

  return (
    <div id="acknowledgement" aria-labelledby="acknowledgement-heading">
      <SectionHeading
        id="acknowledgement"
        eyebrow={t(ACKNOWLEDGEMENT.eyebrow)}
        title={t(ACKNOWLEDGEMENT.title)}
        icon={FileCheck2}
      />

      {status === 'success' ? (
        <section className="mx-auto mt-10 max-w-2xl animate-success-in rounded-lg border border-neutralx-200 bg-white p-10 text-center shadow-md">
          <span
            className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-pill text-green"
            style={{ background: 'rgba(18,161,80,0.12)' }}
            aria-hidden="true"
          >
            <Check className="h-9 w-9" strokeWidth={2.5} />
          </span>
          <h3 className="mt-5 text-h2 text-navy-900">{t(ACKNOWLEDGEMENT.successTitle)}</h3>
          <p className="mt-3 text-body text-neutralx-500">{t(ACKNOWLEDGEMENT.successBody)}</p>
        </section>
      ) : (
        <form
          onSubmit={submit}
          className="mx-auto mt-10 max-w-2xl rounded-lg border border-neutralx-200 bg-white p-8 shadow-sm md:p-10"
          noValidate
        >
          <p className="rounded-md border-s-4 border-green bg-cream-50 p-4 text-body text-navy-900">
            {t(ACKNOWLEDGEMENT.statement)}
          </p>

          {/* Work regulations link — trainees open it before signing. */}
          <aside className="mt-6 flex flex-col gap-4 rounded-lg border border-neutralx-200 bg-cream-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white shadow-sm"
                style={{
                  background:
                    'linear-gradient(135deg, var(--saak-navy), var(--saak-navy-700))',
                }}
                aria-hidden="true"
              >
                <FileText className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-small font-bold text-navy-900">
                  {t(ACKNOWLEDGEMENT.regulationsLabel)}
                </p>
                <p className="mt-1 text-small text-neutralx-500">
                  {t(ACKNOWLEDGEMENT.regulationsHint)}
                </p>
              </div>
            </div>
            <a
              href={regulationsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-navy bg-white px-5 py-2.5 text-small font-semibold text-navy transition-all duration-base hover:-translate-y-0.5 hover:bg-navy hover:text-white hover:shadow-sm"
            >
              {t(ACKNOWLEDGEMENT.regulationsAction)}
              <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </aside>

          <fieldset className="mt-6 grid gap-5 md:grid-cols-2">
            <legend className="sr-only">{t(ACKNOWLEDGEMENT.informationLabel)}</legend>

            <label className="flex flex-col gap-1.5">
              <span className="text-small font-semibold text-navy-900">
                {t(ACKNOWLEDGEMENT.fullNameLabel)}
              </span>
              <input
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder={t(ACKNOWLEDGEMENT.fullNamePlaceholder)}
                className="rounded-sm border border-neutralx-200 bg-white px-4 py-3 text-body text-navy-900 placeholder:text-neutralx-400 transition-all focus:border-green focus:outline-none focus:ring-4 focus:ring-green/20"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-small font-semibold text-navy-900">
                {t(ACKNOWLEDGEMENT.periodLabel)}
              </span>
              <input
                type="text"
                required
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                placeholder={t(ACKNOWLEDGEMENT.periodPlaceholder)}
                className="rounded-sm border border-neutralx-200 bg-white px-4 py-3 text-body text-navy-900 placeholder:text-neutralx-400 transition-all focus:border-green focus:outline-none focus:ring-4 focus:ring-green/20"
              />
            </label>
          </fieldset>

          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              className="mt-1 h-5 w-5 shrink-0 rounded-sm border-neutralx-300 text-green focus:ring-2 focus:ring-green/40"
              style={{ accentColor: 'var(--saak-green)' }}
            />
            <span className="text-small text-navy-900">{t(ACKNOWLEDGEMENT.consent)}</span>
          </label>

          {status === 'error' && errorMessage ? (
            <div
              role="alert"
              className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-small text-red-800"
            >
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TechnicalLabel tone="muted">{t(ACKNOWLEDGEMENT.informationLabel)}</TechnicalLabel>
            <button
              type="submit"
              disabled={status === 'submitting' || !consent}
              className={cn(
                'group inline-flex items-center gap-2.5 rounded-pill bg-green px-8 py-4 text-small font-semibold text-white shadow-sm transition-all duration-base',
                status === 'submitting' || !consent
                  ? 'cursor-not-allowed opacity-40'
                  : 'hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md',
              )}
            >
              {status === 'submitting'
                ? t(ACKNOWLEDGEMENT.submitting)
                : t(ACKNOWLEDGEMENT.submit)}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
