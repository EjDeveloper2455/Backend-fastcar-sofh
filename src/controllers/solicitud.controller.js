import {getConnection} from '../database/database';

const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');
const upload2 = Multer.single('imagen2');

const getSolicitud = async(req,res) =>{
    try {
        const {sucursal} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM view_solicitud where sucursal = ?;",[sucursal]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const save = async(req,res) => {
    try{
        const {vin,sucursal,idCLiente,desde,dniCliente,poliza,nombre,direccion,telefono,total,
            adelanto,tarjeta,retiro,entrega} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `bd_ej_soft`.`tbl_solicitud` (`vehiculo_vin`, "+
        "`sucursal_id`, `cliente_id`, `sucursal_desde`, `solicitud_dni_cliente`,`solicitud_foto_dni`, `solicitud_foto_licencia`, "+
        "`poliza_id`, `solicitud_nombre_receptor`, `solicitud_direccion`, `solicitud_telefono`, "+
        "`solicitud_monto_total`, `solicitud_adelanto`, `tarjeta_numero`,`solicitud_fecha_retiro`,"+
        "`solicitud_fecha_entrega`) VALUES (?, ?, ?, ?, ?, 'Sin Foto', 'Sin Foto',?, ?, ?, ?, ?, ?, ?,?,?);",[vin,
            sucursal,idCLiente,desde, dniCliente,poliza,nombre,direccion,telefono,
            total,adelanto,tarjeta,retiro,entrega]);
        if(result){
            const result2 = await connection.query("INSERT INTO `bd_ej_soft`.`tbl_notificacion` "+
            "(`titulo`, `cuerpo`, `tipo`, `para`, `sucursal_id`) VALUES ('Nueva solicitud de reservacion', "+
            "'Se ha hecho una nueva solicitud de reservacion para el vehiculo con vin: "+vin+"', 'Solicitud', 'Sucursal', ?);",[sucursal]);
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};
const updateFoto = async(req,res) => {
    try{
        const {documento,id} = req.params;
        const {firebaseUrl,token} = req.file;
        console.log(firebaseUrl,documento);
        const connection = await getConnection();
        if(documento == 'dni'){
            const result = await connection.query("UPDATE `tbl_solicitud` SET  `solicitud_foto_dni` = ?"+
            " WHERE (`solicitud_id` = ?); ",[firebaseUrl,id]);
            if(result){
                res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
            }
        }else{
            const result = await connection.query("UPDATE `tbl_solicitud` SET  `solicitud_foto_licencia` = ?"+
            " WHERE (`solicitud_id` = ?); ",[firebaseUrl,id]);
            if(result){
                res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
            }
        }

        
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const methods = {
    getSolicitud,save,Multer,upload,updateFoto,upload2
}