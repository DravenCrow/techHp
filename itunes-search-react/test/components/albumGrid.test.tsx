import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { Provider } from 'jotai'
import AlbumGrid from '../../src/components/albumGrid'
import { describe, expect, it, vitest } from 'vitest'
import { useHydrateAtoms } from 'jotai/utils'
import { debouncedSearchAtom } from '../../src/state/globalState'

// Create a wrapper component that hydrates the atom with initial value
function TestWrapper({ children, initialSearch = '' }: { children: React.ReactNode, initialSearch: string }) {
    const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
        useHydrateAtoms([[debouncedSearchAtom, initialSearch]])
        return children
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <Provider>
                <HydrateAtoms>{children}</HydrateAtoms>
            </Provider>
        </QueryClientProvider>
    )
}

describe('AlbumGrid', () => {
    it('shows loading state when fetching albums', async () => {
        vitest.spyOn(await import('../../src/query/fetchAlbums'), 'useQueryFetchAlbums').mockReturnValue({
            data: [],
            isLoading: false,
            isFetching: true,
            isError: false,
            error: null,
            status: 'success',
            isPending: false,
            isSuccess: true,
        } as any)

        render(<AlbumGrid />, {
            wrapper: ({ children }) => (
                <TestWrapper initialSearch="The+Cure">{children}</TestWrapper>
            )
        })

        //check if the divs for the spinners are in the document
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    })

    it('shows no results message when albums array is empty', async () => {

        vitest.spyOn(await import('../../src/query/fetchAlbums'), 'useQueryFetchAlbums').mockReturnValue({
            data: [],
            isLoading: false,
            isFetching: false,
            isError: false,
            error: null,
            status: 'success',
            isPending: false,
            isSuccess: true,
        } as any)

        render(<AlbumGrid />, {
            wrapper: ({ children }) => (
                <TestWrapper initialSearch="The+Cure">{children}</TestWrapper>
            )
        })
        expect(screen.getByText('No albums found')).toBeInTheDocument()
    })

    it('shows error message when fetch fails', async () => {
        vitest.spyOn(await import('../../src/query/fetchAlbums'), 'useQueryFetchAlbums').mockReturnValue({
            data: [],
            isLoading: false,
            isFetching: false,
            isError: true,
        } as any)

        render(<AlbumGrid />, {
            wrapper: ({ children }) => (
                <TestWrapper initialSearch="The+Cure">{children}</TestWrapper>
            )
        })
        expect(screen.getByText('Error getting albums')).toBeInTheDocument()
    })

    it('shows albums when fetch is successful', async () => {
        vitest.spyOn(await import('../../src/query/fetchAlbums'), 'useQueryFetchAlbums').mockReturnValue({
            data: [
                {
                    collectionId: 1,
                    collectionName: 'Test Album 1',
                    artworkUrl100: 'test-url-1',
                    artistName: 'Test Artist 1',
                },
                {
                    collectionId: 2,
                    collectionName: 'Test Album 2',
                    artworkUrl100: 'test-url-2',
                    artistName: 'Test Artist 2',
                },
            ],
            isLoading: false,
            isFetching: false,
            isError: false,
        } as any)

        render(<AlbumGrid />, {
            wrapper: ({ children }) => (
                <TestWrapper initialSearch="The+Cure">{children}</TestWrapper>
            )
        })
        expect(screen.getByText('Test Album 1')).toBeInTheDocument()
        expect(screen.getByText('Test Album 2')).toBeInTheDocument()
    })
})