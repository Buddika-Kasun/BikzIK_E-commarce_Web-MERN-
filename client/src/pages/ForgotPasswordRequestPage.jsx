import { useState } from "react";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordRequestPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validValues = Object.values(data).every(el =>el);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!validValues) {
      toast.error("Please provide your email!");
      return;
    }
    
    try{
      const res = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if(res.data.error) {
        toast.error(res.data.message);
      }

      if(res.data.success) {

        toast.success(res.data.message);

        navigate("/verify-otp", {
            state: {
              email: data.email,
            },
        });
        
        setData({
          email: "",
        });

      }
    }
    catch(err){
      AxiosToastError(err);
    }

  };

  return (
    <section className="w-full">
      <div className="bg-white my-4 p-7 rounded w-full max-w-lg mx-auto shadow-lg">
        <p className="text-lg w-full text-center font-bold">Forgot password</p>

        {/* Forgot password form */}
        <form className="grid gap-5 mt-4" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="grid">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-field"
              id="email"
              name="email"
              type="email"
              autoFocus
              placeholder="Enter your email address"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Submit button */}
          <button className={`${validValues? "bg-green-600 hover:bg-green-700": "bg-gray-400"} py-1 mb-2 mt-4 text-white tracking-wide rounded font-semibold`}>
            Send OTP
          </button>
        </form>

        {/* Login link */}
        <p>Already know the password ? &nbsp;
            <Link to={'/login'} className="font-semibold text-green-600 hover:text-green-700">Login</Link>
        </p>

      </div>
    </section>
  );
};

export default ForgotPasswordRequestPage;