import { GetStaticPaths, GetStaticProps } from "next"
import { initializeApollo } from '../../lib/apollo'
import { gql } from "@apollo/client"
import Image from "next/image"
import Head from "next/head"

const ALL_POKEMON_IDS = gql`
query all_pokemon_ids($limit: Int){
    pokemon_v2_pokemon(limit: $limit) {
    id
  }
}
`
const GET_POKEMON_DATA = gql`
query Get_pokemon_data($where: pokemon_v2_pokemon_bool_exp) {
  pokemon_v2_pokemon(where: $where) {
    id
    height
    name
    weight
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`

interface IdData {
    pokemon_v2_pokemon: [{ id: number }]
}

interface PokemonData {
    pokemon_v2_pokemon: [
        {
            id: number,
            height: number,
            name: string,
            weight: number,
            pokemon_v2_pokemonstats: [
                {
                    base_stat: number,
                    pokemon_v2_stat: {
                        name: string
                    }
                }
            ],
            pokemon_v2_pokemonabilities: [
                {
                    pokemon_v2_ability: {
                        name: string
                    }
                }
            ],
            pokemon_v2_pokemontypes: [
                {
                    pokemon_v2_type: {
                        name: string
                    }
                }
            ]
        }
    ]
}

interface PokemonVar {
    where: {
        id: {
            _eq: number
        }
    }
}

interface Props {
    data: PokemonData
}

export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<IdData>({
        query: ALL_POKEMON_IDS,
        variables: {
            limit: 20
        }
    })
    const ids = data.pokemon_v2_pokemon.map(({ id }: { id: number }) => {
        return { params: { id: id.toString() } }
    })
    return {
        paths: ids,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query<PokemonData, PokemonVar>(
        {
            query: GET_POKEMON_DATA,
            variables: {
                where: {
                    id: {
                        _eq: parseInt(params!.id as string)
                    }
                }
            }
        }
    )

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data
        },
        revalidate: 3600
    }
}

const PokemonCard: React.FC<Props> = ({ data }) => {
    const pokemon = data.pokemon_v2_pokemon[0];

    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
                <meta name="description" content={pokemon.name} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className=" p-5 bg-gray-50 h-screen ">
                <div className="flex flex-wrap justify-center gap-2">
                    <div className="bg-gray-200 rounded-md hover:shadow-lg shadow-sm">
                        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            height={400} width={400} alt={pokemon.name} /> {/* take img url from rest api since graphql not updated yet */}
                    </div>
                    <div className="border-gray-900 border-1 rounded-md hover:shadow-lg shadow-sm w-96 bg-gray-200 p-5">
                        <h1 className="text-center font-extrabold text-xl capitalize">{pokemon.name}</h1>
                        <div>
                            <div className="font-bold">Height:<span className="font-normal"> {pokemon.height}</span> </div>
                            <div className="font-bold">Weight: <span className="font-normal"> {pokemon.weight}</span></div>
                            {pokemon.pokemon_v2_pokemonstats.map((stat, i) => {
                                return (
                                    <div className="font-bold capitalize" key={i}>{stat.pokemon_v2_stat.name}:<span className="font-normal"> {stat.base_stat}</span> </div>
                                )
                            })}
                            <div className="font-bold"> Ability:
                                <div className="flex justify-center">
                                    {pokemon.pokemon_v2_pokemonabilities.map((ability, i) => {
                                        return (
                                            <span className="bg-orange-600 text-white m-1 p-1 w-15 rounded-md font-normal capitalize" key={i}>
                                                {ability.pokemon_v2_ability.name}</span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="font-bold"> Types:
                                <div className="flex justify-center">
                                    {pokemon.pokemon_v2_pokemontypes.map((type, i) => {
                                        return (
                                            <span className="bg-blue-500 text-white m-1 p-1 w-15 rounded-md font-normal capitalize" key={i}>
                                                {type.pokemon_v2_type.name}</span>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard;



