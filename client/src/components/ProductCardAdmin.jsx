import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";

const ProductCardAdmin = ({data, fetchProducts}) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleDelete = async() => {
        try {
            //setLoading(true);

            const response = await Axios({
                ...SummaryApi.delete_product,
                data: {
                    productId: data?._id
                },
            });

            if(response.data.success) {
                toast.success("Product deleted successfully.");
                
                fetchProducts();
                setOpenDelete(false);
            }

        }
        catch(error) {
            console.log(error);
            AxiosToastError(error)
        }
        finally {
            //setLoading(false);
        }
    };

    return (
        <div className="w-36 h-[236px] p-2 pb-0 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-center">
                <img 
                    src={data?.image[0]}
                    alt={data?.name}
                    className="w-28 h-28 aspect-square rounded-md"
                />
            </div>
            <div className="p-2 pt-1 h-[82px]">
                <p className="text-ellipsis line-clamp-2 font-semibold">{data?.name}</p>
                <p className="text-slate-400">{data?.unit}</p>
            </div>
            <div className="flex items-center justify-end gap-2 ">
                <button
                    className="p-1 bg-green-200 rounded text-green-500 hover:text-green-700"
                    onClick={() => setOpenEdit(true)}
                >
                    <RiPencilFill size={18} />
                </button>
                <button
                    className="p-1 bg-red-200 rounded text-red-500 hover:text-red-700"
                    onClick={() => setOpenDelete(true)}
                >
                    <MdDelete size={18} />
                </button>
            </div>

            {
                openEdit && 
                <EditProductAdmin
                    product={data}
                    close={() => setOpenEdit(false)}
                    fetchProducts={fetchProducts}
                />
            }

            {
                openDelete &&
                <ConfirmBox
                    text={`${data?.name} product`}
                    confirm={handleDelete}
                    cancel={() => setOpenDelete(false)}
                    close={() => setOpenDelete(false)}
                />
            }

        </div>
    );
}

export default ProductCardAdmin;