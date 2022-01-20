import React, { useState } from 'react'

interface Props {
    setSearchParams: React.Dispatch<React.SetStateAction<{
        searchType: searchT,
        searchValue: string
    }>>
}

export type searchT = 'name' | 'type';

const SearchBar: React.FC<Props> = ({ setSearchParams }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchType, setSearchType] = useState<searchT>('name');

    return (<>
        <div className=' flex flex-wrap gap-2'>
            <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className='outline-none 
            border-gray-500 focus:border-blue-400 border-2 rounded-md'/>
            <select value={searchType} onChange={e => { setSearchType(e.target.value as searchT) }}
                className='outline-none border-2 border-i  border-gray-500 rounded-md focus:border-blue-400'>
                <option value='name'>Search by name </option>
                <option value='type'>Search by type </option>
            </select>
            {/* onclick cant return void feelsbadman */}
            <button onClick={e => setSearchParams({ searchType, searchValue })} className='bg-blue-500 
            p-1 rounded-md w-20 hover:bg-blue-800 text-white'>Search</button>         
        </div>
       <span>(graphql still in beta so i have to take imgs from theirs rest api, even tho some imgs still may give 404 feelsbadman)</span>
        </>
    )
}

export default SearchBar;