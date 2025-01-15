import { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAddress from '../components/AddAddress';
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import ConfirmBox from '../components/ConfirmBox';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';
import NoData from '../components/NoData';

const AddressPage = () => {

    const addressList = useSelector(state => state.address.addressList);

    const { fetchAddresses } = useGlobalContext();

    const [openAddress, setOpenAddress] = useState(false);
    const [editAddress, setEditAddress] = useState({
        open: false,
        addressData: "",
    });
    const [deleteAddress, setDeleteAddress] = useState({
        open: false,
        addressId: "",
    });

    const handleEditClick = (addressData) => {
        setEditAddress({
            open: true,
            addressData: addressData,
        });
    };

    const handleDeleteClick = (addressId) => {
        setDeleteAddress({
            open: true,
            addressId: addressId,
        });
    }

    const handleDelete = async() => {
        try {

            const response = await Axios({
                ...SummaryApi.delete_address,
                data: {
                    addressId: deleteAddress.addressId,
                },
            });

            if(response.data.success) {
                toast.success("Address deleted successfully.");
                setDeleteAddress({ 
                    open: false, 
                    addressId: "" 
                });
                fetchAddresses();
            }

        }
        catch (error) {
            console.log(error);
            AxiosToastError(error)
        }
    };

    return (
        <section className=''>
            <div className="p-2 pt-4 shadow-md flex justify-between sticky top-28 lg:top-20 bg-blue-50 z-30">
                <h2 className="font-semibold">Addresses</h2>
                <button
                    className="text-sm border border-green-600 hover:bg-green-600 px-3 py-1 rounded-md text-green-600 hover:text-white "
                    onClick={() => setOpenAddress(true)}
                >
                    Add address
                </button>
            </div>
            <div className="grid gap-4 p-4">
                {
                    !addressList[0] && <NoData />
                }

                {
                    addressList?.map((address, index) => {
                        return (
                            <div
                                key={index} 
                                className={`border-[1.5px] rounded p-2 bg-white flex gap-3 justify-between`}
                            >
                                <div>
                                    <div className="flex gap-1 flex-wrap">
                                        <p>{address.address_line},</p>
                                        <p>{address.city},</p>
                                        <p>{address.postalCode}</p>
                                    </div>
                                    <div className="flex gap-1 flex-wrap">
                                        <p>{address.state},</p>
                                        <p>{address.country}</p>
                                    </div>
                                    <p>+94 {address.contactNo}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <button
                                        className="p-1 bg-red-200 rounded text-red-500 hover:text-red-700 h-fit"
                                        onClick={() => handleDeleteClick(address?._id)}
                                        >
                                        <MdDelete size={18} />
                                    </button>
                                    <button
                                        className="p-1 bg-green-200 rounded text-green-500 hover:text-green-700"
                                        onClick={() => handleEditClick(address)}
                                    >
                                        <RiPencilFill size={18} />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                openAddress && 
                <AddAddress
                    close={() => setOpenAddress(false)}
                    mode = {{
                        status: "create",
                    }}
                />
            }

            {
                editAddress.open && 
                <AddAddress 
                    close={() => setEditAddress({
                        open: false,
                        addressData: "",
                    })} 
                    mode = {{
                        status: "update",
                        data: editAddress.addressData
                    }}
                />
            }

            {
                deleteAddress.open &&
                <ConfirmBox
                    text={`this address`}
                    confirm={handleDelete}
                    cancel={() => setDeleteAddress({
                        open: false,
                        categoryData: "",
                    })}
                    close={() => setDeleteAddress({
                        open: false,
                        categoryData: "",
                    })}
                />
            }

        </section>
    );
}

export default AddressPage;