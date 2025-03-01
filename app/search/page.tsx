import { searchNews } from '@/actions/news-actions';
import NewsGrid from '@/components/NewsGrid';

interface Props {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = (searchParams.q as string) || '';

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
