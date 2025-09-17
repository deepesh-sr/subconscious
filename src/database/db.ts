import mongoose, { Schema, model } from "mongoose";


// userSchema 
const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

export enum ContentType {
    Document = "document",
    Tweet = "tweet", 
    Youtube = "youtube",
    Link = "link"
}

const contentSchema = new Schema({
    contentType: {
        type: String,
        enum: Object.values(ContentType),
        required: true
    },
    link: String,
    title: String,
    tags: [String], 
    userId : {type : String, ref : 'User', required : true}
})

const linkSchema = new Schema({
    hash : {
        type : String, 
        unique : true
    },
    userId : {type : String, ref : 'User' , required : true}
})

export const User = model ('User', userSchema);
export const Content = model ('Content', contentSchema);
export const Link = model('linkSchema',linkSchema);
