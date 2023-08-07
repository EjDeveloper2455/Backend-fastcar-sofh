import {getConnection} from '../database/database';

const get = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tbl_notificacion where CAST(date_create AS DATE) = curdate();");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    get
}