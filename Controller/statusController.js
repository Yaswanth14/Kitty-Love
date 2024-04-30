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
