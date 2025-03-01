import { getTopHeadlines, searchNews } from '@/actions/news-actions';
import type { NewsResponse } from '@/types';
import axios from 'axios';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('axios');

describe('News Actions', () => {
  const mockBaseUrl = 'http://localhost:3000';
  const mockGet = jest.spyOn(axios, 'get');

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_BASE_URL = mockBaseUrl;
  });

  describe('getTopHeadlines', () => {
    const mockSuccessResponse: NewsResponse = {
      status: 'ok',
      totalResults: 10,
      articles: [],
    };

    it('should fetch top headlines with default parameters', async () => {
      // Proper mock implementation
      mockGet.mockImplementationOnce(() =>
        Promise.resolve({ status: 200, data: mockSuccessResponse })
      );

      const result = await getTopHeadlines();
      expect(mockGet).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/news?country=us&page=1&pageSize=10`
      );
      expect(result).toEqual(mockSuccessResponse);
    });

    it('should handle optional parameters correctly', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.resolve({ status: 200, data: mockSuccessResponse })
      );

      const result = await getTopHeadlines('gb', 'technology', 2, 20, 'test');
      expect(mockGet).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/news?country=gb&page=2&pageSize=20&category=technology&q=test`
      );
      expect(result).toEqual(mockSuccessResponse);
    });

    it('should handle network errors', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.reject(new Error('Network Error'))
      );

      const result = await getTopHeadlines();
      expect(result).toEqual({
        status: 'error',
        totalResults: 0,
        articles: [],
      });
    });

    it('should handle non-200 status codes', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.resolve({ status: 500, data: { message: 'Server Error' } })
      );

      const result = await getTopHeadlines();
      expect(result).toEqual({
        status: 'error',
        totalResults: 0,
        articles: [],
      });
    });
  });

  describe('searchNews', () => {
    const mockSuccessResponse: NewsResponse = {
      status: 'ok',
      totalResults: 5,
      articles: [],
    };

    it('should search news with default parameters', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.resolve({ status: 200, data: mockSuccessResponse })
      );

      const result = await searchNews('test query');
      expect(mockGet).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/search?q=test%20query&page=1&pageSize=10&sortBy=publishedAt`
      );
      expect(result).toEqual(mockSuccessResponse);
    });

    it('should handle custom search parameters', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.resolve({ status: 200, data: mockSuccessResponse })
      );

      const result = await searchNews('another query', 2, 15, 'relevancy');
      expect(mockGet).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/search?q=another%20query&page=2&pageSize=15&sortBy=relevancy`
      );
      expect(result).toEqual(mockSuccessResponse);
    });

    it('should handle network errors', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.reject(new Error('Network Error'))
      );

      const result = await searchNews('test query');
      expect(result).toEqual({
        status: 'error',
        totalResults: 0,
        articles: [],
      });
    });

    it('should handle non-200 status codes', async () => {
      mockGet.mockImplementationOnce(() =>
        Promise.resolve({ status: 404, data: { message: 'Not Found' } })
      );

      const result = await searchNews('test query');
      expect(result).toEqual({
        status: 'error',
        totalResults: 0,
        articles: [],
      });
    });
  });
});
