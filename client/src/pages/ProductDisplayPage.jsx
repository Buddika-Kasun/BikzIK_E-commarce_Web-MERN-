import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { FaChevronRight } from "react-icons/fa";
import { priceDisplay } from '../utils/priceDisplay';
import Divider from '../components/Divider';
import imageDelivery from '../assets/expressDelivery.png';
import imageBestPrice from '../assets/bestPrice.jpg';
import imageWideAssort from '../assets/wideAssort.png';
import { priceWithDiscount } from '../utils/priceWithDiscount';
import { validURLConvert } from '../utils/validURLConvert';

const ProductDisplayPage = () => {

    const params = useParams();
    const productId = params?.product?.split('-').splice(-1)[0];

    const [product, setProduct] = useState({
        image: [""],
        category: [],
        subCategory: [],
    });
    const [loading, setLoading] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const fetchProduct = async() => {
        try{
            
            const response = await Axios({
                ...SummaryApi.get_product_by_id,
                data: {
                    productId: productId
                }
            });
            
            if (response.data.success) {
                setProduct(response.data.data);
            }
            
        }
        catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };
    
    useEffect(() => {
        fetchProduct();
    }, [params]); console.log(product)
    
    const urlCategory = `/${validURLConvert(product?.category[0]?.name)}-${product?.category[0]?._id}/${validURLConvert(product?.subCategory[0]?.name)}-${product?.subCategory[0]?._id}`;
    const urlSubCategory = `/${validURLConvert(product?.category[0]?.name)}-${product?.category[0]?._id}/${validURLConvert(product?.subCategory[0]?.name)}-${product?.subCategory[0]?._id}`;
    
    return (
        <section className=''>
            <div className='py-2 text-xs font-semibold items-center gap-1 text-green-600 flex sticky top-28 lg:top-20 bg-blue-50 z-10'>
                <Link to={'/'} className='hover:text-black'>Home</Link>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
                <Link to={urlCategory}>{product?.category[0]?.name}</Link>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
                <Link to={urlSubCategory}>{product?.subCategory[0]?.name}</Link>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
            </div>
            <div className='grid lg:grid-cols-5 px-4 py-2'>
                <div className='md:hidden'>
                    <p className='bg-green-300 w-fit px-2 rounded-md'>10 Min</p>
                    <h2 className='text-xl font-semibold'>
                        {product.name}
                    </h2>
                    <Divider />
                </div>
                <div className='lg:col-span-2 py-4'>
                    <div className='rounded min-h-72 max-h-72 h-full w-full lg:min-h-[64vh] lg:max-h-[64vh] flex justify-center'>
                        <img
                            src={product.image[imageIndex]}
                            className='w-fit h-full object-scale-down rounded-md shadow-md'
                            />
                    </div>
                    <div className='flex items-center justify-center gap-3 p-3'>
                        {
                            product.image.map((image, index) => (
                                <div
                                key={index}
                                className={`w-3 h-3 bg-slate-200 ${index === imageIndex ? 'bg-slate-300': ''} rounded-full`}
                                />
                            ))
                        }
                    </div>
                    <div className='grid'>
                        <div className='flex gap-3 p-1 pb-3 overflow-x-auto scroll-custom'>
                            {
                                product.image.map((image, index) => (
                                    <div
                                    key={index}
                                        onClick={() => setImageIndex(index)}
                                        className={`min-w-20 min-h-20 lg:w-20 lg:h-20 bg-slate-200 ${index === imageIndex ? 'border border-green-400': 'cursor-pointer'} rounded overflow-hidden shadow-md`}
                                        >
                                        <img src={image} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='hidden md:block md:mt-4'>
                        <h2 className='font-semibold'>Why shop from BikzIK ?</h2>
                        <div className='flex items-center gap-4 py-2'>
                            <img
                                src={imageDelivery}
                                className='w-20 h-20 rounded-full shadow'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Super Fast Delivery</div>
                                <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 py-2'>
                            <img
                                src={imageBestPrice}
                                className='w-20 h-20 rounded-full shadow'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Best Prices & Offers</div>
                                <p>Best price destination with offers directly from the manufacturers.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 py-2'>
                            <img
                                src={imageWideAssort}
                                className='w-20 h-20 rounded-full shadow'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Wide Assortment</div>
                                <p>Choose from 5000+ products across food personal care, household and other categories.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-2 lg:col-span-3 lg:pl-8'>
                    <div className='hidden md:block'>
                        <p className='bg-green-300 w-fit px-2 rounded-md'>10 Min</p>
                        <h2 className='font-semibold lg:text-3xl'>
                            {product.name}
                        </h2>
                        <p className=''>{product.unit}</p>
                        <Divider />
                    </div>
                    <div>
                        <p className='font-semibold'>Price</p>
                        <div className='flex'>
                            <div className='border-[1.5px] border-green-400 bg-green-50 w-fit px-4 py-2 rounded-md'>
                                <p className='font-semibold text-lg lg:text-xl'>{priceDisplay(priceWithDiscount(product?.price, product?.discount))}</p>
                            </div>
                            {
                                product?.discount > 0 && (
                                    <div className='flex flex-col px-2'>
                                        <p className='line-through text-gray-400'>{priceDisplay(product?.price)}</p>
                                        <p className='text-red-700 font-semibold'>{product?.discount}% off</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        product?.stock == 0 ? (
                            <p className='text-red-500 font-semibold mt-2'>Out of Stock</p>
                        ) : (
                            <button className='bg-green-500 hover:bg-green-600 text-white px-8 text-lg font-semibold w-full md:w-fit py-1 mt-4 lg:my-2 rounded-md'>
                                Add
                            </button>
                        )
                    }
                    <Divider />
                    <div className='grid gap-2 my-2'>
                        <div className='md:hidden'>
                            <p className='font-semibold'>Unit</p>
                            <p className='text-sm'>{product?.unit}</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Description</p>
                            <p className='text-sm text-justify'>{product?.description}</p>
                        </div>
                        {
                            product?.more_details && Object.keys(product?.more_details).map((el, index) => {
                                return (
                                    <div key={index}>
                                        <p className='font-semibold'>{el}</p>
                                        <p className='text-sm text-justify'>{product.more_details[el]}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='md:hidden'>
                        <Divider />
                        <h2 className='font-semibold mt-4'>Why shop from BikzIK ?</h2>
                        <div className='flex items-center gap-4 py-2'>
                            <img
                                src={imageDelivery}
                                className='w-20 h-20 rounded-full shadow'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Super Fast Delivery</div>
                                <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 py-2'>
                            <img
                                src={imageBestPrice}
                                className='w-20 h-20 rounded-full shadow'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Best Prices & Offers</div>
                                <p>Best price destination with offers directly from the manufacturers.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 py-2'>
                            <img
                                src={imageWideAssort}
                                className='w-20 h-20 rounded-full shadow'
                            />
                            <div className='text-sm'>
                                <div className='font-semibold'>Wide Assortment</div>
                                <p>Choose from 5000+ products across food personal care, household and other categories.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDisplayPage;