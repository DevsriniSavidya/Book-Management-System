import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required: true
    },
    genre: {
        type:String,
        required: true
    },
    language: {
        type:String,
    },
    publishDate: {
        type:Date,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    userId: mongoose.Schema.Types.ObjectId,

})

export default mongoose.model("Book",bookSchema);