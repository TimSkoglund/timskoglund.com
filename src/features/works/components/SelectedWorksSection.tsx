import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WorkItem } from '@/content/site-content';
import { WorkCard } from '@/features/works/components/WorkCard';
import { WorksLightbox } from '@/features/works/components/WorksLightbox';
import { Container } from '@/shared/ui/Container';
import { SectionHeading } from '@/shared/ui/SectionHeading';

type SelectedWorksSectionProps = {
  works: readonly WorkItem[];
};

export function SelectedWorksSection({ works }: SelectedWorksSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const worksPerPage = 6;
  const totalPages = Math.ceil(works.length / worksPerPage);
  const startIndex = currentPage * worksPerPage;
  const paginatedWorks = works.slice(startIndex, startIndex + worksPerPage);

  return (
    <section
      id="selected-works"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(215,184,118,0.12),transparent_22%),linear-gradient(180deg,#0b0b0c_0%,#101011_100%)] py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Arbeten"
          title="Ett urval av mina tatueringar"
        />

        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-[var(--color-muted)] md:text-lg">
          Vill du se mer av mina arbeten kan du kolla på{' '}
          <a
            href="https://www.instagram.com/timskoglund"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-accent)] transition hover:text-[var(--color-heading)]"
          >
            Instagram
          </a>{' '}
          eller{' '}
          <a
            href="https://www.tiktok.com/@timskoglund"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-accent)] transition hover:text-[var(--color-heading)]"
          >
            TikTok
          </a>
          .
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {paginatedWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              onOpen={() => setActiveIndex(startIndex + index)}
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
              disabled={currentPage === 0}
              aria-label="Föregående sida"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/[0.03] text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  onClick={() => setCurrentPage(pageIndex)}
                  aria-label={`Gå till sida ${pageIndex + 1}`}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition ${
                    currentPage === pageIndex
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[#17120c]'
                      : 'border-[var(--color-line)] bg-white/[0.03] text-[var(--color-heading)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  {pageIndex + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages - 1, page + 1))}
              disabled={currentPage === totalPages - 1}
              aria-label="Nästa sida"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/[0.03] text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </Container>

      <WorksLightbox
        works={works}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
