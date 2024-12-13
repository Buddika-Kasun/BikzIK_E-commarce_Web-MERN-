import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import Search from './Search';
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaArrowLeft } from "react-icons/fa";

const Header = () => {

    const [ isMobile ] = useMobile();
    const location = useLocation();

    const isSearchPage = location.pathname === "/search";

    return (
        <header className='h-28 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center'>

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
                                    height={80}
                                    width={80}
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
                            <button className='text-neutral-600 lg:hidden'>
                                <FaRegUserCircle size={40} />
                            </button>
                            <div className='hidden lg:block'>
                                login & cart
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