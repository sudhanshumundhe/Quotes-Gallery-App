import { useState, useEffect, useCallback } from "react";
import "./App.css";

const QUOTES_API = "https://api.freeapi.app/api/v1/public/quotes?page=1&limit=20";

function QuoteCard({ quote, index }) {
  const accents = ["accent-amber", "accent-rose", "accent-sage", "accent-sky"];
  const accent = accents[index % accents.length];

  return (
    <article className={`quote-card ${accent}`} style={{ animationDelay: `${index * 60}ms` }}>
      <span className="quote-mark">"</span>
      <blockquote className="quote-text">{quote.quote}</blockquote>
      <footer className="quote-footer">
        <span className="quote-dash">—</span>
        <cite className="quote-author">{quote.author}</cite>
      </footer>
      <div className="quote-number">
        {String(index + 1).padStart(2, "0")}
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="quote-card skeleton">
      <div className="sk-line sk-line--lg" />
      <div className="sk-line" />
      <div className="sk-line sk-line--md" />
      <div className="sk-line sk-line--sm" />
      <div className="sk-author" />
    </div>
  );
}

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(null);
  const [featuredIdx, setFeaturedIdx] = useState(0);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(QUOTES_API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const data = json?.data?.data ?? [];
      setQuotes(data);
      setFiltered(data);
      if (data.length > 0) {
        const idx = Math.floor(Math.random() * data.length);
        setFeatured(data[idx]);
        setFeaturedIdx(idx);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchQuotes(); }, [fetchQuotes]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(quotes);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        quotes.filter(
          (item) =>
            item.quote?.toLowerCase().includes(q) ||
            item.author?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, quotes]);

  const nextFeatured = () => {
    if (!quotes.length) return;
    const idx = (featuredIdx + 1) % quotes.length;
    setFeatured(quotes[idx]);
    setFeaturedIdx(idx);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-left">
            <div className="logo-mark">Q</div>
            <div>
              <h1 className="site-title">Quoth</h1>
              <p className="site-sub">A collection of timeless words</p>
            </div>
          </div>
          <div className="header-right">
            <div className="search-wrap">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="search-input"
                type="text"
                placeholder="Search quotes or authors…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Featured Quote */}
        {!loading && !error && featured && !search && (
          <section className="featured-section">
            <div className="featured-label">
              <span className="label-line" />
              <span>Featured Quote</span>
              <span className="label-line" />
            </div>
            <div className="featured-card">
              <div className="featured-bg-mark">"</div>
              <blockquote className="featured-text">{featured.quote}</blockquote>
              <footer className="featured-footer">
                <cite className="featured-author">— {featured.author}</cite>
                <button className="next-btn" onClick={nextFeatured} title="Next quote">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Next
                </button>
              </footer>
            </div>
          </section>
        )}

        {/* Gallery Header */}
        <div className="gallery-header">
          <div className="gallery-title-row">
            <h2 className="gallery-title">
              {search ? `Results for "${search}"` : "All Quotes"}
            </h2>
            {!loading && (
              <span className="gallery-count">{filtered.length} quotes</span>
            )}
          </div>
          <button className="refresh-btn" onClick={fetchQuotes} disabled={loading}>
            <svg className={loading ? "spin" : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="error-state">
            <span className="error-icon">⚠</span>
            <p>Failed to load quotes: {error}</p>
            <button className="retry-btn" onClick={fetchQuotes}>Try Again</button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-mark">"</div>
            <p>No quotes match your search.</p>
            <button className="retry-btn" onClick={() => setSearch("")}>Clear Search</button>
          </div>
        )}

        {/* Grid */}
        <div className="quotes-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((q, i) => (
              <QuoteCard key={q.id ?? i} quote={q} index={i} />
            ))}
        </div>
      </main>

      <footer className="site-footer">
        <p>Powered by <a href="https://api.freeapi.app" target="_blank" rel="noreferrer">FreeAPI</a> · {quotes.length} quotes loaded</p>
      </footer>
    </div>
  );
}