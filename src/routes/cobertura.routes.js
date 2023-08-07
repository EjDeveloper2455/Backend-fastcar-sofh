import { Router} from "express";
import { methods as cobertura} from "./../controllers/cobertura.controller";

const router = Router();

router.get("/",cobertura.getCobertura);
router.get("/detalle/:id",cobertura.getDetalle);
router.post("/costos/",cobertura.getCostos);
router.post("/poliza/",cobertura.savePoliza);
router.post("/poliza/detalle",cobertura.savePolizaDetalle);

export default router;