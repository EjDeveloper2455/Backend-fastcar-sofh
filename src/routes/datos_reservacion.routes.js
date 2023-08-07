import { Router} from "express";
import { methods as datos} from "../controllers/datos_reservacion.controller";

const router = Router();

router.post("/",datos.postDatos);

export default router;