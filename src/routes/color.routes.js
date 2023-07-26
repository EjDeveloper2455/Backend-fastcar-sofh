import { Router} from "express";
import { methods as color} from "./../controllers/color.controller";
import {authenticate as auth} from "./../utils/auth";

const router = Router();

router.get("/",color.getColor);

export default router;