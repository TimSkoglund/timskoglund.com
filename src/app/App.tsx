import { siteContent } from '@/content/site-content';
import { ContactSection } from '@/features/contact/components/ContactSection';
import { FaqSection } from '@/features/faq/components/FaqSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { SignatureStrip } from '@/features/landing/components/SignatureStrip';
import { SelectedWorksSection } from '@/features/works/components/SelectedWorksSection';
import { Footer } from '@/shared/ui/Footer';

export function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <HeroSection hero={siteContent.hero} />
      <main>
        <SelectedWorksSection works={siteContent.works} />
        <SignatureStrip values={siteContent.signatureValues} />
        <FaqSection items={siteContent.faq} careGuide={siteContent.careGuide} />
        <ContactSection contact={siteContent.contact} />
      </main>
      <Footer socialLinks={siteContent.socialLinks} />
    </div>
  );
}
