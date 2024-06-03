const { Status, Reply } = require("../Model/statusModel");

module.exports.postStatus = async (req, res) => {
  try {
    let status = new Status({
      username: req.username,
      content: req.body.content,
    });
    await status.save();
    return res.send({
      success: true,
      message: "Status Posted Succesfully",
      status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in posting status",
    });
  }
};

module.exports.getStatus = async (req, res) => {
  try {
    const status = await Status.find({});
    res.status(200).send({
      success: true,
      status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting status",
    });
  }
};

module.exports.postLike = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    const userId = req._id; // Assuming you have user ID in req.user
    const value = req.params.value;

    if (value == "1") {
      if (!status.likedBy.includes(userId)) {
        status.likes += 1;
        status.likedBy.push(userId);
        await status.save();
        res.send({ message: "Like success" });
      } else {
        res.status(400).send({ message: "User already liked this status" });
      }
    } else if (value == "0") {
      if (status.likedBy.includes(userId)) {
        status.likes -= 1;
        status.likedBy = status.likedBy.filter(
          (id) => id.toString() !== userId
        );
        await status.save();
        res.send({ message: "Unlike success" });
      } else {
        res.status(400).send({ message: "User hasn't liked this status" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in liking the post",
    });
  }
};

module.exports.postReply = async (req, res) => {
  try {
    const { reply } = req.body;
    const id = req.params.id;
    let newReply = new Reply({
      username: req.username,
      content: reply,
      root: id,
    });
    newReply.save();

    res.send({ success: true, reply: newReply });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in posting reply",
    });
  }
};

module.exports.getReplies = async (req, res) => {
  try {
    const id = req.params.id;
    const replies = await Reply.find({ root: { $in: id } }).select(
      "content likes createdAt"
    );
    revReplies = [...replies].reverse();
    res.status(200).send({ success: true, replies: revReplies });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting replies",
    });
  }
};
