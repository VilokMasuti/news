'use client';

import { formatDate } from '@/lib/utils';
import type { NewsArticle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Create a URL-friendly slug from the title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Calculate animation delay based on index (for staggered entry)
  const getAnimationDelay = () => {
    return `${index * 0.09}s`;
  };

  return (
    <div
      className="group h-full flex flex-col card-hover animate-scale-in"
      style={{ animationDelay: getAnimationDelay() }}
    >
      <Link
        href={`/article/${createSlug(article.title)}?url=${encodeURIComponent(
          article.url
        )}`}
        className="flex flex-col h-full overflow-hidden rounded-lg border bg-card text-card-foreground transition-all hover:shadow-md"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <div
            className={`absolute inset-0 bg-muted animate-pulse ${
              imageLoaded ? 'hidden' : 'block'
            }`}
          />
          {article.urlToImage ? (
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-sm text-muted-foreground">
                No image available
              </span>
            </div>
          )}
          {article.source.name && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground transition-colors bg-amber-200">
                {article.source.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow p-4">
          <h3 className="font-semibold text-lg tracking-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {article.description || 'Read the full article for more details.'}
          </p>
          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground border-t">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span>{article.author || article.source.name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
