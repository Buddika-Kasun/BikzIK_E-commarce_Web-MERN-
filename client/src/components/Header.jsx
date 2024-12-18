import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Search from './Search';
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaArrowLeft } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from 'react';
import UserMenu from './UserMenu';

const Header = () => {

    const [ isMobile ] = useMobile();
    const location = useLocation();
    const navigate = useNavigate();

    const [openUserMenu, setOpenUserMenu] = useState(false); 

    const user = useSelector((state) => state.user);

    const isSearchPage = location.pathname === "/search";

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    const handleClose = () => {
        setOpenUserMenu(false);
    };

    const handleMobileUser = () => {
        if(!user._id){
            navigate("/login");
            return
        }

        setOpenUserMenu(!openUserMenu);
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
                            <button
                                className='text-neutral-600 lg:hidden flex items-center gap-1'
                                onClick={handleMobileUser}
                            >
                                {
                                    user?._id && (
                                        <div>
                                            {
                                                !openUserMenu ? (
                                                    <GoTriangleDown size={22} />
                                                ) : (
                                                    <GoTriangleUp size={22} />
                                                )
                                            }
                                        </div>
                                    )
                                }  
                                <FaRegUserCircle size={40} />
                            </button>

                            {/* Desktop show login */}
                            <div className='hidden lg:flex items-center gap-8'>
                                {
                                    user?._id ? (

                                        <div className='relative'>
                                            <button
                                                className='flex items-center gap-2 cursor-pointer'
                                                onClick={() => setOpenUserMenu((prev) => !prev)}
                                            >
                                                <p>{user?.name}</p>
                                                <div>
                                                    {
                                                        !openUserMenu ? (
                                                            <GoTriangleDown />
                                                        ) : (
                                                            <GoTriangleUp />
                                                        )
                                                    }
                                                </div>
                                            </button>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-12'>
                                                        <div className='bg-white rounded p-4 min-w-44 lg:shadow-lg'>
                                                            <UserMenu close={handleClose}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    ) : (

                                        <button onClick={redirectToLoginPage} className=' px-2'>Login</button>

                                    )
                                }
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

            <div className='container mx-auto lg:hidden flex items-center relative'>
                {
                    isSearchPage && (
                        <Link to={"/"} className="flex items-center justify-center p-2 mr-1 rounded-full border-2 border-neutral-400 text-neutral-500 bg-gray-100 active:text-black active:border-black">
                            <FaArrowLeft size={16} />
                        </Link>
                    )
                }
                {
                    openUserMenu && (
                        <div className='bg-slate-100 py-4 flex absolute left-0 top-0 w-full h-[calc(100vh-75px)] container z-10 border-2 border-t-slate-300'>
                            <UserMenu close={handleClose}/>
                        </div>
                    )
                } 
                <Search />
            </div>

        </header>
    );
}

export default Header;