import { useEffect, useState } from "react";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";


const SubcategoryPage = () => {

    const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subCategoriesData, setSubCategoriesData] = useState([]);

    const fetchSubCategory = async() => {
        try{
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.get_subCategory,
            });

            setSubCategoriesData(response.data.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSubCategory();
    }, []);

    return (
        <section>
            <div className="p-2 shadow-md flex justify-between">
                <h2 className="font-semibold">Sub Category</h2>
                <button
                    className="text-sm border border-green-600 hover:bg-green-600 px-3 py-1 rounded-md text-green-600 hover:text-white "
                    onClick={() => setOpenUploadSubCategory(!openUploadSubCategory)}    
                >
                    Add Sub Category
                </button>
            </div>

            { 
                loading && <Loading />
            }

            {
                !subCategoriesData[0] &&  !loading && (
                    <NoData />
                )
            }

            {
                openUploadSubCategory && (
                    <UploadSubCategoryModel
                        close={() => setOpenUploadSubCategory(false)}
                        fetchData={fetchSubCategory}
                        mode = {{
                             status: "create",
                        }}
                    />
                )
            }

        </section>
    );
}

export default SubcategoryPage;