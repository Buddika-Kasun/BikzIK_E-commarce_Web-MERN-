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
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchDetails from "../utils/fetchDetails";
import { setAllSubCategory } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const SubcategoryPage = () => {

    const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [editSubCategory, setEditSubCategory] = useState({
        open: false,
        subCategoryData: "",
    });
    const [deleteSubCategory, setDeleteSubCategory] = useState({
        open: false,
        subCategoryData: "",
    });

    const dispatch = useDispatch();
    const allSubCategory = useSelector(state => state.product.allSubCategory);

    
    const columnHelper = createColumnHelper();

    const fetchSubCategory = async() => {
        try{
            setLoading(true);

            const subCategoryData = await fetchDetails({url: 'get_subCategory'});

            setSubCategoriesData(subCategoryData.data);

            dispatch(setAllSubCategory(subCategoryData.data));
            
        }
        catch(error){
            //console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    /* useEffect(() => {
        fetchSubCategory();
    }, []); */

    useEffect(() => {
        setSubCategoriesData(allSubCategory);
    }, [allSubCategory]);

    const handleEditClick = (subCategoryData) => {
        setEditSubCategory({
            open: true,
            subCategoryData: subCategoryData,
        });
    };

    const handleDeleteClick = (subCategoryData) => {
        setDeleteSubCategory({
            open: true,
            subCategoryData: subCategoryData,
        });
    };

    const handleDelete = async() => {
        try {
            //setLoading(true);

            const response = await Axios({
                ...SummaryApi.delete_subCategory,
                data: {
                    subCategoryId: deleteSubCategory.subCategoryData._id
                },
            });

            if(response.data.success) {
                toast.success("Sub category deleted successfully.");
                
                fetchSubCategory();
                setDeleteSubCategory({
                    open: false,
                    subCategoryData: "",
                });
            }

        }
        catch(error) {
            //console.log(error);
            AxiosToastError(error)
        }
        finally {
            //setLoading(false);
        }
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
                                <p key={i} className="inline-block px-2 m-1 bg-slate-200 rounded">{c.name}</p>
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
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-1 md:px-1">
                        <button
                            className="p-1 bg-green-200 rounded-full text-green-500 hover:text-green-700"
                            onClick={() => handleEditClick(row.original)}
                        >
                            <RiPencilFill size={18} />
                        </button>
                        <button
                            className="p-1 bg-red-200 rounded-full text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClick(row.original)}
                        >
                            <MdDelete size={18} />
                        </button>
                    </div>
                )
            },
        }),
    ];      

    return (
        <section className="">
            <div className="p-2 pt-4 shadow-md flex justify-between sticky top-28 lg:top-20 bg-blue-50 z-30">
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

            {
                deleteSubCategory.open && (
                    <ConfirmBox 
                        confirm={handleDelete}
                        cancel={() => setDeleteSubCategory({
                            open: false,
                            subCategoryData: "",
                        })}
                        close={() => setDeleteSubCategory({
                            open: false,
                            subCategoryData: "",
                        })}
                        text={`${deleteSubCategory.subCategoryData?.name} Sub Category`}
                    />
                )
            }

        </section>
    );
}

export default SubcategoryPage;