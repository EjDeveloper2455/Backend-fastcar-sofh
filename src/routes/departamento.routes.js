import { Router} from "express";
import { methods as depto} from "../controllers/departamento.controller";

const router = Router();

router.get("/",depto.getDepartamento);

export default router;