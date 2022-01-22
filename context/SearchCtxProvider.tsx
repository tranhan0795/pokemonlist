import React, { useState, useContext, useCallback } from "react"
import { searchT } from "../components/SearchBar";

export interface SearchParams {
    searchValue: string, searchType: searchT
}

interface Search {
    searchParams: SearchParams,
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>
}

const SearchCtx = React.createContext<Search>({} as Search);

const SearchCtxProvider: React.FC = ({ children }) => {
    const [searchParams, setSearchParams] = useState<SearchParams>({ searchValue: '', searchType: 'name' });
    // const callbackSearch = useCallback((searchParams) => {
    //     setSearchParams(searchParams);
    // }, []);


    return <SearchCtx.Provider value={{ searchParams, setSearchParams: setSearchParams }}>
        {children}
    </SearchCtx.Provider>
}

export default SearchCtxProvider;
export const useSearchContext = () => useContext(SearchCtx);
