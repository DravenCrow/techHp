import axios from 'axios';
import { ITunesAlbum, ITunesAlbumResponse, ITunesAlbumsResponseSchema } from '../shared/types';

const ITUNES_API_BASE_URL = 'https://itunes.apple.com/search';

export const getUniqueAlbumsFromArtist = async (artist: string): Promise<ITunesAlbum[]> => {
    const response = await axios.get(
        ITUNES_API_BASE_URL,
        {
            params: {
                term: artist,
                entity: 'album',
                attribute: 'artistTerm'
            }
        }
    );
    // Validate iTunes API response
    const validatedResult: ITunesAlbumResponse = ITunesAlbumsResponseSchema.parse(response.data);
    console.log(' * Num of albums:', validatedResult.resultCount);
    // eliminate duplicates
    const uniqueAlbums = validatedResult.results.reduce(
        (acc: ITunesAlbum[], album: ITunesAlbum) => {
            if (!acc.find(a => a.collectionName === album.collectionName)) {
                acc.push(album);
            }
            return acc;
        },
        [] as ITunesAlbum[]
    );
    console.log(' * Num of unique albums:', uniqueAlbums.length);
    return uniqueAlbums;
}