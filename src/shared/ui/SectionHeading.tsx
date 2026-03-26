import { cn } from '@/shared/lib/cn';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, body, centered = true }: SectionHeadingProps) {
  return (
    <div className={cn('space-y-4', centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl')}>
      <p className="tracking-[0.32em] text-[0.72rem] font-semibold uppercase text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-5xl leading-none text-[var(--color-heading)] md:text-6xl">{title}</h2>
      {body ? <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg">{body}</p> : null}
    </div>
  );
}
