import { Router} from "express";
import { methods as solicitud} from "./../controllers/solicitud.controller";
import { methods as firebase} from "./../utils/firebase";
const router = Router();

router.get("/:sucursal",solicitud.getSolicitud);
router.post("/",solicitud.save);
router.put("/:documento/:id",solicitud.upload,firebase.solicitudImagen,solicitud.updateFoto);
router.put("/licencia/:documento/:id",solicitud.upload,firebase.solicitudImagen,solicitud.updateFoto);

export default router;