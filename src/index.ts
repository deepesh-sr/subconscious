import express from "express";
import mongoose from "mongoose";
const app = express();
import * as z from "zod";
import dotenv from '@dotenvx/dotenvx'

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


app.post('/signup', (req, res) => {

    const result = user.safeParse(req.body);
    if (!result.success) {
        console.log(result.error)
    } else {
        console.log(result.data)
    }


})