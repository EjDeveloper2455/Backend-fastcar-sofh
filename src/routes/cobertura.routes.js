import { Router} from "express";
import { methods as cobertura} from "./../controllers/cobertura.controller";

const router = Router();

router.get("/",cobertura.getCobertura);

export default router;