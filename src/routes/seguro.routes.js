import { Router} from "express";
import { methods as seguro} from "../controllers/seguro.controller";

const router = Router();

router.get("/",seguro.get);

export default router;