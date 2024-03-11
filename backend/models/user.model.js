import express from "express";
import mongoose,{Schema} from "mongoose";

const userSchema = mongoose.Schema(
    { 
        fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }

)

export const userModel = new mongoose.model('userModel', userSchema);
