import { NextPage } from "next";

interface Props {
    children:
    | JSX.Element
    | JSX.Element[]
}

const Layout: NextPage<Props> = ({ children }) => {


    return (
        <>
            <main className="w-full h-screen gap-7 flex bg-[#EAEDEE] overflow-hidden">
                {children}
            </main>
        </>

    )

}

export default Layout;