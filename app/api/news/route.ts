import axios from 'axios';
import { NextResponse } from 'next/server';

const TOP_HEADLINES_URL = 'https://newsapi.org/v2/top-headlines';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const country = searchParams.get('country') || 'us';
  const category = searchParams.get('category') || '';
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '10';
  const q = searchParams.get('q') || '';

  const params: Record<string, string> = {
    country,
    page,
    pageSize,
  };

  if (category) params.category = category;
  if (q) params.q = q;

  try {
    const response = await axios.get(TOP_HEADLINES_URL, {
      params: {
        ...params,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top headlines' },
      { status: 500 }
    );
  }
}
