import { Router} from "express";
import { methods as auth} from "./../utils/auth";
const router = Router();

router.get("/",auth.getUser);
router.get("/nombre",auth.getUserNombre);
router.get("/get",(req,res) =>{
    res.send("Salida");
});
router.post("/",auth.signUp);
router.post("/login",auth.login);
router.post("/cliente/",auth.signUpCliente);
router.post("/cliente/login",auth.loginCliente);
export default router;
