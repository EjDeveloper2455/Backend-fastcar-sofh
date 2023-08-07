import { methods as recursos} from "../controllers/recursos.controller";
import { Router} from "express";
import { methods as firebase} from "./../utils/firebase";

const router = Router();

router.post("/:nombre",recursos.upload,firebase.recursosImagen,recursos.sendLogo);

export default router;