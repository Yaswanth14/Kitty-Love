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
    const value = req.params.value;
    if (value == "1") {
      status.likes = status.likes + 1;
      status.save();
    } else if (value == "0") {
      status.likes = status.likes - 1;
      status.save();
    }
    res.send({ message: "like success" });
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
    const replies = await Reply.find({ _id: { $in: id } }).select(
      "content likes createdAt"
    );
    res.status(500).send({ success: true, replies });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting replies",
    });
  }
};
