import React, { useCallback, useEffect, useState } from 'react'
import debound from 'lodash/debounce'

interface Props {
    setSearchParams: React.Dispatch<React.SetStateAction<{
        searchType: searchT,
        searchValue: string
    }>>
}

const pokemonType = [
    "normal",
    "flying",
    "grass",
    "fighting",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy"
]

export type searchT = 'name' | 'type';

const SearchBar: React.FC<Props> = ({ setSearchParams }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchType, setSearchType] = useState<searchT>('name');

    const debounceSearch = useCallback(debound((searchType,searchValue) => setSearchParams({searchType,searchValue}), 500), []);

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(() => {
            return e.target.value as searchT
        });
        if (searchType === 'type') {
            setSearchValue(() => '');
        } else {
            setSearchValue(() => 'normal');
        }
    }

    useEffect(() => {
        debounceSearch(searchType,searchValue);
    }, [searchType,searchValue]);


    return (<>
        <div className=' flex flex-wrap gap-2'>
            {searchType === 'name' ?
                <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className='outline-none 
            border-gray-500 focus:border-blue-400 border-2 rounded-md'/>
                :
                <select value={searchValue} onChange={e => setSearchValue(e.target.value)}
                    className='outline-none border-2 border-i  border-gray-500 rounded-md focus:border-blue-400'>
                    {pokemonType.map((type, i) => {
                        return <option value={type} key={i}>{type}</option>
                    })}
                </select>}
            <select value={searchType} onChange={handleSearchTypeChange}
                className='outline-none border-2 border-i  border-gray-500 rounded-md focus:border-blue-400'>
                <option value='name'>Search by name </option>
                <option value='type'>Search by type </option>
            </select>
        </div>
    </>
    )
}

export default SearchBar;