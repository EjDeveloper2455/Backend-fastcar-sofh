import { Router} from "express";
import { methods as firebase} from "./../utils/firebase";
import { methods as empleado} from "./../controllers/empleado.controller";

const router = Router();

router.get("/",empleado.getEmpleados);
router.post("/",empleado.save);
router.post("/user/",empleado.saveUser);
router.put("/imagen/:dni",empleado.upload,firebase.empleadoImagen,empleado.updateFoto);

export default router;