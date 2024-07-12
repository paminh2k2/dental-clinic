import SideBar from "../components/SideBar/Sidebar"
import { ReactNode } from "react";
interface DefaultLayoutProps {
    children: ReactNode;
}


const DashBoard = ({children}: DefaultLayoutProps) => {
    return (
        <div className="min-h-screen overflow-hidden flex">
            <div className="min-w-40 border-r flex justify-center">
                <SideBar/>
            </div>
            <div className="w-full min-h-srceen bg-slate-100">
                {children}
            </div>
        </div>
    )
}

export default DashBoard