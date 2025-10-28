import mongoose from "mongoose";

//Step 1: Create a schema
//Step 2: Create a model based on that schema

const noteSchema = new mongoose.Schema({
    title :{
        type:String,
        required: true,
    },
    content :{
        type:String,
        required: true,
    },
    },
    {timestamps: true} //CreatedAt , UpdatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note