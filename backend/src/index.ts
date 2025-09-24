import express from "express";
import mongoose from "mongoose";
const app = express();
import * as z from "zod";
import dotenv from '@dotenvx/dotenvx'
import { User, Content, ContentType, Link } from "./database/db.js";
import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import authenticateToken from "./middleware/authenticate.js";
import random from "./utils.js";
import cors from 'cors'


dotenv.config();

app.use(express.json());
app.use(cors())

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
const content = z.object({
    contentType: z.enum(["document", "tweet", "link", "youtube"]),
    link: z.string(),
    title: z.string().min(1, "Title is required"),
    tags: z.array(z.string()).optional(),

})


app.post('/api/v1/signup', async (req, res) => {

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

app.post('/api/v1/signin', async (req, res) => {
    try {


        const username = req.body.username;
        const password = req.body.password;

        const finduser = await User.findOne({
            username: username
        })

        if (finduser) {

            let comparePassword = await bcrypt.compare(password, finduser.password);
            if (comparePassword) {

                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error("JWT_SECRET is required but not found in environment variables");
                }
                const token = jwt.sign({ username: finduser.username }, jwtSecret);

            //    if(typeof window !==undefined && window.localStorage) localStorage.setItem("token" , token);

                res.status(200).json({
                    "msg": "Sign in done",
                    "token": token
                })
            } else {
                res.status(403).json({
                    "msg": "Incorrect Password"
                })
            }
        } else {
            res.status(403).json({
                "msg": "user doesn;t exist"
            })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            "msg": "internal server error"
        })
    }
})

app.get('/api/v1/profile', authenticateToken, (req: any, res) => {
    res.json({
        msg: "Protected route accessed",
        user: req.user
    })
})

app.post('/api/v1/add-content', authenticateToken, async (req: any, res) => {
    try {
        const result = content.safeParse(req.body);

        if (result.success) {
            const { contentType, link, title, tags } = result.data;

            const newContent = new Content({
                contentType,
                link,
                title,
                tags: tags || [],
                userId: req.user.username
            });

            await newContent.save();

            res.status(201).json({
                msg: "Content added successfully",
                content: newContent,
                user: req.user.username
            });
        } else {
            res.status(400).json({
                msg: "Invalid input data",
                errors: result.error.issues
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error while adding content"
        });
    }
})

app.get('/api/v1/get-content', authenticateToken, async (req: any, res) => {

    const content = await Content.find({
        userId: req.user.username
    })

    res.json({
        msg: `Content for ${req.user.username}`,
        content: content
    })
})

app.put('/api/v1/deleteAll', authenticateToken, async (req: any, res) => {
    const content = await Content.deleteMany({
        userId: req.user.username
    })
    res.json({
        msg: "all content deleted"
    })
})
// get content - populate 

app.post('/api/v1/brain/share', authenticateToken, async (req: any, res) => {
    const share = req.body.share;

    if (share) {
        const hash = random(10);

        const existingLink = await Link.findOne({
            userId : req.user.username
        })

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
        } else {
            const link = await Link.create({
                hash: hash,
                userId: req.user.username
            })


            res.status(201).json({
                hash: link.hash
            })
        }
    } else {
        await Link.deleteOne({
            userId: req.user.username
        })

        res.json({
            msg: "link deleted"
        })
    }
})

app.get('/api/v1/brain/:sharelink', async(req,res)=>{
    const sharelink = req.params.sharelink;

    const findLink = await Link.findOne({
        hash :sharelink
    });

    // const user = await User.findOne({
    //     username : findLink?.userId
    // })

    const content = await Content.find({
        userId : findLink?.userId
    })

    res.json({
        content 
    })
})