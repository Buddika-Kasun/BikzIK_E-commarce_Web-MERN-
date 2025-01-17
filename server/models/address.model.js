import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    postalCode: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: "Sri Lanka"
    },
    contactNo: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
});

const AddressModel = mongoose.model('Address', addressSchema);

export default AddressModel;