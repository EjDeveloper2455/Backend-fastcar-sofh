import { Router} from "express";
import { methods as notificaciones} from "../controllers/notificaciones.controller";

const router = Router();

router.get("/",notificaciones.get);

export default router;