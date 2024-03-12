// package imports
import express from "express";
import cors from "cors";

// File imports 
import {connectToDB} from "./db/connectToDatabase.js";
import userRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";

// declaring constants
const app = express();
const PORT = 8000;

// middlewares 
app.use(express());
app.use(cors());

// routes
app.use('/api/auths', userRoutes);
app.use('/api/messages',messageRoutes );

// making the server
app.listen(PORT, ()=>{
    connectToDB();
    console.log("Database connected");
    console.log("Server started");
})
