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
