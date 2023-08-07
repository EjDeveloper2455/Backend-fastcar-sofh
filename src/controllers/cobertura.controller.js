import {getConnection} from '../database/database';

const getCobertura = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT cobertura_id as id,cobertura_nombre as nombre, "+
        "cobertura_tipo as tipo, cobertura_descripcion as descripcion, cobertura_monto_agregado as monto"+
        " from tbl_cobertura;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
const getDetalle = async(req,res) =>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM view_poliza_detalle where id = ?;",[id]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
const getCostos = async(req,res) =>{
    try {
        var sum = 0;
        const {ids,dias} = req.body;
        const connection = await getConnection();
        for (let i = 0; i < ids.length; i++) {
            var id = ids[i];
            const result = await connection.query("SELECT  cobertura_monto_agregado as monto "+
            "from tbl_cobertura where cobertura_id = ?;",[id]);
            sum += result[0].monto;
        }
        res.json({"suma":(sum*dias)});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const savePoliza = async(req,res) => {
    try{
        const {empresa,tipo,numero} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_poliza` (`poliza_empresa_aseguradora`,"
        +" `poliza_tipo`, `poliza_numero`) VALUES (?, ?, ?);",[empresa,tipo,numero]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }else{
            res.status(500).send("No se guardo"); 
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};
const savePolizaDetalle = async(req,res) => {
    try{
        const {poliza,cobertura} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_poliza_detalle` (`poliza_id`, `cobertura_id`) "+
        "VALUES (?, ?);",[poliza,cobertura]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }else{
            res.status(500).send("No se guardo"); 
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const methods = {
    getCobertura,getCostos,getDetalle,savePoliza,savePolizaDetalle
}