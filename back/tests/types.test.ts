import { ITunesAlbumSchema, ITunesAlbumsResponseSchema } from '../shared/types';
import { testAlbum, testAlbumIncomplete, testAlbumsResponse, testAlbumsResponseWithInvalidStructure } from './testData';

describe('iTunes Schemas', () => {
  describe('ITunesAlbumSchema', () => {
    it('validate a valid album object', () => {
      expect(() => ITunesAlbumSchema.parse(testAlbum)).not.toThrow();
    });

    it('debería rechazar un objeto con propiedadenps faltantes', () => {
      expect(() => ITunesAlbumSchema.parse(testAlbumIncomplete)).toThrow();
    });
  });

  describe('ITunesAlbumsResponseSchema', () => {
    it('debería validar una respuesta completa de la API', () => {
      expect(() => ITunesAlbumsResponseSchema.parse(testAlbumsResponse)).not.toThrow();
    });

    it('debería rechazar una respuesta con estructura incorrecta', () => {
      expect(() => ITunesAlbumsResponseSchema.parse(testAlbumsResponseWithInvalidStructure)).toThrow();
    });
  });
}); 