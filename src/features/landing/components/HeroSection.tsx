import type { NavItem } from '@/content/site-content';
import { Container } from '@/shared/ui/Container';

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    lead: string;
    imageSrc: string;
    cta: { label: string; href: string };
    nav: readonly NavItem[];
  };
};

export function HeroSection({ hero }: HeroProps) {
  return (
    <header
      id="about"
      className="relative isolate overflow-hidden border-b border-white/8 bg-[var(--color-background)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: `url(${hero.imageSrc})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,183,118,0.15),transparent_26%),linear-gradient(180deg,rgba(8,8,9,0.22),rgba(8,8,9,0.94))]" />

      <div className="absolute inset-x-0 top-0 z-40 pt-4">
        <Container>
          <nav className="mx-auto flex min-h-20 items-center justify-center px-3 py-3 text-[0.72rem] text-[rgba(236,226,209,0.82)] sm:px-6 sm:text-sm">
            <div className="flex flex-nowrap items-center justify-center gap-3 whitespace-nowrap tracking-[0.18em] uppercase sm:gap-x-5 sm:tracking-[0.22em]">
              {hero.nav.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-[var(--color-accent)]">
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </Container>
      </div>

      <Container className="relative z-10 flex min-h-screen flex-col justify-between py-8 pt-28">

        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-6xl leading-none text-[var(--color-heading)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:text-8xl">
            {hero.title}
          </h1>
          <div className="mt-5 flex w-full items-center justify-center gap-4">
            <span className="h-px w-12 bg-[var(--color-line)] md:w-24" />
            <p className="text-sm tracking-[0.38em] uppercase text-[var(--color-accent)] md:text-base">
              {hero.subtitle}
            </p>
            <span className="h-px w-12 bg-[var(--color-line)] md:w-24" />
          </div>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">{hero.lead}</p>

          <a
            href={hero.cta.href}
            className="mt-12 inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--color-accent)]/55 bg-[var(--color-accent)]/10 px-8 text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-heading)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent)] hover:text-[#16120d]"
          >
            {hero.cta.label}
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <div className="flex justify-center">
            <span
              aria-hidden="true"
              className="block h-21 w-21 opacity-[0.16]"
              style={{
                backgroundColor: 'var(--color-accent)',
                WebkitMaskImage: 'url(/ts-icon.svg)',
                maskImage: 'url(/ts-icon.svg)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(214, 183, 118, 0.08))',
              }}
            />
          </div>
          <span className="h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(214,183,118,0.25),rgba(255,244,220,0.8),rgba(214,183,118,0.25),transparent)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_35px_rgba(214,183,118,0.95)]" />
        </div>
      </Container>
    </header>
  );
}

