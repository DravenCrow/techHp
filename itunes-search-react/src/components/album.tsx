import { ITunesAlbum } from '../shared/types'

type AlbumCardProps = {
    album: ITunesAlbum
}

function AlbumCard({ album }: AlbumCardProps) {
    return (
        <div className="flex flex-col" data-testid="album-card">
            <div className="relative aspect-square">
                <img
                    src={album.artworkUrl100}
                    alt={`${album.collectionName} cover`}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-300 truncate">
                    {album.collectionName}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                    {album.artistName}
                </p>
            </div>
        </div>
    )
}

export default AlbumCard
