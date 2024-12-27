import { Outlet, useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {

    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if(user._id === "") {
            navigate("/login");
        }
    }, [user._id, navigate]);

    return (
        <section className="">
            <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
                {/* Left Menu */}
                <div className="p-4 sticky top-20 overflow-auto hidden lg:block border-r-2 border-r-slate-200 min-h-[73vh]">
                    <UserMenu />
                </div>

                {/* Right Content */}
                <div className="">
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;