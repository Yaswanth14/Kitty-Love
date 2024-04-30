const { Schema, model } = require("mongoose");

module.exports.Status = model(
  "Status",
  Schema(
    {
      username: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 60 * 24 },
      },
    },
    { timestamps: true }
  )
);
