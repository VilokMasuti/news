/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getArticleData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch article');
    return await response.text();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const url = searchParams.url as string;

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Article not found</p>
        <Link href="/" className="mt-4">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
          {decodeURIComponent(params.slug).replace(/-/g, ' ')}
        </h1>

        <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
          <span>Source: External News Provider</span>
          <time>{formatDate(new Date().toISOString())}</time>
        </div>

        <div className="my-8 aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=480&width=854"
            alt="Article image"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <p>
            This article is hosted on an external website. Due to copyright
            restrictions and the limitations of the News API, we cannot display
            the full content here.
          </p>

          <p>
            Please click the button below to read the full article on the
            original website.
          </p>

          <div className="flex justify-center my-8">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button className="inline-flex items-center">
                Read Full Article
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
