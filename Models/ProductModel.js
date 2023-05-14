import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
// const imageSchema = mongoose.Schema()


const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
    title : {
      type : String , 
      required : true
    } , 
    subTitle : { 
      type : String ,

    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
 
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount_price : {
      type : Number
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    brand : { 
      type : String,
      required : true
    },
    categories: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
