'use server';
import type { NewsCategory, NewsResponse } from '@/types';
import axios from 'axios';

export async function getTopHeadlines(
  country = 'us',
  category?: NewsCategory,
  page = 1,
  pageSize = 10,
  query?: string
): Promise<NewsResponse> {
  try {
    const params = new URLSearchParams({
      country,
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    if (category) params.append('category', category);
    if (query) params.append('q', query);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news?${params.toString()}`
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch top headlines');
    }

    return response.data;
  } catch (error) {
    console.error('Error in getTopHeadlines:', error);
    return {
      status: 'error',
      totalResults: 0,
      articles: [],
    };
  }
}

export async function searchNews(
  query: string,
  page = 1,
  pageSize = 10,
  sortBy = 'publishedAt'
): Promise<NewsResponse> {
  try {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      pageSize: pageSize.toString(),
      sortBy,
    });
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL }/api/search?${params.toString()}`
    );
    if (response.status !== 200) {
      throw new Error('Failed to fetch top headlines');
    }

    return response.data;
  } catch (error) {
    console.error('Error in searchNews:', error);
    return {
      status: 'error',
      totalResults: 0,
      articles: [],
    };
  }
}
