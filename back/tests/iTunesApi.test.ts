import { getUniqueAlbumsFromArtist } from '../src/itunesApi';
import axios from 'axios';
import { testAlbumsResponse, testAlbumsResponseWithDuplicates } from './testData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('iTunesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchAlbums', () => {
    it('should return albums when the search is successful', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: testAlbumsResponse });

      const result = await getUniqueAlbumsFromArtist('test artist');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://itunes.apple.com/search'),
        expect.objectContaining({
          params: expect.objectContaining({
            term: 'test artist',
            entity: 'album'
          })
        })
      );
      expect(result).toHaveLength(1);
    });

    it('should remove duplicate albums from the response', async () => {
      mockedAxios.get.mockResolvedValueOnce({ 
        data: testAlbumsResponseWithDuplicates 
      });

      const result = await getUniqueAlbumsFromArtist('test artist');

      expect(result).toHaveLength(1);
    });


    it('should handle API errors correctly', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(getUniqueAlbumsFromArtist('test')).rejects.toThrow();
    });
  });
}); 