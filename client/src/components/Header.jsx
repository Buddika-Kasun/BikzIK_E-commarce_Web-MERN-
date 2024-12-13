import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Search from './Search';
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaArrowLeft } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {

    const [ isMobile ] = useMobile();
    const location = useLocation();
    const navigate = useNavigate();

    const isSearchPage = location.pathname === "/search";

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    return (
        <header className='h-28 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center bg-white'>

            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex justify-between items-center'>
                            
                        {/* Logo */}
                        <div>
                            <Link to={"/"} className='flex items-center justify-center h-full'>
                                <img 
                                    src={logo} 
                                    height={80}
                                    width={80}
                                    alt='Logo' 
                                    className='hidden lg:block'
                                />
                                <img 
                                    src={logo} 
                                    height={70}
                                    width={70}
                                    alt='Logo' 
                                    className='lg:hidden'
                                />
                            </Link>
                        </div>

                        {/* Search */}
                        <div className='hidden lg:block'>
                            <Search />
                        </div>

                        {/* Login & My cart */}
                        <div>
                            {/* Mobile show user icon */}
                            <button className='text-neutral-600 lg:hidden'>
                                <FaRegUserCircle size={40} />
                            </button>

                            {/* Desktop show login */}
                            <div className='hidden lg:flex items-center gap-8'>
                                <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                <button className='flex items-center gap-2 bg-secondary-200 hover:bg-green-700 text-white py-2 px-3 rounded-md'>
                                    <div className='animate-bounce'>
                                        <FaCartShopping size={22} />
                                    </div>
                                    <div className='font-semibold'>
                                        <p>My Cart</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                )
            }

            <div className='container mx-auto lg:hidden flex items-center'>
                {
                    isSearchPage && (
                        <Link to={"/"} className="flex items-center justify-center p-2 mr-1 rounded-full border-2 border-neutral-400 text-neutral-500 bg-gray-100 active:text-black active:border-black">
                            <FaArrowLeft size={16} />
                        </Link>
                    )
                }
                <Search />
            </div>

        </header>
    );
}

export default Header;