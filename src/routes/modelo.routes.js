import { Router} from "express";
import { methods as firebase} from "./../utils/firebase";
import { methods as modelo} from "./../controllers/modelo.controller";
const router = Router();

router.get("/:sucursal",modelo.getModelos);
//router.put("/imagen/:id",slider.upload,firebase.sliderImagen,slider.updateImagen);
router.post("/",modelo.saveModelo);
//router.post("/imagen",modelo.saveImagen);
router.put("/:id",modelo.updateModelo);
router.put("/imagen/:id",modelo.upload,firebase.modeloImagen,modelo.updateImagen);

export default router;