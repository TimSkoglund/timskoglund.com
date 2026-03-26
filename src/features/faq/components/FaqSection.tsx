import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Printer, X } from 'lucide-react';
import type { CareGuideContent, FaqItem } from '@/content/site-content';
import { Container } from '@/shared/ui/Container';
import { SectionHeading } from '@/shared/ui/SectionHeading';

type FaqSectionProps = {
  items: readonly FaqItem[];
  careGuide: CareGuideContent;
};

export function FaqSection({ items, careGuide }: FaqSectionProps) {
  const [page, setPage] = useState(0);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [activePdfResource, setActivePdfResource] = useState<NonNullable<FaqItem['resources']>[number] | null>(null);
  const pdfFrameRef = useRef<HTMLIFrameElement | null>(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
  const isAnyOverlayOpen = isCareGuideOpen || activePdfResource !== null;
  const activePdfTitle = activePdfResource?.label ?? '';

  useEffect(() => {
    if (!isAnyOverlayOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCareGuideOpen(false);
        setActivePdfResource(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnyOverlayOpen]);

  const handleDownload = () => {
    const content = [careGuide.title, '', ...careGuide.paragraphs].join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skotselrad-tatuering.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200');

    if (!printWindow) {
      return;
    }

    const paragraphs = careGuide.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="sv">
        <head>
          <meta charset="utf-8" />
          <title>${careGuide.title}</title>
          <style>
            body {
              font-family: Georgia, serif;
              margin: 48px;
              color: #1f160d;
              line-height: 1.7;
            }
            h1 {
              margin: 0 0 24px;
              font-size: 32px;
            }
            p {
              margin: 0 0 18px;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <h1>${careGuide.title}</h1>
          ${paragraphs}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handlePdfPrint = () => {
    if (pdfFrameRef.current?.contentWindow) {
      pdfFrameRef.current.contentWindow.focus();
      pdfFrameRef.current.contentWindow.print();
      return;
    }

    if (activePdfResource?.pdfSrc) {
      const pdfWindow = window.open(activePdfResource.pdfSrc, '_blank', 'noopener,noreferrer');
      pdfWindow?.focus();
      pdfWindow?.print();
    }
  };

  return (
    <>
      <section
        id="faq"
        className="border-y border-white/6 bg-[linear-gradient(180deg,#111214_0%,#17181b_100%)] py-24"
      >
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Vanliga frågor"
            body="Här kan du hitta svar på vanligt förekommande frågor, såsom vad man bör tänka på inför bokning, skötselråd och mer."
            centered={false}
          />

          <div className="mt-12 grid gap-4">
            {currentItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-[1.75rem] border border-white/8 bg-white/[0.03] px-6 py-5 open:border-[var(--color-accent)]/35 open:bg-white/[0.05]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-[var(--color-heading)]">
                  <span>{item.question}</span>
                  <span className="text-[var(--color-accent)] transition group-open:rotate-45">+</span>
                </summary>
                <div className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
                  <p>{item.answer}</p>
                  {item.resources?.length ? (
                    <div className="mt-4 flex flex-col items-start gap-3">
                      {item.resources.map((resource) => (
                        <button
                          key={resource.href}
                          type="button"
                          onClick={() => {
                            if (resource.pdfSrc) {
                              setActivePdfResource(resource);
                              return;
                            }

                            window.open(resource.href, '_blank', 'noreferrer');
                          }}
                          className="inline-flex items-center rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/8 px-4 py-2 text-sm font-semibold tracking-[0.08em] uppercase text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/14 hover:text-[var(--color-accent)]"
                        >
                          {resource.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {item.actionLabel ? (
                    <button
                      type="button"
                      onClick={() => setIsCareGuideOpen(true)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/8 px-5 py-2 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/14"
                    >
                      {item.actionLabel}
                    </button>
                  ) : null}
                </div>
              </details>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
                disabled={page === 0}
                aria-label="Föregående FAQ-sida"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/[0.03] text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPage(index)}
                    aria-label={`Gå till FAQ-sida ${index + 1}`}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
                      page === index
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[#17120c]'
                        : 'border-[var(--color-line)] bg-white/[0.03] text-[var(--color-heading)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPage((currentPage) => Math.min(totalPages - 1, currentPage + 1))}
                disabled={page === totalPages - 1}
                aria-label="Nästa FAQ-sida"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/[0.03] text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      {isCareGuideOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,8,9,0.82)] px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="care-guide-title">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[var(--color-accent)]/20 bg-[linear-gradient(180deg,rgba(18,18,19,0.98),rgba(12,12,13,0.98))] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => setIsCareGuideOpen(false)}
              aria-label="Stäng skötselråd"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-heading)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[90vh] overflow-y-auto px-6 py-8 md:px-10 md:py-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Eftervård</p>
              <h3 id="care-guide-title" className="mt-4 max-w-2xl font-display text-4xl leading-none text-[var(--color-heading)] md:text-5xl">
                {careGuide.title}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {careGuide.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 px-5 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/16"
                >
                  <Printer className="h-4 w-4" />
                  Skriv ut
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-heading)] transition hover:border-[var(--color-accent)]/35 hover:text-[var(--color-accent)]"
                >
                  <Download className="h-4 w-4" />
                  Ladda ner
                </button>
                <button
                  type="button"
                  onClick={() => setIsCareGuideOpen(false)}
                  className="inline-flex min-h-12 items-center rounded-full border border-white/10 bg-transparent px-5 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] transition hover:border-white/20 hover:text-[var(--color-heading)]"
                >
                  Tillbaka
                </button>
              </div>

              <div className="mt-8 h-px bg-[linear-gradient(90deg,rgba(214,183,118,0),rgba(214,183,118,0.4),rgba(214,183,118,0))]" />

              <div className="mt-8 space-y-6">
                {careGuide.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[var(--color-muted)] md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activePdfResource ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,8,9,0.82)] px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="pdf-resource-title">
          <div className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-[var(--color-accent)]/20 bg-[linear-gradient(180deg,rgba(18,18,19,0.98),rgba(12,12,13,0.98))] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => setActivePdfResource(null)}
              aria-label="Stäng dokument"
              className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--color-heading)] transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-white/8 px-6 py-8 md:px-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Färginformation</p>
              <h3 id="pdf-resource-title" className="mt-4 max-w-2xl font-display text-4xl leading-none text-[var(--color-heading)] md:text-5xl">
                {activePdfTitle}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                Dokumentet visas direkt här. Du kan skriva ut, ladda ner eller stänga fönstret och fortsätta på sidan.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePdfPrint}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 px-5 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/16"
                >
                  <Printer className="h-4 w-4" />
                  Skriv ut
                </button>
                <a
                  href={activePdfResource.pdfSrc}
                  download={activePdfResource.downloadName}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-heading)] transition hover:border-[var(--color-accent)]/35 hover:text-[var(--color-accent)]"
                >
                  <Download className="h-4 w-4" />
                  Ladda ner
                </a>
                <button
                  type="button"
                  onClick={() => setActivePdfResource(null)}
                  className="inline-flex min-h-12 items-center rounded-full border border-white/10 bg-transparent px-5 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] transition hover:border-white/20 hover:text-[var(--color-heading)]"
                >
                  Tillbaka
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-black/20 p-3 md:p-4">
              <iframe
                ref={pdfFrameRef}
                title={activePdfTitle}
                src={activePdfResource.pdfSrc}
                className="h-full w-full rounded-[1.25rem] border border-white/8 bg-white"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
