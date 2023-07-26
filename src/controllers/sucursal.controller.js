import {getConnection} from '../database/database';

const getSucursal = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from view_sucursal;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    getSucursal
}