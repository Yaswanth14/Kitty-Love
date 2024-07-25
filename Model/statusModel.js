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
      likedBy: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        // index: { expires: 4 * 60 * 60 * 24 * 7 },
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
      root: {
        type: Schema.Types.ObjectId,
        ref: "Status",
        required: true,
      },
      likes: {
        type: Number,
        default: 0,
      },
      likedBy: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  )
);
