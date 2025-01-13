import { Link } from 'react-router-dom';
import { priceDisplay } from '../utils/priceDisplay.js';
import { validURLConvert } from '../utils/validURLConvert.js';
import { priceWithDiscount } from '../utils/priceWithDiscount.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { useState } from 'react';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import NotLogin from './NotLogin.jsx';
import { useGlobalContext } from '../provider/GlobalProvider.jsx';
import AddToCartButton from './AddToCartButton.jsx';

const CardProduct = ({data}) => {

    // const [loading, setLoading] = useState(false);
    const [notLogin, setNotLogin] = useState(false);

    //const { fetchCartItems, updateQty } = useGlobalContext();

    const url = `/product/${validURLConvert(data?.name)}-${data?._id}`;

    /* const handleAddToCart = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.add_to_cart,
                data: {
                    productId: data?._id
                }
            });

            if (response.data.success) {
                toast.success("Product added to cart successfully.");
                fetchCartItems();
            }

        }
        catch (error) { 
            if(error && error.status == 401) {
                setNotLogin(true);
            }
            else {
                console.log(error);
                AxiosToastError(error);
            }
        }
        finally {
            setLoading(false);
        }
    }; */

    /* const increaseQty = () => {
        updateQty(data?._id, 'inc');
    }; */

    return (
        <>    

            {notLogin && <NotLogin close={() => setNotLogin(false)}/>}

            <Link to={url} className="border p-2 grid min-w-48 lg:w-52 h-80 lg:h-[296px] rounded-md shadow-md mb-2 bg-white hover:shadow-lg relative">
                <div className="h-32 rounded overflow-hidden">
                    <img 
                        src={data?.image[0]}
                        className="w-full h-full object-scale-down lg:scale-125"
                    />
                </div>
                <div className='h-28'>
                    <div className='flex gap-2'>
                        <div className="bg-green-100 text-green-500 px-2 py-[1px] text-sm rounded-md w-fit h-fit">
                            10 min
                        </div>
                        {
                            data?.discount > 0 && 
                            <div className="bg-red-100 text-red-500 px-2 py-[1px] text-sm rounded-md w-fit h-fit">
                                {data?.discount}% Discount
                            </div>
                        }
                    </div>
                    <div className="px-1 py-2 font-medium text-ellipsis line-clamp-2">
                        {data?.name}
                    </div>
                    <div className="w-fit px-1">
                        {data?.unit}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="font-semibold px-1">
                        {priceDisplay(priceWithDiscount(data?.price, data?.discount))}
                    </div>
                    <div className="">
                        {
                            data?.stock > 0? (
                                <AddToCartButton data={data} setNotLogin={() => setNotLogin(true)} />
                            ) : ( 
                                <div className="text-red-700 px-1 md:p-1 text-sm">Out of Stock</div>
                            )
                        }
                    </div>
                </div>
            </Link>
        </>
    );
}

export default CardProduct;