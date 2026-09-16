import { Phone, Mail, User, MessagesSquare } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CONTACT } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CARD_ICONS = [User, Phone, Mail];

export function Contact() {
  const { t } = useLanguage();

  return (
    <div id="contact" aria-labelledby="contact-heading">
      <SectionHeading
        id="contact"
        eyebrow={t(CONTACT.eyebrow)}
        title={t(CONTACT.title)}
        lead={t(CONTACT.lead)}
        icon={MessagesSquare}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {CONTACT.rows.map((row, index) => {
          const Icon = CARD_ICONS[index] ?? User;
          return (
            <article
              key={row.id}
              className="flex flex-col items-center gap-3 rounded-lg border border-neutralx-200 bg-white p-6 text-center shadow-sm"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-pill text-white shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--saak-navy), var(--saak-navy-700))',
                }}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="text-h3 text-navy-900">{t(row.label)}</h3>
              <p className="text-small font-semibold text-green-700">{t(row.value)}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
