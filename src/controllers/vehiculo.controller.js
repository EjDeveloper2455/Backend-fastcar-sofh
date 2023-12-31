import {getConnection} from '../database/database';

const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');

const getVehiculosAlls = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from view_vehiculo;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
const getVehiculos = async(req,res) =>{
    try {
        const {sucursal} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from view_vehiculo where sucursal = ?;",[sucursal]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getVehiculosByModelo = async(req,res) =>{
    try {
        const {modelo} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from view_vehiculo where idModelo = ?;",[modelo]);
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

const getImagenes = async(req,res) =>{
    try {
        const {vin} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT ruta from tbl_imagen_vehiculo where vehiculo_vin = ?;",[vin]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const saveVehiculo = async(req,res) => {
    try{
        const {vin,placa,modelo,costo,color,anio,kilometraje,transmicion,puertas,pasajeros} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_vehiculo` (`vehiculo_vin`,"+
        "`vehiculo_placa`,`modelo_id`,`vehiculo_costo_renta`,`color_id`,`vehiculo_anio`,`vehiculo_kilometraje`,"+
        "`vehiculo_transmision`.`vehiculo_puertas`,`vehiculo_pasajero`) "+
        "VALUES (?, ?, ?,?, ?, ?, ?,?,?,?); ",[vin,placa,modelo,costo,color,anio,kilometraje,transmicion,puertas,pasajeros]);
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
        const {placa,modelo,costo,color,anio,kilometraje,transmicion,puertas,pasajeros} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_vehiculo_extra` SET "+
        "`vehiculo_placa` = ?,`modelo_id` = ?,`vehiculo_costo_renta` =?,`color_id` = ?,`vehiculo_anio`=?,"+
        "`vehiculo_kilometraje` = ?,`vehiculo_transmision` = ?, `vehiculo_puertas` = ?, "+
        "`vehiculo_pasajero` = ?  WHERE (`vehiculo_vin` = ?);",[placa,modelo,costo,color,anio,kilometraje,transmicion,puertas,pasajeros,vin]);
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
    const {vin} = req.params;
    try{
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_imagen_vehiculo` SET `ruta` = ? WHERE (`id` = ?);",[firebaseUrl,vin]);
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
    updateImagen,saveImagen,getVehiculosExtra,getVehiculosAlls,getVehiculosByModelo,getImagenes
}