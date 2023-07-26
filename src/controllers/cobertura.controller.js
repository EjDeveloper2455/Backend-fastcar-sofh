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

export const methods = {
    getCobertura
}