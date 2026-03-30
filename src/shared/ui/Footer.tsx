import type { SocialLink } from '@/content/site-content';
import { Container } from '@/shared/ui/Container';

type FooterProps = {
  socialLinks: readonly SocialLink[];
};

export function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightYears = currentYear > 2011 ? `2011-${currentYear}` : '2011';

  return (
    <footer className="border-t border-white/8 bg-[rgba(10,10,11,0.95)] py-8">
      <Container className="flex flex-col gap-4 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>&copy; {copyrightYears} Tim Skoglund - Black and grey tattoo artist</p>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-accent)]">
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
