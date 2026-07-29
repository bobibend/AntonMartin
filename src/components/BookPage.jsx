import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import './BookPage.css';

export default function BookPage({
  chapterTitle,
  paragraphs,
  currentPageIndex,
  onPageChange,
  onTotalPagesChange,
  fontSize,
  bookTitle,
  author,
  onPageForward,
  onPageBackward,
  bookmarkCharIndex,
  onToggleBookmark,
  currentChapterIndex,
  totalChapters,
  onSelectChapter,
  language = 'HU'
}) {
  const TRANSLATIONS = {
    HU: {
      bookmarkSaved: "Könyvjelző elmentve ezen a lapon",
      prevChapter: "Előző fejezet",
      nextChapter: "Következő fejezet",
      chars: "karakter",
      removeBookmark: "Könyvjelző eltávolítása erről a lapról",
      addBookmark: "Könyvjelző elmentése erről a lapról",
      bookmarkLabel: "Könyvjelző elmentése"
    },
    EN: {
      bookmarkSaved: "Bookmark saved on this page",
      prevChapter: "Previous chapter",
      nextChapter: "Next chapter",
      chars: "characters",
      removeBookmark: "Remove bookmark from this page",
      addBookmark: "Save bookmark on this page",
      bookmarkLabel: "Save bookmark"
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.HU;

  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const [totalPages, setTotalPages] = useState(1);
  const [columnGap, setColumnGap] = useState(40); // default 40px gap
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [lastRestoredChapter, setLastRestoredChapter] = useState(null);
  const isRestoringRef = useRef(false);

  // Sync references to current values to bypass effect dependency triggers
  const currentPageIndexRef = useRef(currentPageIndex);
  const columnGapRef = useRef(columnGap);

  useEffect(() => {
    currentPageIndexRef.current = currentPageIndex;
  }, [currentPageIndex]);

  useEffect(() => {
    columnGapRef.current = columnGap;
  }, [columnGap]);

  // Reset bookmark restoration flag and block scroll handlers when chapter changes
  useEffect(() => {
    if (chapterTitle !== lastRestoredChapter) {
      setLastRestoredChapter(null);
      if (bookmarkCharIndex !== undefined && bookmarkCharIndex !== null) {
        isRestoringRef.current = true;
      } else {
        isRestoringRef.current = false;
      }
    }
  }, [chapterTitle, bookmarkCharIndex, lastRestoredChapter]);

  // Recalculate column gap on mobile for better spacing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnGap(20);
      } else {
        setColumnGap(40);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // run initially
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate total pages based on layout scroll dimensions
  const calculatePages = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;

    // We force a layout reflow to make sure we get accurate measurements
    const clientWidth = el.clientWidth;
    const scrollWidth = el.scrollWidth;
    const clientHeight = el.clientHeight;
    const scrollHeight = el.scrollHeight;

    if (clientWidth === 0 || clientHeight === 0) return;

    const maxScrollX = scrollWidth - clientWidth;
    const maxScrollY = scrollHeight - clientHeight;

    let N = 1;
    const isVertical = maxScrollY > maxScrollX && maxScrollY > 10;
    if (isVertical) {
      // Vertical pagination is disabled, scroll is continuous fluid
      N = 1;
    } else {
      // Horizontal pagination
      N = Math.round((scrollWidth + columnGap) / (clientWidth + columnGap));
    }

    const calculatedTotal = Math.max(1, N);
    setTotalPages(calculatedTotal);
    onTotalPagesChange(calculatedTotal);

    // Restore scroll position/page if a bookmark is saved for this chapter and not yet restored
    if (bookmarkCharIndex !== undefined && bookmarkCharIndex !== null && lastRestoredChapter !== chapterTitle) {
      const totalChars = paragraphs.join('\n').length;
      if (totalChars > 0) {
        const charRatio = bookmarkCharIndex / totalChars;
        const pct = charRatio * 100;

        isRestoringRef.current = true;

        if (isVertical) {
          // Vertical scroll layout
          const ratio = (pct - 5) / 95;
          const targetScrollY = Math.max(0, Math.min(maxScrollY, ratio * maxScrollY));
          el.scrollTop = targetScrollY;
          setScrollTop(targetScrollY);
        } else {
          // Horizontal paging columns layout
          const minPct = calculatedTotal > 0 ? (1 / calculatedTotal) * 100 : 0;
          let targetScrollX = 0;
          if (pct > minPct && 100 - minPct > 0) {
            const scrollRatio = (pct - minPct) / (100 - minPct);
            targetScrollX = Math.max(0, Math.min(maxScrollX, scrollRatio * maxScrollX));
          }

          const pageWidth = clientWidth + columnGap;
          const targetPage = Math.max(0, Math.min(calculatedTotal - 1, Math.round(targetScrollX / pageWidth)));

          onPageChange(targetPage);
          el.scrollLeft = targetPage * pageWidth;
          setScrollLeft(targetPage * pageWidth);
        }

        setLastRestoredChapter(chapterTitle);

        // Clear restoring flag after rendering scroll adjustments
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 200);
      }
    }
  }, [paragraphs, columnGap, bookmarkCharIndex, lastRestoredChapter, chapterTitle, onPageChange, onTotalPagesChange]);

  // Handle manual or programmatic scroll events
  const handleScroll = (e) => {
    if (isRestoringRef.current) return;
    const el = e.currentTarget;
    setScrollLeft(el.scrollLeft);
    setScrollTop(el.scrollTop);

    // Sync currentPageIndex dynamically with scroll position if dimensions are valid
    const maxScrollX = el.scrollWidth - el.clientWidth;
    const maxScrollY = el.scrollHeight - el.clientHeight;

    if (!(maxScrollY > maxScrollX && maxScrollY > 10)) {
      // Horizontal sync (only for horizontal columns layout)
      const pageWidth = el.clientWidth + columnGap;
      if (pageWidth > 0) {
        const newPage = Math.round(el.scrollLeft / pageWidth);
        if (newPage !== currentPageIndex && newPage < totalPages) {
          onPageChange(newPage);
        }
      }
    }
  };

  // Re-calculate pages when chapter, paragraphs, font size, or window size changes
  useLayoutEffect(() => {
    // Wait a brief tick for the browser to render typography
    const timer = setTimeout(() => {
      calculatePages();
    }, 50);

    return () => clearTimeout(timer);
  }, [paragraphs, fontSize, columnGap, chapterTitle, calculatePages]);

  // Recalculate on window resize
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calculatePages();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [columnGap, calculatePages]);

  const lastChapterRef = useRef(chapterTitle);

  // Unified scroll synchronization effect for page and chapter transitions
  useEffect(() => {
    const el = contentRef.current;
    if (el && (bookmarkCharIndex === undefined || bookmarkCharIndex === null)) {
      const isNewChapter = lastChapterRef.current !== chapterTitle;
      lastChapterRef.current = chapterTitle;

      const pageWidth = el.clientWidth + columnGap;
      const targetScroll = currentPageIndex * pageWidth;

      if (isNewChapter) {
        // Instant scroll for new chapter
        const restoreScroll = () => {
          el.scrollLeft = targetScroll;
          el.scrollTop = 0;
          setScrollLeft(targetScroll);
          setScrollTop(0);
        };
        restoreScroll();
        // Schedule a second restore in case of asynchronous layout reflows
        const timer = setTimeout(restoreScroll, 100);
        return () => clearTimeout(timer);
      } else {
        // Smooth scroll for page turn in same chapter
        const maxScrollX = el.scrollWidth - el.clientWidth;
        const maxScrollY = el.scrollHeight - el.clientHeight;
        if (!(maxScrollY > maxScrollX && maxScrollY > 10)) {
          if (Math.abs(el.scrollLeft - targetScroll) > 10) {
            el.scrollTo({
              left: targetScroll,
              behavior: 'smooth'
            });
          }
        }
      }
    } else if (el) {
      lastChapterRef.current = chapterTitle;
    }
  }, [currentPageIndex, chapterTitle, columnGap, bookmarkCharIndex]);

  // Scroll window to the top on chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [chapterTitle]);

  // Click vs Double Click handler on the page surface
  const handlePageClick = (e) => {
    // Ignore clicks on control panels, links, buttons, or scrollbars
    if (e.target.closest('.no-click-paging') || e.target.closest('button') || e.target.closest('input')) {
      return;
    }

    if (clickTimeoutRef.current) {
      // Second click within 250ms -> Double click!
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      onPageBackward();
    } else {
      // First click -> wait to see if double click follows
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
        onPageForward();
      }, 250);
    }
  };

  // Cleanup click timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const totalChars = paragraphs.join('\n').length;
  const el = contentRef.current;
  let pct = 0;
  let isBookmarkedOnCurrentPage = false;

  if (el) {
    const maxScrollX = el.scrollWidth - el.clientWidth;
    const maxScrollY = el.scrollHeight - el.clientHeight;

    if (maxScrollY > maxScrollX && maxScrollY > 10) {
      // Vertical scroll layout
      const ratio = Math.min(1, Math.max(0, scrollTop / maxScrollY));
      pct = 5 + ratio * 95;

      if (bookmarkCharIndex !== undefined && bookmarkCharIndex !== null && totalChars > 0) {
        const bookmarkPct = (bookmarkCharIndex / totalChars) * 100;
        const bookmarkRatio = (bookmarkPct - 5) / 95;
        const targetScrollY = bookmarkRatio * maxScrollY;
        isBookmarkedOnCurrentPage = Math.abs(scrollTop - targetScrollY) < 150; // within 150px range
      }
    } else {
      // Horizontal paging columns layout
      const minPct = totalPages > 0 ? (1 / totalPages) * 100 : 0;
      pct = minPct;
      if (maxScrollX > 0) {
        const ratio = Math.min(1, Math.max(0, scrollLeft / maxScrollX));
        pct = minPct + ratio * (100 - minPct);
      }

      if (bookmarkCharIndex !== undefined && bookmarkCharIndex !== null && totalChars > 0) {
        const bookmarkPct = (bookmarkCharIndex / totalChars) * 100;
        let targetScrollX = 0;
        if (bookmarkPct > minPct && 100 - minPct > 0) {
          const scrollRatio = (bookmarkPct - minPct) / (100 - minPct);
          targetScrollX = Math.max(0, Math.min(maxScrollX, scrollRatio * maxScrollX));
        }
        const pageWidth = el.clientWidth + columnGap;
        const bookmarkPage = Math.max(0, Math.min(totalPages - 1, Math.round(targetScrollX / pageWidth)));
        isBookmarkedOnCurrentPage = (currentPageIndex === bookmarkPage);
      }
    }
  } else {
    pct = totalPages > 0 ? ((currentPageIndex + 1) / totalPages) * 100 : 0;

    if (bookmarkCharIndex !== undefined && bookmarkCharIndex !== null && totalChars > 0) {
      const bookmarkRatio = bookmarkCharIndex / totalChars;
      const bookmarkPage = Math.max(0, Math.min(totalPages - 1, Math.round(bookmarkRatio * totalPages)));
      isBookmarkedOnCurrentPage = (currentPageIndex === bookmarkPage);
    }
  }

  const currentCharIndex = Math.min(totalChars, Math.round((pct / 100) * totalChars));

  return (
    <div className="book-page-outer-container" ref={containerRef}>
      {/* Dynamic book page sheet */}
      <div
        className="book-page-sheet"
        onClick={handlePageClick}
        style={{ '--book-font-size': `${fontSize}px` }}
      >
        {/* Physical 3D folded bookmark ribbon at top right */}
        {isBookmarkedOnCurrentPage && (
          <div className="book-page-bookmark-ribbon no-click-paging" title={t.bookmarkSaved}>
            <svg viewBox="0 0 24 38" width="24" height="38" fill="var(--accent-color)" stroke="none">
              <path d="M0 0h24v38l-12-8-12 8z" />
            </svg>
          </div>
        )}

        {/* Word Document Style Header */}
        <header className="book-header no-click-paging">
          <span className="book-header-title">{bookTitle}</span>
          <div className="book-header-chapter-container">
            <button 
              className="chapter-nav-btn prev-chapter"
              disabled={currentChapterIndex === 0}
              onClick={(e) => {
                e.stopPropagation();
                onSelectChapter(currentChapterIndex - 1);
              }}
              title={t.prevChapter}
              aria-label="Previous Chapter"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            
            <span className="book-header-chapter">{chapterTitle}</span>
            
            <button 
              className="chapter-nav-btn next-chapter"
              disabled={currentChapterIndex === totalChapters - 1}
              onClick={(e) => {
                e.stopPropagation();
                onSelectChapter(currentChapterIndex + 1);
              }}
              title={t.nextChapter}
              aria-label="Next Chapter"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <span className="book-header-author">{author}</span>
        </header>

        {/* Text Area with CSS Columns */}
        <main className="book-body-wrapper">
          <div
            className="book-body-content"
            ref={contentRef}
            onScroll={handleScroll}
            style={{
              columnGap: `${columnGap}px`
            }}
          >
            {paragraphs.map((p, idx) => {
              const isDialogue = p.trim().startsWith('–') || p.trim().startsWith('-') || p.trim().startsWith('"') || p.trim().startsWith('„');
              return (
                <p
                  key={idx}
                  className={`book-paragraph ${isDialogue ? 'dialogue' : ''}`}
                >
                  {p}
                </p>
              );
            })}
          </div>
        </main>

        {/* Word Document Style Footer */}
        <footer className="book-footer no-click-paging">
          <div className="book-footer-divider"></div>
          <div className="book-footer-info">
            <div className="book-chapter-progress" title={`${currentCharIndex} / ${totalChars} ${t.chars} (${pct.toFixed(0)}%)`}>
              <div className="book-progress-track">
                <div
                  className="book-progress-fill"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            </div>

            <button
              className={`book-bookmark-btn ${isBookmarkedOnCurrentPage ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // prevent click paging trigger
                if (isBookmarkedOnCurrentPage) {
                  onToggleBookmark(null);
                } else {
                  onToggleBookmark(currentCharIndex);
                }
              }}
              title={isBookmarkedOnCurrentPage ? t.removeBookmark : t.addBookmark}
              aria-label={t.bookmarkLabel}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill={isBookmarkedOnCurrentPage ? "var(--accent-color)" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
