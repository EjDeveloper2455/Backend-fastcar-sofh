const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');
const sendLogo = async(req,res) => {
    try{
        const {firebaseUrl,token} = req.file;
        res.json({"ruta":firebaseUrl,"token":token});
    }catch(error){
        res.status(500).send(error);
    }
}

export const methods = {
    sendLogo,Multer,upload
}