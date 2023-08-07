
var admin = require("firebase-admin");
var serviceAccount = require("./keys/firebase-filestorage-key.json");
const jwt = require('jsonwebtoken');

const BUCKET = "gs://project-ej-1471f.appspot.com";
const SECRET_KEY = 'EjSOFTFASTCARFILES';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const empleadoImagen = (req,res,next) =>{
    const {dni} = req.params;
    uploadFile(req,res,next,"imagenes/empleados/",Date.now()+'_'+dni);
}
const sliderImagen = (req,res,next) =>{
    const {id} = req.params;
    uploadFile(req,res,next,"imagenes/slider/",id);
}

const modeloImagen = (req,res,next) =>{
    const {id} = req.params;
    uploadFile(req,res,next,"imagenes/modelos/",Date.now()+'_'+id);
}
const vehiculoImagen = (req,res,next) =>{
    const {vin} = req.params;
    uploadFile(req,res,next,"imagenes/vehiculos/",Date.now()+'_'+vin);
}
const recursosImagen = (req,res,next) =>{
    const {nombre} = req.params;
    uploadFile(req,res,next,"imagenes/recursos/",nombre);
}
const adicionalesImagen = (req,res,next) =>{
    const {id} = req.params;
    uploadFile(req,res,next,"imagenes/adicionales/",Date.now()+'_'+id);
}
const solicitudImagen = (req,res,next) =>{
    const {documento,id} = req.params;
    uploadFile(req,res,next,"imagenes/documentos/",Date.now()+"_"+documento+"_"+id);
}
//Funcion para subir una imagen
function uploadFile(req,res,next,path,id){
    if(!req.file){
        console.log('Fallo al guardar la imagen',req.file);
        res.status(401).send("Fallo al guardar la imagen");
    }else {
        const imagen = req.file;
        const nombreImagen = id+'.'+imagen.originalname.split('.').pop();

        const file = bucket.file(path+nombreImagen);

        const stream = file.createWriteStream({
            metadata: {
                contentType: imagen.mimetype
            }
        });
        
        stream.on('error',(error) => {
            console.log(error);
        });
        stream.on('finish', async () => {
            await file.makePublic();
            const payload = {

            'date': Date.now(),
            'directoryUrl': 'https://storage.googleapis.com/'+file.metadata.bucket,
            'directory': path+"/"+nombreImagen,
            'bucketUrl': file.metadata.bucket,
            'fileName': nombreImagen
            };
            const token = jwt.sign(payload, SECRET_KEY);
            req.file.firebaseUrl = 'https://storage.googleapis.com/'+file.metadata.bucket+'/'+file.metadata.name+'?token='+token;
            req.file.token = token;
            next(); 
        });
        stream.end(imagen.buffer);

    }
};

export const methods = {
    empleadoImagen,sliderImagen,modeloImagen,vehiculoImagen,recursosImagen,adicionalesImagen,solicitudImagen
}
