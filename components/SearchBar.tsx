import React, { useCallback, useEffect, useState, useContext } from 'react'
import debound from 'lodash/debounce'
import { useSearchContext } from '../context/SearchCtxProvider';


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

const SearchBar: React.FC = () => {
    const { setSearchParams, searchParams: { searchValue, searchType } } = useSearchContext();

    const debounceSearch = useCallback(debound((searchType, searchValue) => setSearchParams({ searchType, searchValue }), 500), []);

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams((prev) => {
            return { ...prev, searchType: e.target.value as searchT }
        });
        if (searchType === 'type') {
            setSearchParams((prev) => {
                return { ...prev, searchValue: '' }
            });
        } else {
            setSearchParams((prev) => {
                return { ...prev, searchValue: 'normal' }
            });
        }
    }

    const handleSearchValueChange = (e:React.ChangeEvent<HTMLSelectElement|HTMLInputElement>)=>{
        setSearchParams(prev=>{
            return{
            ...prev,searchValue:e.target.value
            }
        })
    }

    useEffect(() => {
        debounceSearch(searchType, searchValue);
    }, [searchType, searchValue]);


    return (<>
        <div className=' flex flex-wrap gap-2'>
            {searchType === 'name' ?
                <input onChange={handleSearchValueChange} value={searchValue} className='outline-none 
            border-gray-500 focus:border-blue-400 border-2 rounded-md'/>
                :
                <select value={searchValue} onChange={handleSearchValueChange}
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