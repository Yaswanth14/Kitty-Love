const {User} = require('../Model/userModel');
const Sendmail = require('./mailController');

module.exports.sendDm = async(req, res) => {
    try {
        const username = req.params.username;
        const dm = req.body.dm;
        await User.updateOne({
            username: username
        }, {
            "$push": {
                dms: dm
            }
        })

        res.json({
            succes: true,
            message: "Message sent Succesfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to send, try later"
        })
    }
}

const checkIfInCrushList = async (pid, userId) => {
    try {
      // Retrieve the user with the provided pid
      const user = await User.findById(pid);
      if (!user) {
        // Handle case where user with provided pid is not found
        return false;
      }
  
      // Check if the user's crushlist contains the userId
      const isInCrushList = user.crushlist.includes(userId);
  
      return isInCrushList;
    } catch (error) {
      console.error('Error checking crushlist:', error);
      return false; // Return false in case of any error
    }
  };

module.exports.addToCrush = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username }).select("_id");
        const pid = user._id;
        
        // Check if crushlist length is greater than or equal to 3
        const currentUser = await User.findOne({ email: req.email });
        if (currentUser.crushlist.length >= 3) {
            return res.status(400).send({
                success: false,
                message: "CrushList can only have upto 3 profiles"
            });
        }
        
        await User.updateOne(
            { email: req.email },
            { 
                $push: { crushlist: pid }
            }
        );

        await User.updateOne(
            {_id: pid},
            {
                $inc: { crushcount: 1 }
            }
        );

        // Check if the user with pid also has req._id in their crushlist
        const isInCrushList = await checkIfInCrushList(pid, req._id);
        if(isInCrushList)
        {
            Sendmail(pid, req._id);
        }

        res.status(200).send({
            success: true,
            message: `Added ${username} to crushlist`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error adding to CrushList, try later"
        });
    }
};

module.exports.removeFromCrush = async (req, res) => {
    try {
        const pid = req.body.pid;
        // const pid = req.params.pid;

        // Update the crushlist by removing the specified pid
        const updatedUser = await User.findOneAndUpdate(
            { email: req.email },
            { 
                $pull: { crushlist: pid }
            },
            { new: true }
        );

        await User.updateOne(
            {_id: pid},
            {
                $inc: { crushcount: -1 }
            }
        );

        // Check if the user was found and the crushlist was updated
        if (updatedUser) {
            res.status(200).send({
                success: true,
                message: `Successfully removed element with pid ${pid} from crushlist`
            });
        } else {
            res.status(404).send({
                success: false,
                message: `User or element with pid ${pid} not found`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error removing element from crushlist, try later"
        });
    }
};

module.exports.deleteDms = async (req,res)=>{
    try {
        const pid = req.params.pid;
        await User.updateOne({
            _id: pid
        },{
            dms: []
        });

        res.status(201).send({
            success: true,
            message: "DMs deleted  successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Delete unccesfull, try later"
        })
    }
}

module.exports.getCrushDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.pid }).select('name username gender');
        if(!user) return res.status(400).json({success:false, message: "User not found"});
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error while getting single profile"});
    }
}

module.exports.getDms = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.pid}).select('dms isPrivate crushlist');
        if(!user) return res.status(400).json({success:false, message: "User not found"});
        res.status(200).send(user);    
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error while getting dms"});    
    }
}

module.exports.updatePrivate = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { isPrivate } = req.body;
  
      await User.findByIdAndUpdate(userId, { isPrivate }, { new: true });
  
      res.status(200).json({ success: true, message: "isPrivate updated successfully" });
    } catch (error) {
      console.error("Error updating isPrivate:", error);
      res.status(500).json({ success: false, message: "Failed to update isPrivate" });
    }
}
