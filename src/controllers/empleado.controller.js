import {getConnection} from '../database/database'

const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');

const getEmpleados = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from tbl_empleado;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const save = async(req,res) => {
    try{
        const {dni,nombre,sucursal,sexo,cargo,departamento,nacimiento,direccion,telefono,correo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_empleado` (`empleado_dni`, `empleado_nombre`"+
        " ,`sucursal_id`,`empleado_sexo`,`cargo_id`,`departamento_id`,`empleado_url_foto`,"+
        "`empleado_fecha_nacimiento`,empleado_direccion,empleado_telefono,empleado_correo) "+
        "VALUES (?, ?, ?, ?, ?, ?, 'default', ?,?,?,?); ",[dni,nombre,sucursal,sexo,cargo,departamento,nacimiento,direccion,telefono,correo]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const saveUser = async(req,res) => {
    try{
        const {usuario,dni} = req.body;
        console.log(usuario);
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_empleado_usuario` (`usuario_email`, `empleado_dni`) "+
        "VALUES (?, ?); ",[usuario,dni]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const update = async(req,res) => {
    try{
        const {dni} = req.params;
        const {nombre,sucursal,sexo,cargo,departamento,nacimiento} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_empleado` SET  `empleado_nombre` = ? , `sucursal_id` = ? ,"+
        "`empleado_sexo` = ?,`cargo_id` = ?,`departamento_id` = ?, `empleado_url_foto` = ? ,`empleado_fecha_nacimiento` = ? "+
        " WHERE (`empleado_dni` = ?); ",[,nombre,sucursal,sexo,cargo,departamento,nacimiento,dni]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};
const updateFoto = async(req,res) => {
    try{
        const {dni} = req.params;
        const {firebaseUrl,token} = req.file;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_empleado` SET  `empleado_url_foto` = ?"+
        " WHERE (`empleado_dni` = ?); ",[firebaseUrl,dni]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const methods = {
    save,Multer,upload,update,getEmpleados,updateFoto,saveUser
}