import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useGlobalContext } from "../provider/GlobalProvider";
import fetchDetails from "../utils/fetchDetails";

const LoginPage = () => {

  const { setLogin } = useGlobalContext();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchUser = async() => {
    // const userData = await fetchUserDetails();
    const userData = await fetchDetails({url: 'user_details'});

    if(userData){
      toast.success("userData in login")
      dispatch(setUser(userData.data));
    }
    else{
      toast.error("userData not found in login")
    }
  }

  const fetchUser2 = async() => {
    try{
      const response = await Axios({
        ...SummaryApi.user_details,
      });

      if(response?.data?.success){
        toast.success("userData in login")
        dispatch(setUser(response.data.data));
      }
      else{
        toast.error("userData error")
      }
    }
    catch(error){
      //console.log(error);
      toast.error(error);
    }
  }

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
    
    try{
      const res = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if(res.data.error) {
        toast.error(res.data.message);
      }

      if(res.data.success) {

        toast.success(res.data.message);

        setLogin(true);
        
        setData({
          email: "",
          password: "",
        });
        
        //fetchUser();
        fetchUser2();
        
        //const fetchUser = await fetchUserDetails();
        //dispatch(setUser(fetchUser?.data));

        // Store token in local storage
        localStorage.setItem('accessToken', res.data.data.accessToken);
        localStorage.setItem('refreshToken', res.data.data.refreshToken);
        
        navigate("/");
        
      }
    }
    catch(err){
      //toast.error(err)
      AxiosToastError(err);
    }

  };

  return (
    <section className="w-full">
      <div className="bg-white my-4 p-7 rounded w-full max-w-lg mx-auto shadow-lg">
        <p className="text-lg w-full text-center font-bold">Login</p>

        {/* Login form */}
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

            {/* Forgot password */}
            <Link to={'/forgot-password'} className="block ml-auto text-gray-500 hover:text-green-600">Forgot password ?</Link>

          </div>

          {/* Submit button */}
          <button className={`${validValues? "bg-green-600 hover:bg-green-700": "bg-gray-400"} py-1 mb-2 mt-4 text-white tracking-wide rounded font-semibold`}>
            Log in
          </button>
        </form>

        {/* Already have an account? */}
        <p>
          Don&apos;t have an account ? &nbsp;
          <Link to={'/register'} className="font-semibold text-green-600 hover:text-green-700">Register</Link>
        </p>

      </div>
    </section>
  );
};

export default LoginPage;
