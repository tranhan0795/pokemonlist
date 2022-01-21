import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import SearchBar, { searchT } from '../components/SearchBar'
import PokemonList from '../components/PokemonList'
import { initializeApollo, addApolloState } from '../lib/apollo'
import { PokemonData, PokemonVar, POKEMON_LIST_QUERY } from '../components/PokemonList'

export interface SearchParams {
  searchValue: string, searchType: searchT
}

const Home: NextPage = () => {

  const [searchParams, setSearchParams] = useState<SearchParams>({ searchValue: '', searchType: 'name' });

  return (
    <div className="p-5">
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar setSearchParams={setSearchParams} />
      <div>
        <PokemonList searchParams={searchParams} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<PokemonData, PokemonVar>({
    query: POKEMON_LIST_QUERY,
    variables: { limit: 30 },
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 3600,
  })
}

export default Home
