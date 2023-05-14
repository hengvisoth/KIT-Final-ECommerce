import express from "express";
import asyncHandler from "express-async-handler";

const serviceRouter = express.Router()

serviceRouter.get('/',    asyncHandler(async (req, res) => {
       res.status(200).json({
        "status" : 200 , 
        "status_code" : "sucess" , 
        "data" : [
            {
                "name" : "ប៉ះអុត",
                "price" : "$ 1.00"
            },
              {
                "name" : "បាញ់កាវ",
                "price" : "$ 2.00"
            },
              {
                "name" : "ថ្លឹងកង់ស្វ័យប្រវត្តិ",
                "price" : "$ 5.00"
            },
              {
                "name" : "ចិតមុខយ៉ានមា៉សុីន CNC",
                "price" : "$ 100.00"
            },
            {
                "name" : "បាញ់ថ្នាំ",
                "price" : "$ 12.00"
            },
            {
                "name" : "ប្តូរស្បែកហ្វ្រាំង",
                "price" : "$ 199.00"
            },
            {
                "name" : "បោសតាំបួល",
                "price" : "$1"
            },
            {
                "name" : "សេតវាល់សេនសឺ",
                "price" : "$1"
            },
             {
                "name" : "សេវាដល់ទីកន្លែង",
                "price" : "$1"
            }
            
        ]
       })
    }))

export default serviceRouter;
