import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import blogROuter from "./Routes/blogRoute.js";
import serviceRouter from "./Routes/servicesRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import homeRouter from "./Routes/homeRouter.js";


dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin : true,
	credentials: true,
}))
// API
app.use("/api/v1/import", ImportData);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/blog", blogROuter);
app.use("/api/v1/services",serviceRouter) ; 
app.use("/api/v1/home",homeRouter)
app.get("/api/v1/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
