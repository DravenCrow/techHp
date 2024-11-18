import request from 'supertest'
import expressApp from '../src/express'
import { APIAlbumResponseCorrect } from './testData'
import { ZodError } from 'zod'


describe('test express endpoints', () => {
  test('endpoint /', async () => {
    const result = await request(expressApp).get('/')
    expect(result.text).toBe('Server to search Itunes API for unique albums from an artist')  
    expect(result.statusCode).toBe(200)
  })

  test('endpoint /api/albums/:artist', async () => {  
    jest.spyOn(require('../src/itunesApi'), 'getUniqueAlbumsFromArtist').mockResolvedValue(APIAlbumResponseCorrect);

    const result = await request(expressApp).get('/api/albums/the+cure')
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(APIAlbumResponseCorrect)
  })

  test('endpoint /api/albums/:artist with ZodException', async () => {  
    jest.spyOn(require('../src/itunesApi'), 'getUniqueAlbumsFromArtist').mockRejectedValue(new ZodError([]));
    const result = await request(expressApp).get('/api/albums/the+cure')
    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual({ error: 'Error validating data: Invalid data from iTunes API' })
  })

  test('endpoint /api/albums/:artist with other exception', async () => {  
    jest.spyOn(require('../src/itunesApi'), 'getUniqueAlbumsFromArtist').mockRejectedValue(new Error('Failed to fetch albums'));
    const result = await request(expressApp).get('/api/albums/the+cure')
    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual({ error: 'Failed to fetch albums' })
  })
})
