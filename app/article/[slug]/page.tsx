'use client';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const source = searchParams[1];

  interface Article {
    title: string;
    source: { name: string };
    author: string;
    publishedAt: string;
    urlToImage: string;
    content: string;
    url: string;
  }

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // When URL changes, reset states
    setIsLoading(true);
    setError(null);
    setArticle(null);
    setImageLoaded(false);

    const fetchArticle = async () => {
      if (!source) {
        setError('Article source not found');
        setIsLoading(false);
        return;
      }

      try {
        // In a real app, we would fetch the full article from the source
        // For this demo, we'll simulate fetching with a timeout
        // and generate demo content

        setTimeout(() => {
          // Create a mock article with extended content
          const mockArticle = {
            title: slug
              ?.split('-')
              .join(' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            source: { name: 'NewsAPI Sample' },
            author: 'John Doe',
            publishedAt: new Date().toISOString(),
            urlToImage: `https://picsum.photos/seed/${slug}/1200/600`,
            content: `
              <p>This article is hosted on an external website. Due to copyright restrictions and the limitations of the News API, we cannot display the full content here.</p>

              <p>Please click the button below to read the full article on the original website.</p>
            `,
            url: source,
          };

          setArticle(mockArticle);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load article.');
        setIsLoading(false);
        console.error('Error fetching article:', err);
      }
    };

    fetchArticle();
  }, [slug, source]);

  if (!source && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn&apos;t find the article you&apos;re looking for.
            </p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">
                Error Loading Article
              </h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link href="/" className="btn-primary">
                Back to News
              </Link>
            </div>
          ) : article ? (
            <article className="prose dark:prose-invert md:prose-lg lg:prose-xl prose-headings:font-bold prose-p:text-muted-foreground max-w-none">
              {/* Back button */}
              <div className="mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
              </div>

              {/* Article header */}
              <header className="mb-8">
                <h1 className="headline mb-4">{article.title}</h1>

                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <span>{article.source.name}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(article.publishedAt)}</span>
                  {article.author && (
                    <>
                      <span className="mx-2">•</span>
                      <span>By {article.author}</span>
                    </>
                  )}
                </div>
              </header>

              {/* Featured image */}
              <div className="relative mb-8 rounded-lg overflow-hidden">
                <div
                  className={`absolute inset-0 bg-muted animate-pulse ${
                    imageLoaded ? 'hidden' : 'block'
                  }`}
                />
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className={`w-full h-auto rounded-lg ${
                    imageLoaded ? 'image-fade-in' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Article content */}
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="leading-relaxed"
              />

              {/* External link button */}
              <div className="flex justify-center my-8">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center px-6 py-3 rounded-md"
                >
                  Read Full Article
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Original source link */}
              <div className="mt-10 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  <i>This article is for demonstration purposes only.</i>
                </p>
              </div>
            </article>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Article;
