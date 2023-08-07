import { Router} from "express";
import { methods as marca} from "./../controllers/marca.controller";
import {authenticate as auth} from "./../utils/auth";

const router = Router();

router.get("/",auth,marca.getMarca);
router.post("/",marca.save);

export default router;