const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    image: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    otpExpiry:{
      type:String
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("data", userSchema);
