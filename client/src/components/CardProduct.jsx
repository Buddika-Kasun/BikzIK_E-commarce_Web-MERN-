import { Link } from 'react-router-dom';
import { priceDisplay } from '../utils/priceDisplay.js';
import { validURLConvert } from '../utils/validURLConvert.js';
import { priceWithDiscount } from '../utils/priceWithDiscount.js';

const CardProduct = ({data}) => {

    const url = `/product/${validURLConvert(data?.name)}-${data?._id}`

    return (
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
                            <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-8 md:px-4 rounded">
                                Add
                            </button>
                        ) : ( 
                            <div className="text-red-700 px-1 md:p-1 text-sm">Out of Stock</div>
                        )
                    }
                </div>
            </div>

        </Link>
    );
}

export default CardProduct;