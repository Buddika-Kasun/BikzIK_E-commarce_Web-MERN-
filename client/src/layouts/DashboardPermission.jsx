import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardPermissions = ({children}) => {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        console.log(user)
        if (!user || user._id === "") {
            setUnauthorized(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000); // Redirect to login after 3 seconds
        }
    }, [user, navigate]);

    return (
        <>
            {
                (!unauthorized) ? children : 
                    <div className="flex items-center justify-center h-[73vh] text-red-400">
                        <div className="text-center">
                            <h1 className="text-xl font-bold mb-4">
                                Unauthorized Access
                            </h1>
                            <p className="mb-4">You are not authorized to access this page.</p>
                            <p>Redirecting to login page...</p>
                        </div>
                    </div>
            }
        </>
    );
}

export default DashboardPermissions;