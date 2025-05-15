import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
