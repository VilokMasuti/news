import { getTopHeadlines } from '@/actions/news-actions';
import NewsGrid from '@/components/NewsGrid';

export default async function Home() {
  const newsData = await getTopHeadlines();
  const hasMore = newsData.articles.length < newsData.totalResults;

  return (
    <div className="space-y-8  ">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl  ">
          TopNews
        </h1>
        <p className="text-muted-foreground">
          Stay informed with the latest news from around the world
        </p>
      </section>

      {/* Pass only initial data, do not pass a function */}
      <NewsGrid initialArticles={newsData.articles} hasMore={hasMore} />
    </div>
  );
}
