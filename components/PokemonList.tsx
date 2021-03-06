import { useQuery, gql, NetworkStatus } from '@apollo/client';
import useFetchMore from '../customHooks/useFetchMore'
import React, { useEffect, memo, useCallback } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { SearchParams, useSearchContext } from '../context/SearchCtxProvider'
import Skeleton from './Skeleton'

export const POKEMON_LIST_QUERY = gql`
query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp, $offset: Int, $limit: Int) {
  pokemon_v2_pokemon(where: $where, offset: $offset, limit: $limit) {
    name
    id
  }
}
`

export interface PokemonVar {
    limit: number
    offset?: number
    where?: {
        name?: {
            _regex: string
        },
        pokemon_v2_pokemontypes?: {
            pokemon_v2_type: {
                name: {
                    _eq: string
                }
            }
        }
    }
}

export interface PokemonData {
    pokemon_v2_pokemon: [{ id: number, name: string }]
}


const createVars = (searchParams: SearchParams): PokemonVar => {
    if (searchParams.searchValue !== "") {
        if (searchParams.searchType === 'name') {
            return {
                limit: 25,
                where: {
                    name: {
                        _regex: searchParams.searchValue.toLowerCase()
                    }
                }
            }
        }

        if (searchParams.searchType === 'type') {
            return {
                limit: 25,
                where: {
                    pokemon_v2_pokemontypes: {
                        pokemon_v2_type: {
                            name: {
                                _eq: searchParams.searchValue.toLowerCase()
                            }
                        }
                    }
                }
            }
        }
    }
    return {
        limit: 25
    }

}

const PokemonList: React.FC = () => {
    const { searchParams } = useSearchContext();

    const { error, data, fetchMore, networkStatus, refetch,client } = useQuery<PokemonData, PokemonVar>(POKEMON_LIST_QUERY, {
        variables: createVars(searchParams),
        notifyOnNetworkStatusChange: true,
    })

    const ref = useFetchMore(fetchMore, data);

    useEffect(() => {
        refetch(createVars(searchParams));
    }, [searchParams, refetch]);

    if (networkStatus === NetworkStatus.loading) return (<Skeleton />);
    if (error) return <p>Error! {error.message}</p>;
    if (networkStatus === NetworkStatus.refetch) return (<Skeleton />);
    if (data!.pokemon_v2_pokemon.length < 1) return (<p>No data found!!!!</p>)

    return (
        <>
            <div className='flex flex-wrap gap-6 mt-5'>
                {
                    data!.pokemon_v2_pokemon.map((pokemon, index) => {
                        return (<Link href={`/pokemons/${pokemon.id}`} key={pokemon.id} passHref>
                            <a ref={index === data!.pokemon_v2_pokemon.length - 1 ? ref : undefined}
                                className=' p-1 m-0 w-80 h-20 text-center flex flex-wrap justify-center gap-4 content-center  rounded-xl 
                        bg-gray-100 text-lg shadow-sm hover:shadow-xl hover:scale-105 capitalize' >
                                <span className='self-center'>{pokemon.name}</span>
                                <Image alt={pokemon.name} width={70} height={70}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} />
                                {/* take img url from rest api since graphql not updated yet */}
                            </a>
                        </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default PokemonList
