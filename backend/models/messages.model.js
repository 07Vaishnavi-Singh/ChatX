import express from express;
import mongoose from mongoose ;

const messageSchema = new mongoose.Schema({
senderId:{
    type: mongoose.Schema.Type.Objectid,
    ref: "User",
    required: true
},
receieverId:{
    type: mongoose.Schema.Type.Objectid,
    ref: "User",
    required: true
},
message:{
    type: String,
    required: true
}
}, {timestamps: true});

const messageModel = new mongoose.model("messageModel", messageSchema);

export default messageModel;
