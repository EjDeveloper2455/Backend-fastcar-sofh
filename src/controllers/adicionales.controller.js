import {getConnection} from '../database/database'

const multer = require('multer');
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

const upload = Multer.single('imagen');

const get = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("select * from tbl_adicionales");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getSolicitudExtra = async(req,res) =>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM view_solicitud_adicionales where solicitud_id = ?;",id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const save = async(req,res) => {
    try{
        const {id,nombre,maximo,costo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_adicionales` (`id`,`nombre`, `maximo`"+
        " ,`costo`) "+
        "VALUES (?, ?, ?, ?); ",[id,nombre,maximo,costo]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};
const saveAdicionalSolicitud = async(req,res) => {
    try{
        const {solicitud,id,cantidad} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_solicitud_extra` (`solicitud_id`, `adicionales_id`, `cantidad`) VALUES ('?, ?, ?);",[solicitud,id,cantidad]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const getCostos = async(req,res) =>{
    try {
        var sum = 0;
        var sumUnitario = 0;
        const {ids,dias} = req.body;
        const connection = await getConnection();
        for (let i = 0; i < ids.length; i++) {
            var id = ids[i];
            const result = await connection.query("SELECT costo,cargo from tbl_adicionales "+
            "where id = ?;",[id.id]);
            if(result[0].cargo == "por dia")sum += (result[0].costo*id.cantidad);
            else sumUnitario  += result[0].costo;
        }
        res.json({"suma":(sum*dias)+sumUnitario});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const updateImagen = async(req,res) => {
    try{
        const {id} = req.params;
        const {firebaseUrl,token} = req.file;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_adicionales` SET  `ruta` = ?"+
        " WHERE (`id` = ?); ",[firebaseUrl,id]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const methods = {
    save,Multer,upload,get,updateImagen,getCostos,getSolicitudExtra,saveAdicionalSolicitud
}