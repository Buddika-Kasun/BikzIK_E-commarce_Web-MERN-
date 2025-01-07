import bannerDesktop from '../assets/bannerDesktop.jpg';
import bannerMobile from '../assets/bannerMobile.jpg';
import { useSelector } from 'react-redux';
import { validURLConvert } from '../utils/validURLConvert';
import { useNavigate } from "react-router-dom";
import CategoryWiseProduct from '../components/CategoryWiseProduct';


const Home = () => {

    const loadingCategory = useSelector(state => state.product.loadingCategory);
    const category = useSelector(state => state.product.allCategory);
    const subCategory = useSelector(state => state.product.allSubCategory);

    const navigate = useNavigate();

    const handleRedirectProductListPage = (categoryId, categoryName) => {

        const subCategoryData = subCategory.find(sub => {
            const filterDate = sub.category.some(c => {
                return c._id == categoryId;
            });

            return filterDate ? true : null;
        });

        const url = `/${validURLConvert(categoryName)}-${categoryId}/${validURLConvert(subCategoryData?.name)}-${subCategoryData?._id}`;
    
        navigate(url);
    
    };

    return (
        <section>
            {/* Banner */}
            <div className="container mx-auto m-2 p-4 pb-2">
                <div className={`max-h-48 bg-slate-300 rounded-md ${!bannerDesktop && 'animate-pulse'} overflow-hidden shadow-md`}>
                    <img
                        src={bannerDesktop}
                        className="w-full hidden lg:block"
                        alt='Banner'
                    />
                    <img
                        src={bannerMobile}
                        className="w-full lg:hidden"
                        alt='Banner'
                    />
                </div>
            </div>

            {/* Category */}
            <div className='container px-4 mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2'>
                {
                    loadingCategory ? (
                    new Array(20).fill(null).map((category, index) => {
                        return (
                            <div key={index} className='bg-white rounded-md p-2 min-h-28 grid gap-2 shadow-md animate-pulse'>
                                <div className='bg-blue-200 min-h-10 rounded'></div>
                                <div className='bg-blue-100 h-8 rounded'></div>
                                {/* <div className='grid grid-cols-2 gap-2'>
                                    <div className='bg-blue-100 h-8 rounded'></div>
                                    <div className='bg-blue-100 h-8 rounded'></div>
                                </div> */}
                            </div>
                        )
                    })
                    ) : (
                        category.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    className='bg-white rounded-md p-2 min-h-28 grid gap-2 shadow cursor-pointer'
                                    onClick={() => handleRedirectProductListPage(category._id, category.name)}    
                                >
                                    <div className='bg-blue-200 min-h-10 rounded overflow-hidden border border-slate-300'>
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    <div className='rounded font-semibold px-1 text-center w-full'>{category.name}</div>

                                </div>
                            )
                        })
                    )
                }
            </div>

            {/* Category wise products */}
            {
                category.map((category, index) => {
                    return (
                        <CategoryWiseProduct key={index} id={category._id} name={category.name} />
                    )
                })
            }

        </section>
    );
}

export default Home;