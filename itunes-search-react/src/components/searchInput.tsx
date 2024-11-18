import { ChangeEvent } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { debouncedSearchAtom, currentSearchAtom } from '../state/globalState'

export type SearchInputProps = {
    placeholder?: string
}

function SearchInput( { placeholder = "Type your artist Name..." }: SearchInputProps ) {
    const search = useAtomValue(currentSearchAtom)
    const setSearch = useSetAtom(debouncedSearchAtom)

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setSearch(event.target.value)
    }

    function hasSearchValue(search: string): search is string {
        return search.length > 0
    }

    function clearSearch(): void {
        setSearch('')
    }

    return (
        <div className="mb-4 relative bg-gray-700">
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 text-sm sm:text-base text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search input"
            />
            {hasSearchValue(search) && (
                <button
                    onClick={clearSearch}
                    className="absolute right-2 top text-gray-500 hover:text-gray-700 text-3xl"
                    aria-label="Clear search"
                    type="button"
                >×</button>
            )}
        </div>
    )
}

export default SearchInput