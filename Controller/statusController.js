const { Status } = require("../Model/statusModel");

module.exports.postStatus = async (req, res) => {
  try {
    let status = new Status({
      username: req.email,
      content: req.body.content,
    });
    await status.save();
    return res.status(200).send({
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

module.exports.postComment = async (req, res) => {
  const comment = "hey";
  res.send({ message: "success" });
};
