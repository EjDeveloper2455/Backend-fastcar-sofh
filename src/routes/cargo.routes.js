import { Router} from "express";
import { methods as cargo} from "../controllers/cargo.controller";

const router = Router();

router.get("/",cargo.getCargo);

export default router;