import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { validURLConvert } from '../utils/validURLConvert';
import { FaChevronRight } from "react-icons/fa";
import NoData from '../components/NoData';

const ProductListPage = () => {
    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [displaySubCategory, setDisplaySubCategory] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    
    const allSubCategories = useSelector(state => state.product.allSubCategory);
    
    const params = useParams();
    // const subCategoryName = params?.subCategory?.split('-').slice(0, -1).join(' ');
    
    const categoryId = params.category.split('-').slice(-1)[0];
    const subCategoryId = params.subCategory.split('-').slice(-1)[0];

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.get_product_by_category_and_subCategory,
                data: {
                    categoryId: categoryId,
                    subcategoryId: subCategoryId,
                    page: page,
                    limit: 8
                }
            });

            if(response.data.success) {
                setTotalPage(response.data.totalNoPage);
                setPage(response.data.page);
                setCategoryName(response.data.categoryName);
                setSubCategoryName(response.data.subCategoryName);

                if (response.data.page == 1) {
                    setData(response.data.data);
                }
                else {
                    setData([...data, ...response.data.data]);
                }
            }

        }
        catch(error) {
            //console.log(error);
            AxiosToastError(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [params]);

    const filterSubCategories = () => {
        const sub = allSubCategories.filter(s => {
            const filterData = s.category.some(el => el._id === categoryId);
            return filterData? true : null;
        });
        setDisplaySubCategory(sub);
    };

    useEffect(() => {
        filterSubCategories();
    }, [params, allSubCategories]);

    return (
        <section className="">

            <div className='py-2 text-xs font-semibold items-center gap-1 text-green-600 md:hidden flex sticky top-28 bg-blue-50 z-10'>
                <Link to={'/'} className='hover:text-black'>Home</Link>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
                <div>{categoryName}</div>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
            </div>

            <div className="grid grid-cols-[80px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">

                {/* Sub category */}
                <div className=' pb-2 pr-1 sticky top-[135px] md:top-20 h-[80vh] lg:h-[73vh]'>
                    <div className='py-2 text-xs font-semibold items-center gap-1 text-green-600 hidden md:flex sticky lg:top-20 md:top-28 bg-blue-50'>
                        <Link to={'/'} className='hover:text-black'>Home</Link>
                        <div><FaChevronRight size={10} className='text-gray-600' /></div>
                        <div>{categoryName}</div>
                        <div><FaChevronRight size={10} className='text-gray-600' /></div>
                    </div>
                    <div className="h-full overflow-y-scroll p-3 pl-0 pt-1 flex flex-col gap-2 scroll-custom">
                        {/* <div
                            key={index}
                            className='border-b-2 border-b-slate-200 p-2 text-ellipsis line-clamp-1 cursor-pointer hover:bg-slate-200 hover:rounded'
                        >
                            {sub.name}
                        </div> */}
                        {
                            displaySubCategory.map((sub, index) => {
                                
                                const url = `/${validURLConvert(sub?.category[0]?.name)}-${sub?.category[0]?._id}/${validURLConvert(sub.name)}-${sub._id}`; 
                                
                                return (
                                    <Link 
                                        to={url} 
                                        key={index}
                                        className={`lg:max-h-[70px] lg:min-h-[70px] w-full p-2 shadow rounded lg:flex items-center ${sub._id == subCategoryId ? 'bg-green-200 cursor-default': 'hover:bg-slate-200 cursor-pointer'}`}
                                    >
                                        <div className='w-fit flex items-center justify-center'>
                                            <img
                                                src={sub.image}
                                                className='w-14 h-full object-scale-down'
                                            />
                                        </div>
                                        <p className='text-xs text-center lg:px-2 text-ellipsis line-clamp-3'>
                                            {sub.name}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Products */}
                <div className="">
                    
                    <div className='shadow-md px-4 pb-2 pt-1 lg:pt-2 rounded-md sticky top-[144px] md:top-28 lg:top-20 z-10 bg-blue-50'>
                        <h1 className='font-semibold'>{subCategoryName}</h1>
                    </div>
                    <div>

                        <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-3'>
                            {
                                data.map((product, index) => (
                                    <CardProduct key={index} data={product} />
                                ))
                            }
                        </div>

                        {
                            loading && <Loading />
                        }

                        {
                            !data[0] && !loading && <NoData />
                        }

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductListPage;