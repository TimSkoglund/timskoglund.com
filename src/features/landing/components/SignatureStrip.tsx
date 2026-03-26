import { Diamond, Feather, PenTool } from 'lucide-react';
import type { ValueCard } from '@/content/site-content';
import { Container } from '@/shared/ui/Container';

const icons = [Diamond, PenTool, Feather];

type SignatureStripProps = {
  values: readonly ValueCard[];
};

export function SignatureStrip({ values }: SignatureStripProps) {
  return (
    <section id="style" className="relative border-y border-black/5 bg-[var(--color-paper)] py-20 text-[var(--color-paper-ink)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(215,184,118,0.18),transparent_60%)]" />
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = icons[index] ?? Feather;

            return (
              <article
                key={value.title}
                className="flex flex-col items-center border-black/10 text-center md:border-r md:px-8 md:last:border-r-0"
              >
                <Icon className="mb-6 h-7 w-7 text-[var(--color-paper-accent)]" strokeWidth={1.5} />
                <h3 className="font-display text-4xl leading-none">{value.title}</h3>
                <p className="mt-3 text-sm tracking-[0.2em] uppercase text-[var(--color-paper-accent)]">{value.subtitle}</p>
                <p className="mt-4 max-w-xs text-sm leading-7 text-black/65">{value.copy}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
