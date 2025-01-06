
const ProductCardAdmin = ({data}) => {
    return (
        <div className="w-36 p-2 pb-0 bg-white rounded-md shadow-md">
            <div>
                <img 
                    src={data?.image[0]}
                    alt={data?.name}
                    className="w-full aspect-square rounded-md shadow-md border"
                />
            </div>
            <div className="p-2">
                <p className="text-ellipsis line-clamp-2 font-semibold">{data?.name}</p>
                <p className="text-slate-400">{data?.unit}</p>
            </div>
        </div>
    );
}

export default ProductCardAdmin;