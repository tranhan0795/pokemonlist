import { useQuery, gql, NetworkStatus } from '@apollo/client';
import useObserver from '../customeHooks/useObsesver'
import { useRef, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'


const POKEMON_LIST_QUERY = gql`
query Pokemon_v2_pokemon($limit: Int,$offset:Int) {
  pokemon_v2_pokemon(limit: $limit,offset:$offset) {
    id
    name
  }
}
`
const vars = {
    limit: 20,
    offset: 0
}

interface PokemonVar {
    limit: number
    offset: number
}

interface PokemonData {
    pokemon_v2_pokemon: [{ id: number, name: string }]
}

const PokemonList: React.FC = () => {
    const ref = useRef<HTMLAnchorElement>(null);
    //const isInView = useObserver<HTMLDivElement>(ref.current);
    const { error, data, fetchMore, networkStatus } = useQuery<PokemonData, PokemonVar>(POKEMON_LIST_QUERY, {
        variables: vars,
        notifyOnNetworkStatusChange: true,
    })

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

    return (
        <div className='flex flex-wrap gap-6 '>
            {
                data!.pokemon_v2_pokemon.map((pokemon, index) => {
                    return (<Link href={`/pokemons/${pokemon.id}`} key={pokemon.id} passHref>
                        <a ref={index === data!.pokemon_v2_pokemon.length - 1 ? ref : undefined} 
                        className=' p-1 m-0 w-80 h-20 text-center flex flex-wrap justify-center gap-4 content-center  rounded-xl 
                        bg-gray-100 text-lg shadow-sm hover:shadow-xl hover:scale-105 capitalize' >
                            <span className='self-center'>{pokemon.name}</span>
                            <Image alt={pokemon.name} width={70} height={70} 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}/>

                        </a>
                        </Link>

                    )

                })
            }
        </div>
    )
}

export default PokemonList