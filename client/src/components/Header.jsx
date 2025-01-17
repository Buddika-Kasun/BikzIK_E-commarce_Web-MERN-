import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Search from './Search';
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { FaArrowLeft } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState,useEffect } from 'react';
import UserMenu from './UserMenu';
import Logo from './Logo';
import { priceDisplay } from '../utils/priceDisplay.js'
import { useGlobalContext } from '../provider/GlobalProvider.jsx';
import CartButton from './CartButton.jsx';
import DisplayCart from './DisplayCart.jsx';

const Header = () => {

    const [ isMobile ] = useMobile();
    const location = useLocation();
    const navigate = useNavigate();

    //const [openUserMenu, setOpenUserMenu] = useState(false); 
    /* const [cartButtonDetails, setCartButtonDetails] = useState({
        totalItems: 0,
        totalPrice: 0
    }); */
    // const [openCart, setOpenCart] = useState(false);

    const { cartButtonDetails, openCart, setOpenCart, openUserMenu, setOpenUserMenu } = useGlobalContext();

    const user = useSelector((state) => state.user);
    //const cartItem = useSelector((state) => state.cart.cart);

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

    // Cal total items & total price
    /* const calTotals = () => {
        const totItems = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity
        },0);

        const totPrice = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity * curr.productId?.price
        },0);

        setCartButtonDetails(() => {
            return {
                totalItems: totItems,
                totalPrice: totPrice,
            }
        })
    }

    useEffect(() => {
        calTotals();
        
    },[cartItem]); */

    return (
        <header className='h-28 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center bg-white z-50'>

            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex justify-between items-center'>
                            
                        {/* Logo */}
                        <div>
                            <Link to={"/"} className='flex items-center justify-center h-full'>
                                {/* <img 
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
                                /> */}
                                <Logo />
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

                                <div className='flex items-center justify-center w-14 aspect-square border-2 border-neutral-300 rounded-full overflow-hidden'>
                                {
                                    user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt='Avatar'
                                            className='w-full h-full'
                                        />
                                    ) : (
                                        <FaRegUserCircle size={48} />
                                    )
                                }
                                </div>
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
                                {/* <button className='flex items-center gap-2 bg-secondary-200 hover:bg-green-700 text-white py-2 px-3 rounded-md'>
                                    
                                    <div className='animate-bounce'>
                                        <FaCartShopping size={22} />
                                    </div>

                                    {
                                        cartButtonDetails.totalItems > 0 ? (
                                            <div>
                                                <div>{cartButtonDetails.totalItems} Item</div>
                                                <div>{priceDisplay(cartButtonDetails.totalPrice)}</div>
                                            </div>
                                        ) : (
                                            <div className='font-semibold'>
                                                <p>My Cart</p>
                                            </div>
                                        )
                                    }
                                    
                                </button> */}
                                <CartButton />
                            </div>
                        </div>

                    </div>
                )
            }

            <div className='container mx-auto lg:hidden flex items-center relative mt-2'>
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

            {
                openCart && (
                    <DisplayCart close={() => setOpenCart(false)} />
                )
            }

        </header>
    );
}

export default Header;