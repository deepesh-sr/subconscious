import express from "express";
import mongoose from "mongoose";
const app = express();
import * as z from "zod";
import dotenv from '@dotenvx/dotenvx'
import User from "./database/db.js";
import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



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

    try {

        const result = user.safeParse(req.body);
        if (result.success) {



            let username = req.body.username;
            let password = req.body.password;

            const findUser = await User.findOne({
                username: username
            });

            if (findUser) {
                res.status(403).json({
                    "msg": "User already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 3);


            const newuser = new User({
                username: username,
                password: hashedPassword
            })

            const saveResult = await newuser.save();
            if (saveResult) {
                res.status(200).json({ "msg": "Signed up" })
            }

        } else {

            console.log(result.error)
            res.status(411).json({
                "msg": "Error in inputs"
            })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({
            "msg": "server error"
        })
    }



})

app.post('/signin', async (req, res) => {
try{


    const username = req.body.username;
    const password = req.body.password;

    const finduser = await User.findOne({
        username: username
    })

    if (finduser) {

        let comparePassword = await bcrypt.compare(password,finduser.password);
        if ( comparePassword){

            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT_SECRET is required but not found in environment variables");
            }
            const token = jwt.sign({ username: finduser.username }, jwtSecret);
            
            // localStorage.setItem("token" , token);
            
            res.status(200).json({
                "msg" : "Sign in done",
                "token" : token
            })
        }else{
            res.status(403).json({
                "msg" : "Incorrect Password"
            })
        }
    }else{
        res.status(403).json({
            "msg" : "user doesn;t exist"
        })
    }
}catch(e){
    console.error(e);
    res.status(500).json({
        "msg" : "internal server error"
    })
}
})