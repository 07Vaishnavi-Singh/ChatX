// package imports
import express from "express";
import cors from "cors";

// File imports 
import {connectToDB} from "./db/connectToDatabase.js";
import userRoutes from "./routes/auth.routes.js";

const app = express();
// server port 
const PORT = 8000;


// middlewares 
app.use(express());
app.use(cors());
app.use('/api/auths', userRoutes);


app.listen(PORT, ()=>{
    connectToDB();
    console.log("Database connected");
    console.log("Server started");
})
