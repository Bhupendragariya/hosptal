import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModels.js";
import Appointment from "../models/appointmentModels.js";


export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    dob,
    gender,
    appointmentDate,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !message ||
      !dob ||
      !gender ||
      !appointmentDate ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      return next(new ErrorHandler("please full fill the form", 400));
    }
    const isConflict = await User.findOne({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });


    if (isConflict.length === 0) {
      return next(new ErrorHandler("Doctor not found", 400));
    }
    if (isConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Doctor conflict! please Contact Through Email or Phone",
          400
        )
      );
    }

    //   const doctor = await User.findOne({
    //  firstName: doctor_firstName,
    //   lastName: doctor_lastName,
    //   role: "Doctor",
    //   doctorDepartment: department,
    // });

    // if (!doctor) {
    //   return next(new ErrorHandler("Doctor not found", 400));
    // }


    const doctorId = isConflict._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      message,
      dob,
      gender,
      appointmentDate,
      department,
      doctor:{
        firstName: doctor_firstName,
        lastName: doctor_lastName,

      },
      hasVisited,
      address,
      doctorId,
      patientId,
      role: "Patient" 
    });

    res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        appointment,
        
    })


  } catch (error) {
    console.error("Error creating appointment:", error.message);
    return next(new ErrorHandler("Error creating appointment", 500));
  }
});



export const getAllAppointments = catchAsyncErrors(async( req, res, next) =>{
  try {
    const appointments = await Appointment.find();
    if(!appointments){
      return next(new ErrorHandler("No appointments found", 400))
    }
    res.status(200).json({
      success: true,
      message: "All appointments",
      appointments,
    })
  } catch (error) {
    console.error ("error fetching appointments:", error.message)
    return next(new ErrorHandler("Error Fetching appointments ", 500))
    
  }
});

export const updateAppointment = catchAsyncErrors(async( req, res, next) =>{
try {
    const {id} = req.params;
    let appointment = await Appointment.findById(id); 

    if(!appointment){
      return next (new ErrorHandler("Appointment not found", 400))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
} catch (error) {
  console.error("error updating appointment:", error.message);
  return next(new ErrorHandler("Error updating appointment", 500 ))
  
}

});


export const deleteAppointment = catchAsyncErrors( async ( req, res, next) =>{


  try {
     const {id} = req.params;
      let appointment = await Appointment.findById(id); 
  
      if(!appointment){
        return next (new ErrorHandler("Appointment not found", 400))
      }
      await appointment.deleteOne();
  
      res.status(200).json({
        success: true, 
        message: "Appointment deleted successfully",
      });
  } catch (error) {
    console.error("error deleting appointment:", error.message);
    return next(new ErrorHandler("error deleting appointment", 500));
    
    
  }
})