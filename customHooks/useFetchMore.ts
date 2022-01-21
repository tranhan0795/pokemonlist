import React, { useEffect, useRef } from 'react'
import { PokemonData, PokemonVar } from '../components/PokemonList';

interface FetchMoreVars {
    variables: PokemonVar
}

const useFetchMore = (fetchMore: (vars: FetchMoreVars) => Promise<any>, data: PokemonData|undefined): React.RefObject<HTMLAnchorElement> => {
    const ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (ref.current !== null) { //to be sure data is not undefined
            const observer = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                if (entries[0].isIntersecting) {
                   // console.log('inview now');
                    fetchMore({
                        variables: {
                            offset: data!.pokemon_v2_pokemon.length,
                            limit:25,
                        }
                    });
                    if (ref.current !== null) observer.unobserve(ref.current);
                };
            })
            observer.observe(ref.current);
        }
    },[data,fetchMore])
    return ref;
}


export default useFetchMore;