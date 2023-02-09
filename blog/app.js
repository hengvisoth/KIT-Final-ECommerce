import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import blogROuter from "./routes/index.js";
import ImportData from "./DataImport.js";
import registerWithEureka from "./eurekaHelper.js";

var app = express();

dotenv.config();
connectDatabase();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({
  origin : true,
credentials: true,
}))
app.use('/', blogROuter);
app.use("/api/import", ImportData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 1000;
registerWithEureka('Blog Service', PORT);

app.listen(PORT, console.log(`server run in port ${PORT}`));
