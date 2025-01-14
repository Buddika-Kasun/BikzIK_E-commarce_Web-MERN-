import { Outlet, useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import NotLogin from "../components/NotLogin";

const Dashboard = () => {

    const { login } = useGlobalContext();

    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    /* 
    useEffect(() => {
        if(!user._id) {
            navigate("/login");
        }
    }, [user._id, navigate]); */
    

    return (
        <section className="min-h-[77vh]">
            {
                login ? (
                    <div className="container mx-auto px-3 grid lg:grid-cols-[250px,1fr]">
                        {/* Left Menu */}
                        <div className="p-4 sticky top-24 overflow-auto hidden lg:block border-r-2 border-r-slate-200 h-[73vh]">
                            <UserMenu />
                        </div>

                        {/* Right Content */}
                        <div className="">
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <NotLogin />
                )
            }
        </section>
    );
}

export default Dashboard;