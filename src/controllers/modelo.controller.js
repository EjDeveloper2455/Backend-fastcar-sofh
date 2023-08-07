import {getConnection} from '../database/database';

const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');

const getModelos = async(req,res) =>{
    try {
        const {sucursal} = req.params;
        console.log(sucursal);
        const connection = await getConnection();
        const result = await connection.query("SELECT * from view_modelo where sucursal = ?;",[sucursal]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const saveModelo = async(req,res) => {
    try{
        const {sucursal,marca,modelo,tipo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_modelo` (`sucursal_id`,`modelo_descripcion`, "+
        "`marca_id`,`tipo_vehiculo_id`,`modelo_url_imagen`) VALUES (?, ?, ?, ?,'default'); ",[sucursal,modelo,marca,tipo]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};


const updateModelo = async(req,res) => {
    try{
        const {id} = req.params;
        const {marca,modelo,tipo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_modelo` SET `modelo_descripcion` = ?, `marca_id` = ?, `tipo_vehiculo_id` = ? WHERE (`modelo_id` = ?);",[modelo,marca,tipo,id]);
        if(result){
            res.send({"mensaje":"Se ha modificado exitosamente","Data":result});
        }else{
            res.status(500).send({"mensaje":"Ha ocurrido un error al intentar realizar la modificación"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const updateImagen = async(req,res) => {
    const {firebaseUrl,token} = req.file;
    const {id} = req.params;
    try{
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_modelo` SET `modelo_url_imagen` = ? WHERE (`modelo_id` = ?);",[firebaseUrl,id]);
        if(result){
            res.send({"mensaje":"Se ha modificado exitosamente","Data":result});
        }else{
            res.status(500).send({"mensaje":"Ha ocurrido un error al intentar realizar la modificación"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const methods = {
    saveModelo,Multer,upload,updateModelo,updateImagen,getModelos
}