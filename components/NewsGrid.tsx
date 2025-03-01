'use client'; // Move this to the first line

import { getTopHeadlines } from '@/actions/news-actions';
import type { NewsArticle } from '@/types';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import NewsCard from './NewsCard';

interface NewsGridProps {
  initialArticles: NewsArticle[];
  hasMore: boolean;
}

export default function NewsGrid({
  initialArticles,
  hasMore: initialHasMore,
}: NewsGridProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setArticles(initialArticles);
    setPage(2);
    setHasMore(initialHasMore);
  }, [initialArticles, initialHasMore]);

  const loadMoreArticles = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const moreNews = await getTopHeadlines('us', undefined, page);
      if (moreNews.articles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...moreNews.articles]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    const currentObserver = observerRef.current;
    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef && hasMore) {
      currentObserver.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef && currentObserver) {
        currentObserver.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasMore, loading, page]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.title}-${index}`}
            article={article}
            index={index}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {loading && <LoadingSpinner  />}
        </div>
      )}

      {!hasMore && articles.length > 0 && (
        <div className="text-center py-8 animate-fade-in">
          <p className="text-muted-foreground">
            You&apos;ve reached the end of the news feed
          </p>
        </div>
      )}

      {articles.length === 0 && !loading && (
        <div className="text-center py-12 animate-fade-in">
          <h3 className="text-xl font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            Try a different search or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
