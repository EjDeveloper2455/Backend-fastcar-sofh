import {getConnection} from '../database/database';

const getColor = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT color_id as id, color_nombre as nombre FROM tbl_color;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    getColor
}