import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModels.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, role } =
    req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !role
    ) {
      return next(new ErrorHandler("Please fill out the full form!", 400));
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

      if (role !== 'Patient') {
  return next(new ErrorHandler("Invalid role assignment", 400));
}

  const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      role,
    });
  


    generateToken(user, "user registered successfully", res, 201);
  } catch (error) {
    return next(next(new ErrorHandler(error.message, 500)));
  }
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      {
        return next(new ErrorHandler("Please provide email and password", 400));
      }
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }


    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler(" Invalid email or password", 400));
    }

    if (user.role !== role) {
      return next(
        new ErrorHandler("You are not authorized to access this resource", 403)
      );
    }
    generateToken(user, "user Login successfully", res, 201);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob
    ) {
      return next(new ErrorHandler("Please fill out the full form!", 400));
    }

    const isAdmin = await User.findOne({ email });
    if (isAdmin) {
      return next(
        new ErrorHandler(`Admin with the email ${email} already exists.`, 400)
      );
    }

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      role: "Admin",
    });

    
   generateToken(admin, "Admin created successfully", res, 201);
  } catch (error) {
    console.error("Error creating admin:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  try {
    const doctors = await User.find({ role: "Doctor" });
    if (doctors.length === 0) {
      return next(new ErrorHandler("No doctors found", 404));
    }
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("adminToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Admin Logout successfully",
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("patientToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: " User Logout successfully",
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("Please fill out the full form!", 400));
    }

    if (!req.files || !req.files.docAvatar) {
      return next(new ErrorHandler("Doctor Avatar is required", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("Invalid image format", 400));
    }

    console.log("REQ.BODY:", req.body);

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      doctorDepartment,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !doctorDepartment
    ) {
      return next(new ErrorHandler("Please fill out the full form!", 400));
    }

    const isDoctor = await User.findOne({ email });
    if (isDoctor) {
      return next(
        new ErrorHandler(
          `${isDoctor.role}Doctor already exists this email`,
          400
        )
      );
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      docAvatar.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary upload error",
        cloudinaryResponse.error || "unknown Cloudinary error"
      );
      return next(new ErrorHandler("cloudinary upload error", 500));
    }


    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      doctorDepartment,
      role: "Doctor",
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
