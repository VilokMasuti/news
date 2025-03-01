import { getTopHeadlines } from '@/actions/news-actions';
import NewsGrid from '@/components/NewsGrid';
import type { NewsCategory } from '@/types';
import { notFound } from 'next/navigation';

const validCategories: NewsCategory[] = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

export function generateStaticParams() {
  return validCategories.map((category) => ({
    slug: category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  if (!validCategories.includes(slug as NewsCategory)) {
    notFound();
  }

  const category = slug as NewsCategory;
  const newsData = await getTopHeadlines('us', category);
  const hasMore = newsData.articles.length < newsData.totalResults;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight capitalize md:text-4xl">
          {category} News
        </h1>
        <p className="text-muted-foreground">
          Latest {category} news and updates
        </p>
      </section>

      <NewsGrid initialArticles={newsData.articles} hasMore={hasMore} />
    </div>
  );
}
