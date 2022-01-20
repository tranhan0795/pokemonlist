import Image from "next/image"
import pokemonPic from "../assets/logo-pokemon-79x45.png"
import Link from "next/link"

const NavBar: React.FC = () => {
    return (
        <nav className="bg-green-500 px-5 py-1">
            <div className="flex flex-wrap justify-start gap-x-5">
                <div>
                    <Link href="/">
                        <a><Image src={pokemonPic} alt="pokemon" className="self-center"/></a>
                    </Link>
                </div>
                <div className="font-semibold self-center text-white text-xl">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default NavBar;