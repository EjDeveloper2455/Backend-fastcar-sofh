import { Router} from "express";
import { methods as firebase} from "./../utils/firebase";
import { methods as vehiculo} from "./../controllers/vehiculo.controller";

const router = Router();

router.get("/",vehiculo.getVehiculosAlls);
router.get("/:sucursal",vehiculo.getVehiculos);
router.get("/modelo/:modelo",vehiculo.getVehiculosByModelo);
router.get("/extra/:vin",vehiculo.getVehiculosExtra);
router.get("/imagenes/:vin",vehiculo.getImagenes);

router.post("/",vehiculo.saveVehiculo);
router.post("/extra/",vehiculo.saveVehiculoExtra);
router.post("/imagen/",vehiculo.saveImagen);

router.put("/:vin",vehiculo.updateVehiculo);
router.put("/extra/:vin",vehiculo.updateVehiculoExtra);
router.put("/imagen/:vin",vehiculo.upload,firebase.vehiculoImagen,vehiculo.updateImagen);



export default router;