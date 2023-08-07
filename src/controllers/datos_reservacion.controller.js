import {getConnection} from '../database/database';

const postDatos = async(req,res) =>{
    try {
        const {retiro,entrega,fechaRetiro,fechaEntrega,modelo} = req.body;
        const connection = await getConnection();
        const result = await connection.query("call sp_datos_reserva(?, ?, ?, ?, ?);",[retiro,entrega,fechaRetiro,fechaEntrega,modelo]);
        if(result[0].length>0)res.json(result[0][0]);
        else res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    postDatos
}