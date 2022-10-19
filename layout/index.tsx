import { NextPage } from "next";

interface Props {
    children:
    | JSX.Element
    | JSX.Element[]
}

const Layout: NextPage<Props> = ({ children }) => {


    return (
        <main className="w-screen h-screen gap-7 flex bg-[#EAEDEE] relative p-10">
            {children}
        </main>

    )

}

export default Layout;