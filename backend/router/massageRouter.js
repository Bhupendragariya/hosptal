import express from 'express';
import { getAllMessages, sendMassage } from '../controller/messageControler.js';
import{ isAdminAuthenticated} from "../middlewares/auth.js"


const router = express.Router();

router.post('/send-messages',  sendMassage);
router.get("/getall", isAdminAuthenticated,  getAllMessages)

export default router;
