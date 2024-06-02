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
      likes: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 60 * 24 * 7 },
      },
    },
    { timestamps: true }
  )
);

module.exports.Reply = model(
  "Reply",
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
      likes: {
        type: Number,
        default: 0,
      },
      root: {
        type: Schema.Types.ObjectId,
        ref: "Status",
      },
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 60 * 24 * 7 },
      },
    },
    { timestamps: true }
  )
);
