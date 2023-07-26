import { Router} from "express";
import { methods as firebase} from "./../utils/firebase";
import { methods as vehiculo} from "./../controllers/vehiculo.controller";

const router = Router();

router.get("/",vehiculo.getVehiculos);
router.get("/extra/:vin",vehiculo.getVehiculosExtra);
router.post("/",vehiculo.saveVehiculo);
router.post("/extra/",vehiculo.saveVehiculoExtra);
router.post("/imagen/",vehiculo.saveImagen);

router.put("/:vin",vehiculo.updateVehiculo);
router.put("/extra/:vin",vehiculo.updateVehiculoExtra);
router.put("/imagen/:vin",vehiculo.upload,firebase.vehiculoImagen,vehiculo.updateImagen);



export default router;