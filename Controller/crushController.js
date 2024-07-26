const { User } = require("../Model/userModel");
const { Sendmail, sendNotification } = require("./mailController");

module.exports.sendDm = async (req, res) => {
  try {
    const username = req.params.username;
    const dm = req.body.dm;
    // const userInfo = User.find({
    //   username,
    // });
    // console.log("👆👆", userInfo);
    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          dms: dm,
        },
      }
    );

    let email = username + "@gvpce.ac.in";
    sendNotification(
      email,
      "KITTYLOVE : Someone sent you a message from your profile.",
      `<body>
          <p>Someone on KITTY LOVE has sent you a message after viewing your profile. Want to see what it is? Go to <a href="https://mykittylove.vercel.app">https://mykittylove.vercel.app</a> and check for yourself.</p>
          <br>
          <p> From team KITTYLOVE
      </body>`
    );

    res.json({
      succes: true,
      message: "Message sent Succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to send, try later",
    });
  }
};

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
    console.error("Error checking crushlist:", error);
    return false; // Return false in case of any error
  }
};

module.exports.addToCrush = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    // console.log("👆👆", user);
    const pid = user._id;

    // Check if crushlist length is greater than or equal to 3
    const currentUser = await User.findOne({ email: req.email });
    if (currentUser.crushlist.length >= 3) {
      return res.status(400).send({
        success: false,
        message: "CrushList can only have upto 3 profiles",
      });
    }

    await User.updateOne(
      { email: req.email },
      {
        $push: { crushlist: pid },
      }
    );

    // user.email

    await User.updateOne(
      { _id: pid },
      {
        $inc: { crushcount: 1 },
      }
    );

    sendNotification(
      user.email,
      "KITTYLOVE : Someone added you to their crush list",
      `<body>
            <p>Someone on KITTY LOVE has made you their crush. What if your crush and the person who just made you their crush are the same?</p>
            <a href="https://mykittylove.vercel.app">https://mykittylove.vercel.app</a>
            <br>
            <p> From team KITTYLOVE
        </body>`
    );

    // Check if the user with pid also has req._id in their crushlist
    const isInCrushList = await checkIfInCrushList(pid, req._id);
    if (isInCrushList) {
      Sendmail(pid, req._id);
    }

    res.status(200).send({
      success: true,
      message: `Added ${username} to crushlist`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding to CrushList, try later",
    });
  }
};

module.exports.removeFromCrush = async (req, res) => {
  try {
    // const pid = req.body.pid;
    const pid = req.params.pid;

    // Update the crushlist by removing the specified pid
    const updatedUser = await User.findOneAndUpdate(
      { email: req.email },
      {
        $pull: { crushlist: pid },
      },
      { new: true }
    );

    await User.updateOne(
      { _id: pid },
      {
        $inc: { crushcount: -1 },
      }
    );

    // Check if the user was found and the crushlist was updated
    if (updatedUser) {
      res.status(200).send({
        success: true,
        message: `Successfully removed element with pid ${pid} from crushlist`,
      });
    } else {
      res.status(404).send({
        success: false,
        message: `User or element with pid ${pid} not found`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error removing element from crushlist, try later",
    });
  }
};

module.exports.deleteDms = async (req, res) => {
  try {
    const pid = req.params.pid;
    await User.updateOne(
      {
        _id: pid,
      },
      {
        dms: [],
      }
    );

    res.status(201).send({
      success: true,
      message: "DMs deleted  successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Delete unccesfull, try later",
    });
  }
};

module.exports.getCrushDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.pid }).select(
      "name username gender"
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while getting single profile" });
  }
};

module.exports.getDms = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.pid }).select(
      "dms isPrivate crushlist"
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while getting dms" });
  }
};

module.exports.updatePrivate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { isPrivate } = req.body;

    await User.findByIdAndUpdate(userId, { isPrivate }, { new: true });

    res
      .status(200)
      .json({ success: true, message: "isPrivate updated successfully" });
  } catch (error) {
    console.error("Error updating isPrivate:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update isPrivate" });
  }
};
