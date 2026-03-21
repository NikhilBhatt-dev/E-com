import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true,
        validate: {
            validator: (value) => Array.isArray(value) && value.length > 0,
            message: "At least one image is required."
        }
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    bestseller: {
        type: Boolean,
        required: true
    }
});

const ProducModel = mongoose.models.product || mongoose.model("product", productSchema);

export default ProducModel;
