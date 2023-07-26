import { Router} from "express";
import { methods as sucursal} from "./../controllers/sucursal.controller";

const router = Router();

router.get("/",sucursal.getSucursal);

export default router;