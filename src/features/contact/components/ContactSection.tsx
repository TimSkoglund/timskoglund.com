import type { ReactNode } from 'react';
import { FormEvent, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ContactContent } from '@/content/site-content';
import { Container } from '@/shared/ui/Container';

type ContactSectionProps = {
  contact: ContactContent;
};

export function ContactSection({ contact }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const phone = String(form.get('phone') ?? '');
    const message = String(form.get('message') ?? '');

    const body = encodeURIComponent(
      `Namn: ${name}\nE-post: ${email}\nTelefon: ${phone}\n\nProjektbeskrivning:\n${message}`,
    );

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Booking inquiry')}&body=${body}`;
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--color-paper)] py-24 text-[var(--color-paper-ink)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,184,118,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-paper-accent-strong)]">
            {contact.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] text-[var(--color-paper-heading)] drop-shadow-[0_1px_0_rgba(255,255,255,0.2)] md:text-6xl lg:text-[4.25rem]">
            {contact.title}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-paper-copy)] md:text-lg md:leading-8">
            {contact.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <aside className="min-w-0 w-full max-w-full rounded-[2rem] border border-black/10 bg-white/55 p-6 shadow-[0_35px_80px_rgba(27,21,13,0.08)] backdrop-blur-sm md:p-8">
            <div className="lg:flex lg:h-full lg:flex-col">
              <div className="space-y-8">
                <div className="flex min-w-0 flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-[2px] border-[var(--color-paper-accent)] shadow-[0_18px_35px_rgba(27,21,13,0.14)] ring-1 ring-[rgba(157,114,66,0.1)]">
                    <img
                      src="/media/tim profile.png"
                      alt="Tim Skoglund"
                      className="h-full w-full object-cover sepia-[0.22] saturate-[0.82] contrast-[0.96] brightness-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(255,248,235,0.34),transparent_42%),linear-gradient(180deg,rgba(214,183,118,0.08),rgba(39,29,19,0.1))]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-paper-accent)]">Tim Skoglund</p>
                    <p className="mt-2 font-display text-3xl leading-none text-[var(--color-paper-heading)]">Kontakta mig</p>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--color-paper-copy)]">
                      Snabbast svar kontaktar du mig på{' '}
                      <a
                        href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-paper-accent-strong)] underline decoration-[rgba(157,114,66,0.32)] underline-offset-4 transition hover:text-[var(--color-paper-accent)]"
                      >
                        Instagram
                      </a>{' '}
                      eller{' '}
                      <a
                        href="https://www.facebook.com/timskoglund"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-paper-accent-strong)] underline decoration-[rgba(157,114,66,0.32)] underline-offset-4 transition hover:text-[var(--color-paper-accent)]"
                      >
                        Facebook
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="h-px bg-[linear-gradient(90deg,rgba(157,114,66,0),rgba(157,114,66,0.28),rgba(157,114,66,0))]" />

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-paper-accent)]">Studio</p>
                    <a
                      href={contact.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 flex w-full min-w-0 items-start justify-between gap-3 text-base leading-8 transition hover:text-[var(--color-paper-accent)] sm:text-lg"
                    >
                      <span className="min-w-0 break-words">{contact.address}</span>
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0" />
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-paper-accent)]">Email</p>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="mt-3 max-w-full break-all text-left text-base transition hover:text-[var(--color-paper-accent)] sm:text-lg"
                    >
                      {contact.email}
                    </button>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-paper-accent)]">Phone</p>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="mt-3 block text-base transition hover:text-[var(--color-paper-accent)] sm:text-lg">
                      {contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-paper-accent)]">Instagram / TikTok</p>
                    <div className="mt-3 flex flex-col items-start gap-3 text-base sm:flex-row sm:flex-wrap sm:items-center sm:text-lg">
                      <a
                        href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-[var(--color-paper-accent)]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(157,114,66,0.24)] bg-[rgba(157,114,66,0.08)] text-[var(--color-paper-accent)]">
                          <InstagramIcon className="h-4 w-4" />
                        </span>
                        {contact.instagram.replace('@', '')}
                      </a>
                      <span className="text-black/30">/</span>
                      <a
                        href="https://www.tiktok.com/@timskoglund"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-[var(--color-paper-accent)]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(157,114,66,0.24)] bg-[rgba(157,114,66,0.08)] text-[var(--color-paper-accent)]">
                          <TikTokIcon className="h-4 w-4" />
                        </span>
                        timskoglund
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:mt-auto" />
            </div>

          </aside>

          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="min-w-0 w-full max-w-full rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_35px_80px_rgba(27,21,13,0.08)] backdrop-blur-sm md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Namn">
                <input name="name" required className="contact-input" placeholder="Ditt namn" />
              </Field>
              <Field label="E-post">
                <input name="email" type="email" required className="contact-input" placeholder="namn@email.se" />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Telefon">
                <input name="phone" className="contact-input" placeholder="070-000 00 00" />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Projektbeskrivning">
                <textarea
                  name="message"
                  required
                  rows={7}
                  className="contact-input min-h-[12rem] resize-y"
                  placeholder="Beskriv motiv, placering, storlek, referenser och vilken känsla du vill att projektet ska bära."
                />
              </Field>
            </div>
            <button
              type="submit"
              className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--color-paper-accent)] bg-transparent px-8 text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-paper-ink)] transition hover:bg-[var(--color-paper-accent)] hover:text-white"
            >
              Skicka bokningsförfrågan
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

type FieldProps = {
  label: string;
  children: ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-paper-accent)]">
        {label}
      </span>
      {children}
    </label>
  );
}

type IconProps = {
  className?: string;
};

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14.54 3c.36 2 1.53 3.55 3.46 4.2v2.57a7.13 7.13 0 0 1-3.2-1.03v5.2c0 3.32-2.44 5.7-5.77 5.7A5.5 5.5 0 0 1 3.5 14.2a5.55 5.55 0 0 1 7.26-5.28v2.7a2.98 2.98 0 0 0-1.64-.03A2.8 2.8 0 0 0 7.1 14.3c0 1.58 1.23 2.79 2.73 2.79 1.48 0 2.58-1.03 2.58-2.96V3h2.13Z" />
    </svg>
  );
}
