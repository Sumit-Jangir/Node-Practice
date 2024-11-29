const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;
const userModel = require("../Model/UserModel");

module.exports  = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const splitToken = token.split(" ")[1]
    const decode = jwt.verify(splitToken,secretKey)
    // console.log("<<<decode>>>",decode)

    if(!decode){
        return res.status(401).json({message: 'Invalid token'})
    }

    const user = await userModel.findById(decode.id);
    // console.log("<<<user>>>",user)
    if(!user){
        return res.status(401).json({message: 'User not found'});
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
