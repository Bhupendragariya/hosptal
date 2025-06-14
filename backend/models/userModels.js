import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    validate: {
    validator: function (v) {
      return /^\d{10}$/.test(v);
    },
    message: props => `${props.value} is not a valid 10-digit phone number!`
  }
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

  password: {
  type: String,
  required: [true, "Password is required"],
  select: false,
  validate: {
    validator: function (v) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
    },
    message: props => "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
  }
},

  role:{
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],  
  },
  doctorDepartment:{
    type: String,
    required: function(){
        return this.role === "Doctor";
    }

  },
  docAvatar:{
    public_id:String,
    url: String,
  },
  
  referstoken: {
    type: String,
    default: null,
    select: false
  },

});




userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.password);
}


userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({
        id: this._id,
    }
    , 
        process.env.JWT_TOKEN_SECRET,
    {
        expiresIn: process.env.JWT_TOKEN_EXPIRY ,
    });

}









const User = mongoose.model("User", userSchema);
export default User;
