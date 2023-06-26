import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import protect from "./../Middleware/AuthMiddleware.js";


const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
// GET PRODUCT BY CATEGORIES
productRoute.get("/categories/:categories", async (req, res) => { 
  console.log(req.params.categories);
    const product = await Product.find({categories : req.params.categories})
    if(product){
      res.json(product);
    }else{
      res.status(404);
      throw new Error("Product not Found");

    }}
)

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);


// const getDataFromDb = async (startIndex, endIndex) => {
//   return await Product.find({})
//     .skip(startIndex)
//     .limit(endIndex - startIndex);
// };
// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    console.log(product)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);
productRoute.get(
  "/individual",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
productRoute.delete("/delete" ,asyncHandler( async(req,res) => {
  const delteProd = await Product.deleteMany({});
  res.json(delteProd);
}
))

productRoute.get('/:id/specification', function(req, res, next) {
  res.status(200).json({
    "status_code":"200",
  "status":"OK",
  "data":{"imageUrl" : "" , 
  "Wheelbase" : "Screws" , 
  "Size" : "75mm" , 
  "Technical Parameters" : "Value 2" , 
  "Model Number" : "Wheel & Tires" , 
  "For Vehicle Types" : "Cars" , 
  "Tool Suplies" : "" , 
  "Four-wheel Drive Attributes" : "Tires" , 
  "Remote Control Peripherals / Devices" : "Servos" , 
  "Update Parts / Accessories" : "Tires" , 
"RC Parts & Accs " : "Servos" , 
"Material" : "Ruber"
}
  });
});

productRoute.get('/:id/description', function(req, res, next) {
  res.status(200).json({
    "status_code":"200",
  "status":"OK",
  "data":{"description":"Goodyear Tire and Rubber Company Tread Vehicle Discount Tire."
}
  });
});

productRoute.get('/wheels',async function(req,res,next){
  const product = await Product.find({})
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
})

productRoute.get('/discount',function(req,res,next){
  res.status(200).json({
    "status_code":"200",
    "status":"OK",
    "data":{
      "data":[
        {
          "id" : "1" , 
           "brandName" : "TOYOTA" , 
           "imageLink" : "https://i.pinimg.com/564x/60/7b/23/607b23450f348d8090a940adca1b6f3f.jpg" , 
           "price" : 12.00 ,
           "discountPrice" : 25.00 , 
           "ratings" : 2 , 
           "subTitle" : "SubTitle" , 
           "title" : "The Best Product Ever of 2023" ,
           "percent_off" : "70%"
         },
         {
          "id" : "2" , 
           "brandName" : "TOYOTA" , 
           "imageLink" : "https://i.pinimg.com/564x/60/7b/23/607b23450f348d8090a940adca1b6f3f.jpg" , 
           "price" : 12.00 ,
           "discountPrice" : 25.00 , 

           "ratings" : 2 , 
           "subTitle" : "SubTitle" , 
           "title" : "The Best Product Ever of 2023" , 
           "percent_off" : "70%"

         },
         {
          "id" : "3" , 
           "brandName" : "TOYOTA" , 
           "imageLink" : "https://i.pinimg.com/564x/60/7b/23/607b23450f348d8090a940adca1b6f3f.jpg" , 
           "price" : 12.00 ,
           "discountPrice" : 25.00 , 

           "ratings" : 2 , 
           "subTitle" : "SubTitle" , 
           "title" : "The Best Product Ever of 2023" , 
           "percent_off" : "70%"

         },
         {
          "id" : "4" , 
           "brandName" : "TOYOTA" , 
           "imageLink" : "https://i.pinimg.com/564x/60/7b/23/607b23450f348d8090a940adca1b6f3f.jpg" , 
           "price" : 12.00 ,
           "discountPrice" : 25.00 , 

           "ratings" : 2 , 
           "subTitle" : "SubTitle" , 
           "title" : "The Best Product Ever of 2023" , 
           "percent_off" : "70%"

         },

      ]
  }
  })
})

export default productRoute;
