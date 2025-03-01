import axios from 'axios';
import { NextResponse } from 'next/server';

const EVERYTHING_URL = 'https://newsapi.org/v2/everything';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '10';
  const sortBy = searchParams.get('sortBy') || 'publishedAt';

  if (!q) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }
    // Log API Key and Request URL
    console.log("Using API Key:", process.env.NEWS_API_KEY);
    console.log(`Fetching: ${EVERYTHING_URL}?q=${q}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`);

  try {
    const response = await axios.get(EVERYTHING_URL, {
      params: {
        q,
        page,
        pageSize,
        sortBy,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    return NextResponse.json(
      { error: 'Failed to search news' },
      { status: 500 }
    );
  }
}
