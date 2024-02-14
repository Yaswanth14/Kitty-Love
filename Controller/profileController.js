const fs = require('fs');
const {User} = require('../Model/userModel');

module.exports.updateProfile = async (req, res) => {
    try {
        const {name, gender} = req.fields;
        const {photo} = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({success:false,message: "Name is required"});
            case !gender:
                return res.status(500).send({success:false,message: "Gender is required"});
            case photo && photo.size > 1000000:
                return res.status(500).send({success:false,message: "Photo size should be less than 1MB"});
        }
        const user = await  User.findByIdAndUpdate(req.params.pid, 
            {...req.fields}, {new: true}
            )
            if(photo){
                user.photo["data"] = fs.readFileSync(photo.path);
                user.photo["contentType"] = photo.type;
            }
        await user.save();
        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating profile"
        })
    }
}

//get all profiles
module.exports.getProfiles = async (req, res) => {
    try {
        const users = await User.find({}).select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success: true,
            length: users.length,
            message: "Users  fetched successfully.",
            users 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in getting profiles"});
    }
}

//get a single profile
module.exports.getSingleProfile = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username}).select("-photo");
        if(!user) return res.status(400).json({success:false, message: "User not found"});
        res.status(200).send({
            success:true,
            message: "Single user fetched",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error while getting single profile"});
    }
}

module.exports.getProfilePhoto = async (req, res) => {
    try {
        const user = await User.findById(req.params.pid).select("photo");
        if(user.photo && user.photo.data){
            res.set('Content-Type', user.photo.contentType);
            return res.status(200).send(user.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error while getting profile photo"});
    }
}