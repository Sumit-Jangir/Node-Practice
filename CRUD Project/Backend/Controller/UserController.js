const userModel = require("../Model/UserModel");
const loginData = require("../Model/loginData")

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../uploadfile");
const moment = require("moment");

const createOtp = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

exports.addUser = async (req, res) => {
  try {
    const uploadedfile = await uploadFile(req.files);
    const otpExpiryTime = moment().add(100, "minutes");
    const randomOTP = await createOtp();
    console.log("<<<<<<uploadfile>>>>>>", uploadedfile[0].url);
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      res.status(404).json({ message: "All field are require" });
    }

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hash,
      image: uploadedfile[0].url,
      otp: randomOTP,
      otpExpiry: otpExpiryTime,
    };

    user = new userModel(data);
    await user.save();

    // setTimeout(async()=>{
    //   let user1 = await userModel.findOne({ email });
    //   if(user1.otp){
    //     user1.otp = undefined
    //     await user1.save()
    //     console.log("<<<<<user1>>>>>",user1);
    //   }
    // },100000)
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.findUser = async (req, res) => {
  const myData = await userModel.find();

  if (!myData) res.status(404).json({ error: "Error" });
  else res.status(200).json(myData);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const myData = await userModel.findByIdAndDelete(id);

  if (!myData) res.status(404).json({ error: "Error" });
  else res.status(200).json(myData);
};

exports.updateUser = async (req, res) => {
  const { id, email } = req.body;
  const data = req.body;

  let user = await userModel.findOne({ email });

  if (user.email && user._id.toString() !== id) {
    return res.status(400).json({ message: "Email already exists" });
  }

  user = await userModel.findByIdAndUpdate(id, data);

  console.log("<<<<user>>>>", user);
  if (!user) {
    return res.status(404).json({ error: "err" });
  }
  res.status(200).json(user);
};

exports.login = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Please signup" });
    }
    const _id = user._id;
    const user1 = await loginData.find({user:_id}).populate("data")
    console.log("populate",user1)

    const dbPassword = user.password;

    const matchData = await bcrypt.compare(password, dbPassword);

    // console.log("<<<<<match>>>>>", user);
    if (!matchData) {
      return res.status(400).json({ message: "invalid password" });
    }
    // console.log("<<otp>>", otp, "<<<<user.otp>>>>", user.otp);
    // const isOtpExpired = moment().isAfter(user.otpExpiry);
    // if (isOtpExpired) {
    //   return res.status(400).json({ message: "OTP has expired" });
    // } 
    if (!(otp === user.otp)) {
      return res.status(400).json({ message: "invalid Otp" });
    }
    // if (otp === user.otp) {
      // let user1 = await loginData.find();

      const loginuser = await loginData.find({user: user._id});
      
      if(loginuser.length > 0){
        const lastLoginData = loginuser[loginuser.length - 1];
        const countValue = lastLoginData.count + 1;
        // console.log(countValue)
        var loginDetail = {
          count: countValue,
          user: user._id
        }
      }
      else{
        var loginDetail = {
          count: 1,
          user: user._id
        }
      }
      
      const loginDataSave = new loginData(loginDetail)
      await loginDataSave.save();


      // user.otp = undefined;
      // let count = user.loginCount;
      // user.loginCount = ++count;
      // await user.save();
      // console.log("<<<<<user >>>>>", user1);
    // }

    const token = jwt.sign(
      { id: user._id },
      process.env.secretKey
      // {expiresIn:1m}
    );

    console.log("<<<<<token>>>>>>", token);

    return res.status(200).json({ token, message: "user login successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",error:error });
  }
};
