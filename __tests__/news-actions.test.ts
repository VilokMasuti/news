// __tests__/news-actions.test.ts
import { getTopHeadlines, searchNews } from '@/actions/news-actions';
import axios from 'axios';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('axios');

describe('News Actions', () => {
  const mockBaseUrl = 'http://localhost:3000';
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_BASE_URL = mockBaseUrl;
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getTopHeadlines', () => {
    it('should make correct API call with default parameters', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: {} });

      await getTopHeadlines();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(`${mockBaseUrl}/api/news`),
        expect.anything()
      );
    });

    it('should include optional parameters in API call', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: {} });

      await getTopHeadlines('gb', 'technology', 2, 20, 'test');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('country=gb'),
        expect.anything()
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('category=technology'),
        expect.anything()
      );
    });
  });

  describe('searchNews', () => {
    it('should make correct API call with search query', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: {} });

      await searchNews('test query');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(`${mockBaseUrl}/api/search`),
        expect.anything()
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('q=test'),
        expect.anything()
      );
    });
  });
});
