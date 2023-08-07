import { Router} from "express";
import { methods as sms} from "./../controllers/sms.controller";

const router = Router();

router.post("/",sms.sendSms);

export default router;