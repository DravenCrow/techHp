import { APIAlbumResponse, ITunesAlbum, ITunesAlbumResponse } from "../shared/types";

export const testAlbum: ITunesAlbum = {
    wrapperType: 'collection',
    collectionType: 'Album',
    artistId: 123456,
    collectionId: 789012,
    artistName: 'Artista de Prueba',
    collectionName: 'Álbum de Prueba',
    collectionCensoredName: 'Álbum de Prueba',
    collectionViewUrl: 'https://music.apple.com/album/123',
    collectionExplicitness: 'notExplicit',
    trackCount: 12,
    copyright: '℗ 2024 Sello Discográfico',
    country: 'ES',
    currency: 'EUR',
    primaryGenreName: 'Pop'
};

export const testAlbumIncomplete = {
    wrapperType: 'collection',
    collectionType: 'Album',
    artistId: 123456,
    collectionId: 789012,
    artistName: 'Artista de Prueba',
    collectionName: 'Álbum de Prueba',
    collectionCensoredName: 'Álbum de Prueba',
};

export const testAlbumsResponse: ITunesAlbumResponse = {
    resultCount: 1,
    results: [testAlbum]
};

export const testAlbumsResponseWithDuplicates: ITunesAlbumResponse = {
    resultCount: 2,
    results: [testAlbum, testAlbum]
};

export const testAlbumsResponseWithInvalidStructure: any = {
    resultCount: 1,
    results: [{ invalidProperty: 'invalidValue' }]
};  

export const testAlbumsResponseEmpty: ITunesAlbumResponse = {
    resultCount: 0,
    results: []
};

export const APIAlbumResponseCorrect: APIAlbumResponse = [testAlbum];
