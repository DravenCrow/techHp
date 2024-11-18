import { z } from 'zod';

export const ITunesAlbumSchema = z.object({
    wrapperType: z.literal('collection'),
    collectionType: z.literal('Album'),
    artistId: z.number(),
    collectionId: z.number(),
    amgArtistId: z.number().optional(),
    artistName: z.string(),
    collectionName: z.string(),
    collectionCensoredName: z.string(),
    artistViewUrl: z.string().url().optional(),
    collectionViewUrl: z.string().url(),
    artworkUrl60: z.string().url().optional(),
    artworkUrl100: z.string().url().optional(),
    collectionPrice: z.number().optional(),
    collectionExplicitness: z.enum(['explicit', 'cleaned', 'notExplicit']),
    trackCount: z.number(),
    copyright: z.string(),
    country: z.string(),
    currency: z.string(),
    releaseDate: z.coerce.date().optional(),
    primaryGenreName: z.string(),
  });

export const ITunesAlbumsResponseSchema = z.object({
  resultCount: z.number(),
  results: z.array(ITunesAlbumSchema)
});

export type ITunesAlbum = z.infer<typeof ITunesAlbumSchema>;
export type ITunesAlbumResponse = z.infer<typeof ITunesAlbumsResponseSchema>;


export const APIAlbumResponseSchema = z.array(ITunesAlbumSchema);
export type APIAlbumResponse = z.infer<typeof APIAlbumResponseSchema>;