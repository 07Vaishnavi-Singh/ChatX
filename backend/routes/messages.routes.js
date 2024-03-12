import express from "express";
import { Messages, Conversation } from "../controllers/messages.controllers.js";
import ProtectRoute from "../middlewares/protect.routes.js";

const router = express.Router();

router.get('/messages', ProtectRoute ,Messages);
router.get('/conversations', Conversation);


export default router;