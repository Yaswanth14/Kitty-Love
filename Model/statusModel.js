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
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 60 * 24 * 7 },
      },
    },
    { timestamps: true }
  )
);

module.exports.Comment = model(
  "Comment",
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
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 60 * 24 * 7 },
      },
    },
    { timestamps: true }
  )
);
