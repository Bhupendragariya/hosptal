import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "first name must contain at least 3 characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "last name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
       unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "phone number must contain exact 10!"],
    minLength: [10, "phone number must contain exact 10!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "message must Contain at least 10 characters!"],
  },
   dob:{
      type: Date,
      required: [true, "Date of birth is required"],
    },
  
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "other"]
  
    },
  
  
  
    role:{
      type: String,
      required: true,
      enum: ["Admin", "Patient", "Doctor"],  
      
    },

    appointmentDate:{
        type: String,
        required: true,
    },

    department:{
         type: String,
        required: true,
    },

    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        firstName:{
            type: String,
            required: true,
        }
    },
    hasVisited:{
        type: Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    address:{
        type: String, 
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },

});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
