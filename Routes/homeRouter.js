import express from "express";
import asyncHandler from "express-async-handler";

const homeRouter = express.Router()

homeRouter.get('/info-edu',    asyncHandler(async (req, res) => {
       res.status(200).json({
        "status" : 200 , 
        "status_code" : "sucess" , 
        "data" : 
            {
                "information" : [
                    {
                        "question_text" : "What is general information about tires",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                     {
                        "question_text" : "What is general information about tires",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                     {
                        "question_text" : "What is general information about tires",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                     {
                        "question_text" : "What is general ",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                   ], 
                "education" : [
                     {
                        "question_text" : "What is general information about tires",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                     {
                        "question_text" : "What is general information about tires",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                     {
                        "question_text" : "What is general information about tires",
                        "answer" : "A tire (American English) or tyre (British English) is a ring-shaped component that surrounds a wheel's rim to transfer a vehicle's load from the axle through the wheel to the ground and to provide traction on the surface over which the wheel travels."

                    },
                    
                ]
            },
           
              
        
       })
    }))

export default homeRouter;
