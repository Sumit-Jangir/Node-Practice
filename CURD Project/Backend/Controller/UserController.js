const userModel = require('../Model/UserModel')

exports.findUser = async (req,res)=>{
    const myData = await userModel.find();

    if(!myData)
        res.status(404).json({error: 'Error'})

    else
        res.status(200).json(myData);
}

exports.deleteUser = async (req,res)=>{
    const {id} = req.params
    const myData = await userModel.findByIdAndDelete(id);

    if(!myData)
        res.status(404).json({error: 'Error'})

    else
        res.status(200).json(myData);
}

exports.addUser = async (req,res)=>{
    
    const user = new userModel(req.body)

    await user.save();
    // console.log(user)
    res.status(200).json(user);
}

exports.updateUser = async (req,res)=>{
    
    const {id} = req.body;
    const data = req.body;

    const user = await userModel.findByIdAndUpdate(id,data)

    console.log("<<<<user>>>>",user);
    if(!user)
        res.status(404).json({error:'err'});
    else
        res.status(200).json(user);
        
}