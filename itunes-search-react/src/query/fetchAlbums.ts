import { useQuery } from "@tanstack/react-query";
import { APIAlbumResponse } from "../shared/types";

export const FETCH_ALBUMS_QUERY_KEY = 'fetchAlbums';
export async function fetchAlbums(artist: string): Promise<APIAlbumResponse> {
    const dataURL = new URL(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/albums/${artist}`);
    const responseData = await fetch(dataURL);

    if (!responseData.ok) {
        throw new Error(`HTTP error! status: ${responseData.status}`);
    }

    return responseData.json();
}

export function useQueryFetchAlbums (search: string) {
    return useQuery({
        queryKey: [FETCH_ALBUMS_QUERY_KEY, search],
        queryFn: () => fetchAlbums(search),
        enabled: search.length > 0,
    });
}