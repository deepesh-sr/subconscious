import express from "express";
import mongoose from "mongoose";
const app = express();
import * as z from "zod";
import dotenv from '@dotenvx/dotenvx'
import User from "./database/db.js";
import * as bcrypt from "bcrypt"

dotenv.config();

app.use(express.json());

// Connect to MongoDB
async function connectDB() {
    try {
        const connectionString = process.env.CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("CONNECTION_STRING environment variable is not defined");
        }
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectDB();

app.listen(3000, () => console.log("Listen on port 3000"));

const user = z.object({
    username: z.string().min(3).max(10),
    password: z
    .string()
    .min(8)
    .max(20)
    .refine((password) => /[A-Z]/.test(password))
    .refine((password) => /[a-z]/.test(password))
    .refine((p) => /[0-9]/.test(p))
    .refine((p) => /[!@#$%^&*]/.test(p))
})


app.post('/signup', async (req, res) => {
   
    try{

        const result = user.safeParse(req.body);
        if (result.success) {

            
            
            let username = req.body.username;
            let password = req.body.password;
            
            const findUser =await User.findOne({
                username : username
            });
            
            if ( findUser){
                res.status(403).json({
                    "msg" : "User already exists"
                })
            }
            
            const hashedPassword = await bcrypt.hash(password,3);

             
            const newuser =  new User({
                username : username,
                password : hashedPassword
            })
            
            const saveResult = await newuser.save();
            if ( saveResult) {
                res.status(200).json({"msg" : "Signed up"})
            }
            
        } else {
            
            console.log(result.error)
            res.status(411).json({
                "msg" : "Error in inputs"
            })
        }
        
    }catch(e){
        console.error(e);
        res.status(500).json({
            "msg" : "server error"
        })
    }


    
})