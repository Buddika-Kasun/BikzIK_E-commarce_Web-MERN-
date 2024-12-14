import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ResetPasswordPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if(!location?.state?.data?.success) {
            navigate("/");
        }

        if(location?.state?.email) {
            setData((prev) => {
                return {...prev, email: location.state.email};
            });
        }
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    const validValues = Object.values(data).every(el =>el);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
    
        // Check if all fields are filled
        if (!validValues) {
          toast.error("Please fill all required fields!");
          return;
        }
        
        // Check if passwords match
        if (data.newPassword !== data.confirmPassword) {
          toast.error("New password and confirm password must be the same!");
          return;
        }
        
        try{
            const res = await Axios({
                ...SummaryApi.reset_password,
                data: data,
            });
        
            if(res.data.error) {
                toast.error(res.data.message);
            }
        
            if(res.data.success) {
        
                toast.success(res.data.message);
        
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: "",
                });
        
                navigate("/login");
            }
        }
        catch(err){
            AxiosToastError(err);
        }
    
    };

    return (
        <section className="w-full">
            <div className="bg-white my-4 p-7 rounded w-full max-w-lg mx-auto shadow-lg">
                <p className="text-lg w-full text-center font-bold">Reset Password</p>

                {/* Reset password form */}
                <form className="grid gap-5 mt-4" onSubmit={handleSubmit}>

                {/* New Password */}
                <div className="grid">
                    <label className="form-label" htmlFor="newPassword">
                        New Password
                    </label>
                    <div className="flex items-center form-field focus-within:border-[1.5px] focus-within:border-blue-300 focus-within:bg-blue-100 focus-within:shadow-sm">
                        <input
                            className="w-full outline-none bg-transparent"
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            autoFocus
                            placeholder="Enter your new password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <div
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="cursor-pointer"
                        >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="grid">
                    <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div className="flex items-center form-field focus-within:border-[1.5px] focus-within:border-blue-300 focus-within:bg-blue-100 focus-within:shadow-sm">
                        <input
                            className="w-full outline-none bg-transparent"
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoFocus
                            placeholder="Confirm your new password"
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                        <div
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="cursor-pointer"
                        >
                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <button className={`${validValues? "bg-green-600 hover:bg-green-700": "bg-gray-400"} py-1 mb-2 mt-4 text-white tracking-wide rounded font-semibold`}>
                    Reset Password
                </button>
                </form>

                {/* Login link */}
                <p>Already know the password ? &nbsp;
                    <Link to={'/login'} className="font-semibold text-green-600 hover:text-green-700">Login</Link>
                </p>

            </div>
        </section>
    );
}

export default ResetPasswordPage;