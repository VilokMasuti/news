/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NewsCard from '@/components/NewsCard';
import { render } from '@testing-library/react';

// Improved Next.js Image mock
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Filter out Next.js specific props
    const { fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

describe('NewsCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <NewsCard
        article={{
          title: 'Test Article',
          url: '#',
          urlToImage: 'https://example.com/test.jpg',
          publishedAt: '2024-01-01',
          source: {
            name: 'Test Source',
            id: null
          },
          description: 'Test description',
          author: 'Test Author',
          content: 'Test content',
        }} index={0}      />
    );

    expect(container).toMatchSnapshot();
  });
});
