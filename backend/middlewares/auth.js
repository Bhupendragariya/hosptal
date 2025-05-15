import User from "../models/userModels.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js ";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";




export const isAdminAuthenticated = catchAsyncErrors(async( req, res, next) =>{
    const token = req.cookies.adminToken;


   try { 
 
     if (!token) {
         return next(new ErrorHandler("admin not Authenticated", 401));
     }
 
     const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
     const user= req.user = await User.findById(decoded.id);
     if(!user || user.role !== "Admin"){
         return next(new ErrorHandler(`${req.user.role} is not authorized to access this resource`, 403))
     }
     req.user = user;
     next();
   } catch (error) {
     return next(new ErrorHandler("Invalid token", 401))
    
   }

});



export const isPatientAuthenticated = catchAsyncErrors(async( req, res, next) =>{
   
   try { 
  const token = req.cookies.patientToken;

  
 
     if (!token) {
         return next(new ErrorHandler("patient not Authenticated", 402));
     }
 
     const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
     const user = req.user = await User.findById(decoded.id);
     if(!user || user.role !== "Patient"){
         return next(new ErrorHandler(`${req.user.role} is not authorized to access this resource`, 403))
     }

      req.user = user;
     next();
     
   } catch (error) {

     return next(new ErrorHandler("Invalid token", 401))
    
   }

});


