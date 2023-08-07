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

const save = async(req,res) =>{
    try {
        const {nombre} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `bd_ej_soft`.`tbl_marca` (`marca_nombre`) VALUES (?);",[nombre]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const methods = {
    getMarca,save
}