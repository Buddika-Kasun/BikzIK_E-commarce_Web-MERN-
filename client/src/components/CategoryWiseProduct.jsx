import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const CategoryWiseProduct = ({id, name}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoryWiseProduct = async() => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.get_product_by_category,
                data: {
                    categoryId: id
                }
            });

            if (response.data.success) {
                setData(response.data.data);
            }
        }
        catch(error) {
            console.error(error);
            AxiosToastError(error)
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryWiseProduct();
    }, []);

    const loadingCardNumber = new Array(6).fill(null); 

    return (
        <div className={`${!loading && !data[0] && 'hidden'}`}>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h1 className='font-semibold text-lg md:text-xl'>{name}</h1>
                <Link to='' className='text-green-500 hover:text-green-400'>See All</Link>
            </div>
            <div className="flex items-center gap-4 overflow-auto px-4">
                {
                    loading &&
                    loadingCardNumber.map((_,index) => {
                        return <CardLoading key={index}/>
                    })
                }

                {
                    data.map((product, index) => {
                        return <CardProduct key={index} data={product} />
                    })
                }

                <div className="absolute w-full px-6 mx-auto left-0 right-0 flex justify-between">
                    <button className="">
                        <FaChevronLeft />
                    </button>
                    <button className="">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryWiseProduct;