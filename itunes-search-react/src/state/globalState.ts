import atomWithDebounce from './atomWithDebounce'

// atom to store search input value
export const {
    isDebouncingAtom: isSearchingAtom,
    debouncedValueAtom: debouncedSearchAtom,
    currentValueAtom: currentSearchAtom
  } = atomWithDebounce<string>('',1000,false)
