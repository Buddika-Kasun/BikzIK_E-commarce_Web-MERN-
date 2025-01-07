import { priceDisplay } from '../utils/priceDisplay.js';

const CardProduct = ({data}) => {
    return (
        <div className="border p-2 grid gap-2 max-w-52 lg:min-w-52 rounded">
            <div className="max-h-32 rounded overflow-hidden">
                <img 
                    src={data?.image[0]}
                    className="w-full h-full object-scale-down lg:scale-125"
                />
            </div>
            <div className="bg-green-100 text-green-500 px-2 py-[1px] text-sm rounded-md w-fit">
                10 min
            </div>
            <div className="px-1 font-medium text-ellipsis line-clamp-2">
                {data?.name}
            </div>
            <div className="w-fit px-1">
                {data?.unit}
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

        </div>
    );
}

export default CardProduct;