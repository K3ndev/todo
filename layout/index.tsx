import { NextPage } from "next";
import Header from './header/index'
import Footer from './footer/index'

interface Props {
    children:
    | JSX.Element
    | JSX.Element[]
}

const Layout: NextPage<Props> = ({ children }) => {


    return (
        <>
            <main className="w-full h-full gap-7 flex bg-[#EAEDEE] overflow-hidden">
                {/* <Header /> */}
                {children}
            </main>
            {/* <Footer /> */}
        </>

    )

}

export default Layout;