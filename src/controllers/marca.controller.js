import {getConnection} from '../database/database';

const getMarca = async(req,res) =>{
    try {
        const cuerpo = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT marca_id as id, marca_nombre as nombre FROM tbl_marca;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    getMarca
}