import { Schema, model } from "mongoose";

// userSchema 
const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    }
})

