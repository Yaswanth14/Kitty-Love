const {User} = require('../Model/userModel');

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
            { $push: { crushlist: pid } }
        );

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
        const pid = req.params.pid;

        // Update the crushlist by removing the specified pid
        const updatedUser = await User.findOneAndUpdate(
            { email: req.email },
            { $pull: { crushlist: pid } },
            { new: true }
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