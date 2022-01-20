import Image from "next/image"
import pikachuPic from "../assets/pikachu.png"
import Link from "next/link"

const NavBar: React.FC = () => {
    return (
        <nav className="bg-orange-200 p-5">
            <div className="flex flex-wrap justify-start font-bold gap-x-5">
                <div className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <div className="text-center">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default NavBar;