import PokemonList from "./PokemonList"
import { useSearchContext } from "../context/SearchCtxProvider"


const PokeListWithContext:React.FC = ()=>{
    const {searchParams} = useSearchContext();
    
    return (
        <PokemonList searchParams={searchParams}/>
    )
}

export  default PokeListWithContext;