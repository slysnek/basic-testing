import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const responseInfo = {
  id: 5,
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseInfo }),
    });
    await throttledGetDataFromApi('/comments/5');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseInfo }),
    });
    await throttledGetDataFromApi('/comments/5');
    jest.runAllTimers();
    expect(axios.create().get).toHaveBeenCalledWith('/comments/5');
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValueOnce({ data: responseInfo }),
    });
    const receivedData = await throttledGetDataFromApi('/comments/5');
    expect(receivedData).toBe(responseInfo);
  });
});
