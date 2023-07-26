import { Router} from "express";
import { methods as pc} from "./../controllers/computadora.controller";

const router = Router();

router.get("/:id",pc.getComputadora);
router.put("/:id",pc.updateComputadora);
router.post("/",pc.saveComputadora);

export default router;