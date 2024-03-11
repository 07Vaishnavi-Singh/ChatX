import express from express;
import mongoose from mongoose;

const conversationSchema = new mongoose.Schema({
    particpants:[
        {
            types: mongoose.Schema.Type.ObjectId,
            ref: 'User'
        }
    ],
    messages:[
        {
            types: mongoose.Schema.Type.ObjectId,
            required: true,
            default:[]
        }
    ]
}, {timestamps: true});
