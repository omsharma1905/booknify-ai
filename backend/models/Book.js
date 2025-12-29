const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        content: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);

const bookSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            default: "",
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        coverImage: {
            type: String,
            default: "",
        },
        chapters: {
            type: [chapterSchema],
            default: [],
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema);