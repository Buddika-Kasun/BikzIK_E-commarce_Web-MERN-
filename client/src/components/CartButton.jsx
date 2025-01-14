import { FaCartShopping } from 'react-icons/fa6';
import { priceDisplay } from '../utils/priceDisplay';
import { useGlobalContext } from '../provider/GlobalProvider';
import { Link, useLocation } from 'react-router-dom';

const CartButton = () => {

    const { cartButtonDetails, setOpenCart, login } = useGlobalContext();

    const location = useLocation();

    return (
        <div className={`${!login || (location.pathname === '/checkout')  && 'hidden'} lg:block`}>
            <button onClick={() => setOpenCart(true)} className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md w-full'>
                <div className='lg:animate-bounce bg-slate-200 bg-opacity-30 lg:opacity-100 p-2 rounded lg:bg-transparent lg:p-0'>
                    <FaCartShopping size={22} />
                </div>

                {
                    cartButtonDetails.totalItems > 0 ? (
                        <div className='flex lg:flex-col gap-4 lg:gap-0 items-start pl-2 lg:pl-0 text-xl lg:text-base font-semibold'>
                            <div>{cartButtonDetails.totalItems} Item</div>
                            <div>{priceDisplay(cartButtonDetails.totalPrice)}</div>
                        </div>
                    ) : (
                        <div className='font-semibold'>
                            <p>My Cart</p>
                        </div>
                    )
                }
                
            </button>
        </div>
    );
}

export default CartButton;