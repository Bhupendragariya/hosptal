import Message from "../models/messageModels.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";



export const sendMassage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
 return next( new ErrorHandler("Please fill out the full form!", 400));     }

    await Message.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
      

});

export const getAllMessages = catchAsyncErrors(async(req, res, next) =>{
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});