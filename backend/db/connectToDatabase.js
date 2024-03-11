import express from "express";
import mongoose from "mongoose";
 const MONGODB_URL = "mongodb+srv://VaishnaviSingh07:VaishnaviSingh07@cluster0.4nhfszh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDB=()=>{
    mongoose.connect(MONGODB_URL);
}
