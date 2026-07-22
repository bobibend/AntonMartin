import React, { useState, useEffect } from 'react';
import bookDataHu from '../book_data.json';
import bookDataEn from '../book_data_en.json';
import BackgroundLayer from './components/BackgroundLayer';
import BookPage from './components/BookPage';
import TableOfContents from './components/TableOfContents';
import LibraryPortal from './components/LibraryPortal';
import LandingPage from './components/LandingPage';
import SelectionPortal from './components/SelectionPortal';
import { applyChapterTheme } from './utils/themeHelper';
import { fetchPreviewDocument } from './utils/previewLoader';
import './index.css';

function App() {
  const [readerStarted, setReaderStarted] = useState(false);
  const [landingActive, setLandingActive] = useState(true);
  const [landingExiting, setLandingExiting] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [portalActive, setPortalActive] = useState(false);

  // Language management
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('nn-language') || 'HU';
  });

  useEffect(() => {
    localStorage.setItem('nn-language', language);
  }, [language]);

  const bookData = language === 'EN' ? bookDataEn : bookDataHu;

  // Hash-based routing listener
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/preview/')) {
        const docName = hash.replace('#/preview/', '');
        setLandingActive(false);
        setLandingExiting(false);
        setReaderStarted(true);

        const loaded = await fetchPreviewDocument(docName);
        if (loaded) {
          setPreviewData(loaded);
        } else {
          setPreviewData({
            title: docName.replace(/[-_]/g, ' '),
            author: 'Anton Martin',
            subtitle: 'Preview Document',
            paragraphs: [
              `The requested preview document ("${docName}") was not found.`,
              'Please make sure that the file exists in the preview/html/ folder (e.g. as interju.json or interju.html).'
            ],
            theme: {
              bgColor1: '#ffd1dc',
              bgColor2: '#e8f0fe',
              bgColor3: '#fff9c4',
              pageBg: '#fffbf5',
              pageText: '#2f2a24',
              accentColor: '#8c7ae6'
            },
            shapes: ['könyv', 'toll']
          });
        }
      } else if (hash === '#/portal') {
        setPreviewData(null);
        setLandingActive(false);
        setLandingExiting(false);
        setReaderStarted(false);
        setPortalActive(true);
      } else if (hash === '#/library') {
        setPreviewData(null);
        setLandingActive(false);
        setLandingExiting(false);
        setReaderStarted(false);
        setPortalActive(false);
      } else if (hash === '#/reader') {
        setPreviewData(null);
        setLandingActive(false);
        setLandingExiting(false);
        setReaderStarted(true);
        setPortalActive(false);
      } else {
        // Default entry path is landing
        setPreviewData(null);
        setLandingActive(true);
        setLandingExiting(false);
        setReaderStarted(false);
        setPortalActive(false);
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
    if (previewData && previewData.theme) {
      applyChapterTheme(previewData.theme);
    } else if (currentChapter.colors) {
      applyChapterTheme(currentChapter.colors);
    }
  }, [currentChapter.colors, previewData]);

  // Page turns
  const handlePageForward = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (!previewData) {
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
    } else if (!previewData) {
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
        shapes={previewData ? (previewData.shapes || ['könyv', 'toll']) : currentChapter.shapes}
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
        language={language}
      />

      {/* Main book structure */}
      <div className="main-reader-container">
        {/* Floating Left Paging Arrow */}
        <button 
          className="nav-arrow-btn left-arrow no-click-paging"
          onClick={handlePageBackward}
          disabled={!previewData && currentChapterIndex === 0 && currentPageIndex === 0}
          title={language === 'EN' ? "Previous Page" : "Előző oldal"}
          aria-label="Previous Page"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dynamic book page content */}
        <BookPage
          chapterTitle={previewData ? previewData.title : currentChapter.title}
          paragraphs={previewData ? previewData.paragraphs : currentChapter.paragraphs}
          currentPageIndex={currentPageIndex}
          onPageChange={setCurrentPageIndex}
          onTotalPagesChange={handleTotalPagesChange}
          fontSize={fontSize}
          bookTitle={previewData ? (previewData.subtitle || 'Preview') : bookData.title}
          author={previewData ? (previewData.author || bookData.author) : bookData.author}
          onPageForward={handlePageForward}
          onPageBackward={handlePageBackward}
          bookmarkCharIndex={previewData ? null : bookmarks[currentChapterIndex]}
          onToggleBookmark={(charIndex) => {
            if (previewData) return;
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
          currentChapterIndex={previewData ? 0 : currentChapterIndex}
          totalChapters={previewData ? 1 : bookData.chapters.length}
          onSelectChapter={handleSelectChapter}
          language={language}
        />

        {/* Floating Right Paging Arrow */}
        <button 
          className="nav-arrow-btn right-arrow no-click-paging"
          onClick={handlePageForward}
          disabled={currentChapterIndex === bookData.chapters.length - 1 && currentPageIndex === totalPages - 1}
          title={language === 'EN' ? "Next Page" : "Következő oldal"}
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
        title={language === 'EN' ? "Table of Contents and Settings" : "Tartalomjegyzék és Beállítások"}
        aria-label="Open Table of Contents"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="15" y2="6" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
      </button>

      {/* Selection Portal Page (shows between Landing and Library) */}
      {!readerStarted && portalActive && (
        <SelectionPortal
          language={language}
          onLanguageChange={setLanguage}
          onSelectNeonNights={() => { window.location.hash = '#/library'; }}
        />
      )}

      {/* Library Portal Page overlaid on top (if not fully started) */}
      {!readerStarted && !portalActive && (
        <LibraryPortal 
          onLaunchReader={() => { window.location.hash = '#/reader'; }} 
          bookTitle={bookData.title}
          author={bookData.author}
          isBlurred={landingActive && !landingExiting}
          language={language}
          onLanguageChange={setLanguage}
        />
      )}

      {/* Landing Page (if active) */}
      {landingActive && !readerStarted && (
        <LandingPage 
          isExiting={landingExiting}
          onEnter={() => {
            setLandingActive(false);
            setLandingExiting(false);
            window.location.hash = '#/portal';
          }}
          onStartExit={() => setLandingExiting(true)}
          language={language}
        />
      )}
    </>
  );
}

export default App;
