import {getConnection} from '../database/database';

const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');

const getVehiculos = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from view_vehiculo;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getVehiculosExtra = async(req,res) =>{
    try {
        const {vin} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT vehiculo_extra_id as id, "+
        "vehiculo_extra_descripcion as descripcion, vehiculo_extra_costo as costo "+
        "FROM tbl_vehiculo_extra where vehiculo_vin = ?;",[vin]);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const saveVehiculo = async(req,res) => {
    try{
        const {vin,sucursal,placa,modelo,costo,color,anio,kilometraje} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_vehiculo` (`vehiculo_vin`, `sucursal_id`,"+
        "`vehiculo_placa`,`modelo_id`,`vehiculo_costo_renta`,`color_id`,`vehiculo_anio`,`vehiculo_kilometraje`) "+
        "VALUES (?, ?, ?, ?,?, ?, ?, ?); ",[vin,sucursal,placa,modelo,costo,color,anio,kilometraje]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};
const saveVehiculoExtra = async(req,res) => {
    try{
        const {vin,descripcion,costo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_vehiculo_extra` (`vehiculo_vin`, `vehiculo_extra_descripcion`,"+
        "`vehiculo_extra_costo`) VALUES (?, ?, ?); ",[vin,descripcion,costo]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const updateVehiculo = async(req,res) => {
    try{
        const {vin} = req.params;
        const {sucursal,placa,modelo,costo,color,anio,kilometraje} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_vehiculo_extra` SET  `sucursal_id` = ?,"+
        "`vehiculo_placa` = ?,`modelo_id` = ?,`vehiculo_costo_renta` =?,`color_id` = ?,`vehiculo_anio`=?,"+
        "`vehiculo_kilometraje` = ? WHERE (`vehiculo_vin` = ?);",[sucursal,placa,modelo,costo,color,anio,kilometraje,vin]);
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

const updateVehiculoExtra = async(req,res) => {
    try{
        const {id} = req.params;
        const {descripcion,costo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_vehiculo_extra` SET  `vehiculo_extra_descripcion` = ?,"+
        "`vehiculo_extra_costo` = ? WHERE (`vehiculo_extra_id` = ?);",
        [descripcion,costo,id]);
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

const saveImagen = async(req,res) => {
    try{
        const {vin} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_imagen_vehiculo` (`vehiculo_vin`, `ruta`) VALUES (?,'default'); ",[vin]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
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
        const result = await connection.query("UPDATE `tbl_imagen_vehiculo` SET `ruta` = ? WHERE (`id` = ?);",[firebaseUrl,id]);
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
    getVehiculos,Multer,upload,saveVehiculo,saveVehiculoExtra,updateVehiculo,updateVehiculoExtra,
    updateImagen,saveImagen,getVehiculosExtra
}