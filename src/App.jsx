import React, { useState, useEffect } from 'react';
import bookData from '../book_data.json';
import BackgroundLayer from './components/BackgroundLayer';
import BookPage from './components/BookPage';
import TableOfContents from './components/TableOfContents';
import LibraryPortal from './components/LibraryPortal';
import LandingPage from './components/LandingPage';
import { applyChapterTheme } from './utils/themeHelper';
import './index.css';

function App() {
  const [readerStarted, setReaderStarted] = useState(false);
  const [landingActive, setLandingActive] = useState(true);
  const [landingExiting, setLandingExiting] = useState(false);

  // Hash-based routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/library') {
        setLandingActive(false);
        setLandingExiting(false);
        setReaderStarted(false);
      } else if (hash === '#/reader') {
        setLandingActive(false);
        setLandingExiting(false);
        setReaderStarted(true);
      } else {
        // Default entry path is landing
        setLandingActive(true);
        setLandingExiting(false);
        setReaderStarted(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run initially

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Persistence for user state
  const [currentChapterIndex, setCurrentChapterIndex] = useState(() => {
    return Number(localStorage.getItem('nn-chapter-index')) || 0;
  });
  
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    return Number(localStorage.getItem('nn-page-index')) || 0;
  });

  const [fontSize, setFontSize] = useState(() => {
    return Number(localStorage.getItem('nn-font-size')) || 18;
  });

  const [totalPages, setTotalPages] = useState(1);
  const [pendingPageLast, setPendingPageLast] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('nn-bookmarks');
    return saved ? JSON.parse(saved) : {};
  });

  // Save bookmarks preference
  useEffect(() => {
    localStorage.setItem('nn-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const currentChapter = bookData.chapters[currentChapterIndex] || bookData.chapters[0];

  // Save progress changes
  useEffect(() => {
    localStorage.setItem('nn-chapter-index', currentChapterIndex);
    localStorage.setItem('nn-page-index', currentPageIndex);
  }, [currentChapterIndex, currentPageIndex]);

  // Save font size preference
  useEffect(() => {
    localStorage.setItem('nn-font-size', fontSize);
  }, [fontSize]);

  // Set pastel colors dynamically in document properties using the external helper
  useEffect(() => {
    applyChapterTheme(currentChapter.colors);
  }, [currentChapter.colors]);

  // Page turns
  const handlePageForward = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else {
      // Go to next chapter!
      if (currentChapterIndex < bookData.chapters.length - 1) {
        setCurrentChapterIndex(currentChapterIndex + 1);
        setCurrentPageIndex(0);
      }
    }
  };

  const handlePageBackward = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      // Go to previous chapter!
      if (currentChapterIndex > 0) {
        setPendingPageLast(true);
        setCurrentChapterIndex(currentChapterIndex - 1);
      }
    }
  };

  const handleTotalPagesChange = (total) => {
    setTotalPages(total);
    if (pendingPageLast) {
      setPendingPageLast(false);
      setCurrentPageIndex(total - 1);
    }
  };

  const handleSelectChapter = (idx) => {
    setCurrentChapterIndex(idx);
    setCurrentPageIndex(0);
  };


  return (
    <>
      {/* Background layer */}
      <BackgroundLayer 
        shapes={currentChapter.shapes}
        hideTitle={landingActive}
      />

      {/* Slide-out Table of Contents drawer */}
      <TableOfContents
        chapters={bookData.chapters}
        currentChapterIndex={currentChapterIndex}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        onSelectChapter={handleSelectChapter}
        bookmarks={bookmarks}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onBackToLibrary={() => {
          window.location.hash = '#/library';
          setTocOpen(false);
        }}
      />

      {/* Main book structure */}
      <div className="main-reader-container">
        {/* Floating Left Paging Arrow */}
        <button 
          className="nav-arrow-btn left-arrow no-click-paging"
          onClick={handlePageBackward}
          disabled={currentChapterIndex === 0 && currentPageIndex === 0}
          title="Előző oldal"
          aria-label="Previous Page"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dynamic book page content */}
        <BookPage
          chapterTitle={currentChapter.title}
          paragraphs={currentChapter.paragraphs}
          currentPageIndex={currentPageIndex}
          onPageChange={setCurrentPageIndex}
          onTotalPagesChange={handleTotalPagesChange}
          fontSize={fontSize}
          bookTitle={bookData.title}
          author={bookData.author}
          onPageForward={handlePageForward}
          onPageBackward={handlePageBackward}
          bookmarkCharIndex={bookmarks[currentChapterIndex]}
          onToggleBookmark={(charIndex) => {
            setBookmarks(prev => {
              const updated = { ...prev };
              if (charIndex === null || charIndex === undefined) {
                delete updated[currentChapterIndex];
              } else {
                updated[currentChapterIndex] = charIndex;
              }
              return updated;
            });
          }}
          currentChapterIndex={currentChapterIndex}
          totalChapters={bookData.chapters.length}
          onSelectChapter={handleSelectChapter}
        />

        {/* Floating Right Paging Arrow */}
        <button 
          className="nav-arrow-btn right-arrow no-click-paging"
          onClick={handlePageForward}
          disabled={currentChapterIndex === bookData.chapters.length - 1 && currentPageIndex === totalPages - 1}
          title="Következő oldal"
          aria-label="Next Page"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Sleek Minimalist Floating Menu Button to Open TOC */}
      <button 
        className="floating-toc-trigger no-click-paging"
        onClick={() => setTocOpen(true)}
        title="Tartalomjegyzék és Beállítások"
        aria-label="Open Table of Contents"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="15" y2="6" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
      </button>

      {/* Library Portal Page overlaid on top (if not fully started) */}
      {!readerStarted && (
        <LibraryPortal 
          onLaunchReader={() => { window.location.hash = '#/reader'; }} 
          bookTitle={bookData.title}
          author={bookData.author}
          isBlurred={landingActive && !landingExiting}
        />
      )}

      {/* Landing Page (if active) */}
      {landingActive && !readerStarted && (
        <LandingPage 
          isExiting={landingExiting}
          onEnter={() => {
            setLandingActive(false);
            setLandingExiting(false);
            window.location.hash = '#/library';
          }}
          onStartExit={() => setLandingExiting(true)}
        />
      )}
    </>
  );
}

export default App;
