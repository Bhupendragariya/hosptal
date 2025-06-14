import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./db/dbConnection.js";
import cloudinary from "cloudinary";
import messageRouter from "./router/massageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";



dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: "include",
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment", appointmentRouter )












dbConnection()




app.use(errorMiddleware);


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
