

const CardLoading = () => {
    {/* <div className="border p-2 grid gap-1 min-w-48 lg:w-52 h-80 lg:h-[296px]rounded animate-pulse">
        <div className="min-h-20 bg-blue-100 rounded"></div>
        <div className="p-3 bg-blue-100 rounded w-20"></div>
        <div className="p-3 bg-blue-100 rounded"></div>
        <div className="p-3 bg-blue-100 rounded w-14"></div>
        <div className="flex items-center justify-between gap-2">
            <div className="p-3 bg-blue-100 rounded w-16"></div>
            <div className="p-3 bg-blue-100 rounded w-16"></div>
        </div>

    </div> */}
    return (
        <div className="border p-2 grid min-w-48 lg:w-52 h-80 lg:h-[296px] rounded-md shadow-md mb-2 bg-white hover:shadow-lg relative animate-pulse">
            <div className="h-28 md:h-32 rounded overflow-hidden bg-blue-100 text-blue-100">
                image
            </div>
            <div className='h-28'>
                <div className='flex gap-2 my-1'>
                    <div className="bg-blue-100 px-2 py-[1px] text-sm rounded-md w-fit h-fit text-blue-100">
                        10 min
                    </div>
                    <div className="bg-blue-100 px-2 py-[1px] text-sm rounded-md w-fit h-fit text-blue-100">
                        10% discount
                    </div>
                </div>
                <div className="px-1 py-2 my-2 font-medium text-ellipsis line-clamp-2 rounded bg-blue-100 text-blue-100">
                    Product Name
                </div>
                <div className="w-fit px-1 bg-blue-100 text-blue-100 rounded">
                    1 kg 1 kg
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="bg-blue-100 rounded px-4 py-1 w-fit md:w-full text-blue-100">
                    LKR 10000
                </div>
                <div className="">
                    <div className="bg-blue-100 text-blue-100 py-1 px-8 md:px-4 rounded">
                        Add
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CardLoading;