import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '10';
  const sortBy = searchParams.get('sortBy') || 'publishedAt';

  try {
    const response = await axios.get(
      `${BASE_URL}/api/search?q=${query}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { error: 'Failed to fetch search results' },
        { status: response.status }
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching search news:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
