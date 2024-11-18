import { useAtomValue } from 'jotai'
import { debouncedSearchAtom } from '../state/globalState'
import { useQueryFetchAlbums } from '../query/fetchAlbums';
import AlbumCard from './album';

function AlbumGrid() {
    const search = useAtomValue(debouncedSearchAtom)

    const { isFetching: gettingAlbumsPending, isError: gettingAlbumsError, data: albumsData } = useQueryFetchAlbums(search)

    if (gettingAlbumsPending) {
        return (<>
            <div className="flex justify-center items-center h-64">
                <div data-testid="loading-spinner" className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </>
        )
    }

    if (gettingAlbumsError) {
        return (<>
            <div className="
          flex flex-col items-center justify-center
          py-12 px-4
          text-center
        ">
                <p className="text-lg text-gray-600">
                    Error getting albums
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search terms
                </p>
            </div>
        </>
        )
    }

    if (albumsData && albumsData.length === 0) {
        return (<>
            <div className="
          flex flex-col items-center justify-center
          py-12 px-4
          text-center
        ">
                <p className="text-lg text-gray-600">
                    No albums found
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search terms
                </p>
            </div>
        </>
        )
    }

    return (<>
        <div className="
        grid
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
        gap-4 sm:gap-6
      " data-testid="album-grid">
            {albumsData?.map((album) => (
                <AlbumCard data-testid="album-card" key={album.collectionId} album={album} />
            ))}
        </div>
    </>
    )

}
export default AlbumGrid