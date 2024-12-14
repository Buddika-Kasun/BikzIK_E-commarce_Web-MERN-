import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState(["","","","","",""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if(!location?.state?.email){
      navigate('/forgot-password');
    }
  }, []);

  const validValues = otp.every(el =>el);

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!validValues) {
      toast.error("Please provide your OTP code");
      return;
    }
    
    try{
      const res = await Axios({
        ...SummaryApi.verify_otp,
        data: {
          otp: otp.join(""),
          email: location?.state?.email
        },
      });

      if(res.data.error) {
        toast.error(res.data.message);
      }

      if(res.data.success) {

        toast.success(res.data.message);

        setOtp(["","","","","",""]);

        navigate("/reset-password", {
          state: {
            email: location?.state?.email,
            data: res.data
          },
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
        <p className="text-lg w-full text-center font-bold">OTP Verification</p>

        {/* OTP verification form */}
        <form className="grid gap-5 mt-4" onSubmit={handleSubmit}>

          {/* OTP */}
          <div className="grid">
            <label className="form-label" htmlFor="otp">
              Enter your OTP
            </label>
            <div className="flex gap-4 mt-4">
              {
                otp.map((element, index) => (
                  <input
                    key={index}
                    id="otp"
                    type="text"
                    className="form-field text-center font-semibold"
                    maxLength={1}
                    value={otp[index]}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      
                      const otpData = [...otp];
                      otpData[index] = value;

                      setOtp(otpData);

                      if(value && index < 5) {
                        inputRef.current[index + 1].focus(); 
                      }
                    }}
                    autoFocus
                  />
                ))
              }
            </div>
          </div>

          {/* Submit button */}
          <button className={`${validValues? "bg-green-600 hover:bg-green-700": "bg-gray-400"} py-1 mb-2 mt-4 text-white tracking-wide rounded font-semibold`}>
            Verify OTP
          </button>
        </form>

        {/* Reset password page link */}
        <p>Already know the password ? &nbsp;
            <Link to={'/login'} className="font-semibold text-green-600 hover:text-green-700">Login</Link>
        </p>

      </div>
    </section>
  );
};

export default OtpVerifyPage;
