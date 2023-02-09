import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import orderRouter from "./Routes/orderRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import registerWithEureka from "./eurekaHelper.js";

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
// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute);
// app.use("/api/users", userRouter);
app.use("/", orderRouter);
// app.use("/api/blog", blogROuter);
// app.get("/api/config/paypal", (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID);
// });


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;
registerWithEureka('Order Service', PORT);

app.listen(PORT, console.log(`server run in port ${PORT}`));
