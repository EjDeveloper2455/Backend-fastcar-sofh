import {getConnection} from '../database/database';


const get= async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT cobertura_id as id, cobertura_nombre as nombre,"+
        "cobertura_descripcion as descripcion,cobertura_tipo as tipo, cobertura_monto_agregado as costo"+
        "  from tbl_cobertura order by cobertura_tipo desc;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    get
}