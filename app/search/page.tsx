import { searchNews } from '@/actions/news-actions';
import NewsGrid from '@/components/NewsGrid';

interface SearchPageProps {
  searchParams: Promise<{ q: string }>; // FIXED TYPE
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams; // Await the promise
  const query = params.q || '';

  const newsData = await searchNews(query);
  const hasMore = newsData.articles.length < newsData.totalResults;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Search Results
        </h1>
        <p className="text-muted-foreground">
          {query ? (
            <>
              Showing results for{' '}
              <span className="font-medium">&quot;{query}&quot;</span>
            </>
          ) : (
            'Please enter a search term'
          )}
        </p>
      </section>

      {query ? (
        <NewsGrid initialArticles={newsData.articles} hasMore={hasMore} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">
            Enter a search term to find news articles
          </p>
        </div>
      )}
    </div>
  );
}
