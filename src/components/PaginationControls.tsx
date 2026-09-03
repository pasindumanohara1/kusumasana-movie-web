import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsRight, Loader2 } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages = 50,
  onPageChange,
  onLoadMore,
  isLoadingMore = false,
  hasMore = true
}) => {
  // Generate a sliding window of page numbers around currentPage
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const windowSize = 2; // pages on either side

    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(totalPages, currentPage + windowSize);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div id="pagination-controls-wrapper" className="mt-12 space-y-6">
      {/* 1. View More / Load More Primary Action */}
      {onLoadMore && hasMore && (
        <div className="flex justify-center">
          <button
            id="view-more-load-btn"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#16213e] hover:bg-[#1f2d52] border border-white/15 hover:border-blue-500/50 text-white font-bold text-sm shadow-xl shadow-black/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="font-sinhala">පූරණය වෙමින් පවතී...</span>
              </>
            ) : (
              <>
                <ChevronsRight className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="font-sinhala">තවත් පෙන්වන්න (View More)</span>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-mono">
                  +20 Items
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 2. Structured Page Numbers & Next / Prev Navigation */}
      <nav
        id="numbered-pagination-nav"
        aria-label="Pagination navigation"
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-4 border-t border-white/10"
      >
        {/* Previous Page Button */}
        <button
          id="prev-page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16213e] hover:bg-[#1f2d52] border border-white/10 text-xs sm:text-sm font-semibold text-gray-200 transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-sinhala">පෙර පිටුව</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pageNumbers.map((p, idx) => {
            if (typeof p === 'string') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-gray-500 text-xs select-none"
                >
                  ...
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={`page-${p}`}
                id={`page-btn-${p}`}
                onClick={() => onPageChange(p)}
                className={`min-w-[36px] h-9 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 border border-blue-400/50'
                    : 'bg-[#16213e] hover:bg-[#1f2d52] border border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          id="next-page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <span className="font-sinhala">ඊළඟ පිටුව</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Page status caption */}
      <p className="text-center text-xs text-[#a0a0b0] font-sinhala">
        වත්මන් පිටුව: <span className="font-bold text-white font-mono">{currentPage}</span> / <span className="font-mono">{totalPages}</span>
      </p>
    </div>
  );
};
