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
        <div className="w-full h-screen bg-[#EAEDEE] ">
            <main className="w-full h-full gap-7 p-10">
                {/* <Header /> */}
                {children}
            </main>
            {/* <Footer /> */}
        </div>

    )

}

export default Layout;