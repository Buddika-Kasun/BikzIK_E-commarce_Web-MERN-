import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [unauthorized, setUnauthorized] = useState(false);
    
    useEffect(() => {
        if (!isAdmin(user?.role)) {
            setUnauthorized(true);
            const timer = setTimeout(() => {
                navigate("/"); // Redirect to the home page after 3 seconds
            }, 3000);

            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [user, navigate]);

    return (
        <>
            {
                (!unauthorized) ? children :
                    <div className="text-red-600 bg-red-100 p-4 ml-2">
                        You do not have permission to access this page.<br/>
                        Redirecting to the home page...
                    </div>
            }
         </>
    );
};

export default AdminPermission;
