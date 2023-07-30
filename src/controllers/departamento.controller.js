import {getConnection} from '../database/database';

const getDepartamento = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT departamento_id as id,departamento_nombre as nombre"+
        " from tbl_departamento where departamento_id > 1;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    getDepartamento
}