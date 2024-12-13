import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

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
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must be the same!");
      return;
    }
    
    try{
      const res = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      console.log(res);

      if(res.data.error) {
        toast.error(res.data.message);
      }

      if(res.data.success) {

        toast.success(res.data.message);

        setData({
          name: "",
          email: "",
          password: "",
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
      <div className="bg-white my-4 p-7 rounded w-full max-w-lg mx-auto">
        <p className="text-lg w-full text-center">Welcome to BikzIK</p>

        {/* Register form */}
        <form className="grid gap-5 mt-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-field"
              id="name"
              name="name"
              type="text"
              autoFocus
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

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

          {/* Password */}
          <div className="grid">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="flex items-center form-field focus-within:border-[1.5px] focus-within:border-blue-300 focus-within:bg-blue-100 focus-within:shadow-sm">
              <input
                className="w-full outline-none bg-transparent"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoFocus
                placeholder="Enter your password"
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
                placeholder="Confirm your password"
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
            Register
          </button>
        </form>

        {/* Already have an account? */}
        <p>
          Already have an account ? &nbsp;
          <Link to={'/login'} className="font-semibold text-green-600 hover:text-green-700">Login</Link>
        </p>

      </div>
    </section>
  );
};

export default RegisterPage;
