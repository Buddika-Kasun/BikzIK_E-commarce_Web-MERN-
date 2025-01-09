import { Link } from 'react-router-dom';
import { priceDisplay } from '../utils/priceDisplay.js';
import { validURLConvert } from '../utils/validURLConvert.js';

const CardProduct = ({data}) => {

    const url = `/product/${validURLConvert(data?.name)}-${data?._id}`

    return (
        <Link to={url} className="border p-2 grid min-w-48 lg:w-52 h-72 lg:h-[296px] rounded-md shadow-md mb-2 bg-white hover:shadow-lg relative">
            <div className="h-32 rounded overflow-hidden">
                <img 
                    src={data?.image[0]}
                    className="w-full h-full object-scale-down lg:scale-125"
                />
            </div>
            <div className='h-28'>
                <div className="bg-green-100 text-green-500 px-2 py-[1px] text-sm rounded-md w-fit h-fit">
                    10 min
                </div>
                <div className="px-1 py-2 font-medium text-ellipsis line-clamp-2">
                    {data?.name}
                </div>
                <div className="w-fit px-1">
                    {data?.unit}
                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">
                    {priceDisplay(data?.price)}
                </div>
                <div className="">
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">
                        Add
                    </button>
                </div>
            </div>

        </Link>
    );
}

export default CardProduct;