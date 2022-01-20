import { useQuery, gql, NetworkStatus } from '@apollo/client';
import useObserver from '../customeHooks/useObsesver'
import { useRef, useEffect, useMemo } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { SearchParams } from '../pages/index';


const POKEMON_LIST_QUERY = gql`
query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp, $offset: Int, $limit: Int) {
  pokemon_v2_pokemon(where: $where, offset: $offset, limit: $limit) {
    name
    id
  }
}
`

interface PokemonVar {
    limit: 25
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

interface PokemonData {
    pokemon_v2_pokemon: [{ id: number, name: string }]
}


interface Props {
    searchParams: SearchParams
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

const PokemonList: React.FC<Props> = ({ searchParams }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    //const isInView = useObserver<HTMLDivElement>(ref.current);
    const { error, data, fetchMore, networkStatus, refetch } = useQuery<PokemonData, PokemonVar>(POKEMON_LIST_QUERY, {
        variables: createVars(searchParams),
        notifyOnNetworkStatusChange: true,
    })

    useEffect(() => {
      refetch(createVars(searchParams));   
    }, [searchParams,refetch]);

    console.log(data);

    useEffect(() => {
        if (ref.current !== null) {
            const observer = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                if (entries[0].isIntersecting) {
                    console.log('inview now');
                    fetchMore({
                        variables: {
                            offset: data!.pokemon_v2_pokemon.length
                        },
                    })
                    if (ref.current !== null) observer.unobserve(ref.current);
                };
            })
            observer.observe(ref.current);
        }
        return()=>{

        }
    }, [data, fetchMore])

    // if (isInView && networkStatus !== NetworkStatus.fetchMore) {
    //     fetchMore({
    //         variables: {
    //             offset: data!.pokemon_v2_pokemon.length
    //         },
    //     })
    // }

    if (networkStatus === NetworkStatus.loading) return (<p>loading</p>);
    if (error) return <p>Error! {error.message}</p>;
    if (networkStatus === NetworkStatus.refetch) return (<p>loading</p>);

    return (
        <div className='flex flex-wrap gap-6 mt-5'>
            {
                data!.pokemon_v2_pokemon.map((pokemon, index) => {
                    return (<Link href={`/pokemons/${pokemon.id}`} key={pokemon.id} passHref>
                        <a ref={index === data!.pokemon_v2_pokemon.length - 1 ? ref : undefined}
                            className=' p-1 m-0 w-80 h-20 text-center flex flex-wrap justify-center gap-4 content-center  rounded-xl 
                        bg-gray-100 text-lg shadow-sm hover:shadow-xl hover:scale-105 capitalize' >
                            <span className='self-center'>{pokemon.name}</span>
                            <Image alt={pokemon.name} width={70} height={70}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} />

                        </a>
                    </Link>
                    )
                })
            }
        </div>
    )
}

export default PokemonList