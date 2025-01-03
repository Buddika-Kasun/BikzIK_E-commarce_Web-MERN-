import { useEffect, useState } from "react";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const SubcategoryPage = () => {

    const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [editSubCategory, setEditSubCategory] = useState({
        open: false,
        subCategoryData: "",
    });
    
    const columnHelper = createColumnHelper();

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

    const handleEditClick = (subCategoryData) => {
        setEditSubCategory({
            open: true,
            subCategoryData: subCategoryData,
        });
    };

    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',

        }),
        columnHelper.accessor('image', {
            header: 'Image',
            cell: ({row}) => {
                return (
                    <div className="flex items-center justify-center">
                        <img
                            src={row.original.image}
                            alt={row.original.name}
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => setImageUrl(row.original.image)} 
                        />
                    </div>
                );
            }
        }),
        columnHelper.accessor('category', {
            header: 'Category',
            cell: ({row}) => {
                return (
                    <>
                        {
                            row.original.category.map((c, i) => (
                                <p key={i} className="inline-block px-2 mx-1 bg-slate-200 rounded">{c.name}</p>
                            ))
                        }
                    </>
                );
            }
        }),
        columnHelper.accessor('_id', {
            header: 'Action',
            cell: ({row}) => {
                return (
                    <div className="flex items-center justify-center gap-3 p-1">
                        <button
                            className="p-1 bg-green-200 rounded-full text-green-500 hover:text-green-700"
                            onClick={() => handleEditClick(row.original)}
                        >
                            <RiPencilFill size={18} />
                        </button>
                        <button className="p-1 bg-red-200 rounded-full text-red-500 hover:text-red-700">
                            <MdDelete size={18} />
                        </button>
                    </div>
                )
            },
        }),
    ];      

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

            <div>
                <DisplayTable 
                    data={subCategoriesData}
                    columns={columns}
                />
            </div>

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

            {
                editSubCategory.open && (
                    <UploadSubCategoryModel
                        close={() => setEditSubCategory({
                            open: false,
                            subCategoryData: "",
                        })}
                        fetchData={fetchSubCategory}
                        mode = {{
                            status: "update",
                            subCategory: editSubCategory.subCategoryData
                        }}
                    />
                )
            }

            {
                imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />
            }

        </section>
    );
}

export default SubcategoryPage;