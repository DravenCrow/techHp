import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AlbumCard from '../../src/components/album'
import { ITunesAlbum } from '../../src/shared/types';

describe('AlbumCard', () => {
  const mockAlbum: ITunesAlbum = {
    wrapperType: 'collection',
    collectionType: 'Album',
    artistId: 123456,
    collectionId: 789012,
    artistName: 'Artista de Prueba',
    collectionName: 'Álbum de Prueba',
    collectionCensoredName: 'Álbum de Prueba',
    collectionViewUrl: 'https://music.apple.com/album/123',
    artworkUrl100: 'https://example.com/artwork.jpg',
    collectionExplicitness: 'notExplicit',
    trackCount: 12,
    copyright: '℗ 2024 Sello Discográfico',
    country: 'ES',
    currency: 'EUR',
    primaryGenreName: 'Pop'
  };

  it('renders album information correctly', () => {
    render(<AlbumCard album={mockAlbum} />)

    // Check the image is rendered with correct props
    const albumImage = screen.getByAltText(`${mockAlbum.collectionName} cover`)
    expect(albumImage).toBeInTheDocument()
    expect(albumImage).toHaveAttribute('src', mockAlbum.artworkUrl100)

    // Check the album name is displayed
    expect(screen.getByText(mockAlbum.collectionName)).toBeInTheDocument()

    // Check the artist name is displayed
    expect(screen.getByText(mockAlbum.artistName)).toBeInTheDocument()
  })
})