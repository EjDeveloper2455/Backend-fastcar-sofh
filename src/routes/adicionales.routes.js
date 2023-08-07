import { Router} from "express";
import Routes from "twilio/lib/rest/Routes";
import { methods as adicionales} from "../controllers/adicionales.controller";
import { methods as firebase} from "./../utils/firebase";

const router = Router();

router.get("/",adicionales.get);
router.get("/solicitud/:id",adicionales.getSolicitudExtra);
router.post("/",adicionales.save);
router.post("/extra/",adicionales.saveAdicionalSolicitud);
router.post("/costos/",adicionales.getCostos);
router.put("/:id",adicionales.upload,firebase.adicionalesImagen,adicionales.updateImagen);

export default router;