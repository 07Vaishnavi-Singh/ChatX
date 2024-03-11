import express from "express";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import makeTokenNSendCookie from "../utils/createJWT.js";

export const login =async(req, res)=>{

try{

const {username, password} = req.body;

const user = userModel.findOne({username : username});

// checking if the user exists
if(user){
    res.status(400).json({message: "User doesnot exist"});
}
else{
// checking if tthe password in correct
const isPassword = await bcrypt.compare(password, user.password);
if(!isPassword){
res.status(400).json({message: "Incorrect Password"});
}
else{
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
    });
}
}
}catch(error){
res.satus(500).json({message: error.message});
}

}
export const logout = async(req, res)=>{

try{
    // basically delets the cookie from the server 
    res.cookie("jwt", "", { maxAge: 0 });         // cookie maxAge = 0 and sets thevalue of the cookie as empty 
    res.status(200).json({ message: "Logged out successfully" });
}catch(error){
    res.status(500).json({message: error.message});
}

}

export const signup= async(req, res)=>{

try{

 const { fullName,username, password, confrimpasssword, gender  } = req.body;
 
 const user = userModel.findOne({ username: username});

if(password !==  confrimpasssword){
    res.status(500).json("Passwords and confirm passwords not matching");
 }

if(user){
res.status(500).json("Username already taken");
}

const salt = bcrypt.genSaltSync(10);
const hashedPassord = bcrypt.hashSync(password , salt);

const profilePicGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;
const profilePicBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;

const newUser =  new userModel({
    fullName,
    username,
    password: hashedPassord,
    gender,
    profilePic: (gender == "girl" ?profilePicGirl: profilePicBoy )
})

if(newUser){
    makeTokenNSendCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic,
});
}
else {
    res.status(400).json({ error: "Invalid user data" });
}

}catch(error){
    res.status(500).json({ message: error.message} );
    console.log("Unable to sign in! Error occured");
}


}
