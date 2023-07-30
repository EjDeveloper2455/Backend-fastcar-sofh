import {getConnection} from '../database/database';

const getCargo = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT cargo_id as id,cargo_nombre as nombre"+
        " from tbl_cargo where cargo_id > 1;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    getCargo
}