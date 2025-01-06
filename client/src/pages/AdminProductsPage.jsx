import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";



const AdminProductsPage = () => {

    const [productData, setProductData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async() => {

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.get_product,
                data: {
                    page: page,
                    limit: 12,
                    search: searchTerm
                }
            });

            if(response.data.success) {
                setProductData(response.data.data);
                setTotalPages(response.data.totalNoPage);
            }
        }
        catch (error) {
            console.error(error);
            AxiosToastError(error);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const handlePrevious = () => {
        if(page !== 1) {
            setPage(prev => prev - 1)
        }
    };

    const handleNext = () => {
        if(page !== totalPages) {
            setPage(prev => prev + 1)
        }
    };
        
    const handleOnChange = (e) => {
        const {value} = e.target;
        setPage(1);
        setSearchTerm(value);
    };

    useEffect(() => {
        let flag = true;

        const timer = setTimeout(() => {
            if(flag) {
                flag = false;
                fetchProducts();
            }
        }, 300);
        
        return () => {
            clearTimeout(timer);
        }
    }, [searchTerm]);

    return (
        <section className="relative"> 
            <div className="p-2 pt-4 shadow-md flex justify-between sticky top-28 lg:top-20 bg-blue-50 z-30 gap-4">
                <h2 className="font-semibold">Products</h2>
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleOnChange}
                        placeholder="Search product here..."
                        className="h-full px-2 py-1 rounded-md outline-none border-[1.5px] border-slate-300 focus-within:border-slate-400 text-slate-500"
                    />
                </div>
            </div>
            
            <div className="p-4 relative pb-20 min-h-[69vh]">

                { 
                    loading && <Loading />
                }

                {
                    !productData[0] &&  !loading && (
                        <NoData />
                    )
                }
                <div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {
                        productData.map((product, index) => {
                            return (
                                <ProductCardAdmin
                                    key={index}
                                    data={product}
                                />
                            )
                        })
                    }
                </div>
                    {
                        productData[0] &&
                        <div className="flex justify-between my-4 absolute bottom-0 w-[calc(100%-32px)]">
                            <button
                                className={`w-28 border ${(page === 1) ? 'bg-gray-400 cursor-default': 'bg-green-500 hover:bg-green-600'} text-white py-1 rounded group flex items-center justify-center relative`}
                                onClick={handlePrevious}
                            >
                                <div className={`${(page === 1) ? '': 'group-hover:block'} hidden absolute left-2 py-1`}>
                                    <FaChevronLeft size={15} />
                                </div>
                                <span className="group-hover:pl-0">Previous</span>
                            </button>

                            <button
                                className=""
                            >
                                {page}/{totalPages}
                            </button>

                            <button
                                className={`w-28 border ${(page === totalPages) ? 'bg-gray-400 cursor-default': 'bg-green-500 hover:bg-green-600'} text-white py-1 rounded group flex items-center justify-center relative`}
                                onClick={handleNext}
                            >
                                <span className="group-hover:pr-0">Next</span>
                                <div className={`${(page === totalPages) ? '': 'group-hover:block'}  pl-1 hidden absolute right-5`}>
                                    <FaChevronRight size={15} />
                                </div>
                            </button>
                        </div>
                    }
                </div>
            </div>

        </section>
    );
}

export default AdminProductsPage;