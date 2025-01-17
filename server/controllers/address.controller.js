import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

// Add address controller
export const addAddressController = async(req, res) => {
    try {

        const userId = req.userId;
        const { address, city, state, postal, contact } = req.body;

        const createAddress = new AddressModel({
            address_line: address,
            city,
            state,
            postalCode: postal,
            contactNo: contact,
            userId
        });

        const saveAddress = await createAddress.save();

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push: { 
                address_details: saveAddress._id 
            },
        });

        return res.json({
            message: "Address added successfully",
            success: true,
            error: false,
            data: saveAddress,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Get addresses controller
export const getAddressesController = async(req, res) => {
    try {

        const userId = req.userId;

        //const userAddresses = await UserModel.findById(userId).populate("address_details");
        // 1 or 2
        const userAddresses = await AddressModel.find({ userId, status: true }).sort({ createdAt: -1});

        return res.json({
            message: "Addresses fetched successfully",
            success: true,
            error: false,
            //data: userAddresses.address_details,
            // 1 or 2
            data: userAddresses,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Update address controller
export const updateAddressController = async(req, res) => {
    try {

        const userId = req.userId;
        const { addressId, address, city, state, postal, contact } = req.body;

        const updateAddress = await AddressModel.updateOne(
            {
                _id: addressId,
                userId: userId,
            }, 
            {
                address_line: address,
                city,
                state,
                postalCode: postal,
                contactNo: contact,
            }
        );

        return res.json({
            message: "Address updated successfully",
            success: true,
            error: false,
            data: updateAddress,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

// Delete address controller
export const deleteAddressController = async(req, res) => {
    try {

        const userId = req.userId;
        const { addressId } = req.body;

        /*
        const deleteAddress = await AddressModel.deleteOne(
            {
                _id: addressId,
                userId: userId,
            }
        );
        */
        // 1 or 2
        const disableAddress = await AddressModel.updateOne(
            {
                _id: addressId,
                userId: userId,
            }, 
            {
                status: false,
            }
        );

        return res.json({
            message: "Address deleted successfully",
            success: true,
            error: false,
            //data: deleteAddress,
            // 1 or 2
            data: disableAddress,
        });

    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};