import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";


const Dashboard = () => {
    return (
        <section className="">
            <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
                {/* Left Menu */}
                <div className="p-4 sticky top-20 overflow-auto hidden lg:block border-r-2 border-r-slate-200 min-h-[77vh]">
                    <UserMenu />
                </div>

                {/* Right Content */}
                <div className="p-3">
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;