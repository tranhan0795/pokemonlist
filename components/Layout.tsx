import Head from "next/head";
import NavBar from "./NavBar";

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <NavBar/>
            <main>{children}</main>
        </>
    )
}

export default Layout





