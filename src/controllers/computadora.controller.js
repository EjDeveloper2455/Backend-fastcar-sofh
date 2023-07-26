import {getConnection} from '../database/database';


const getComputadora = async(req,res) =>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT sucursal_id as sucursal from tbl_computadora "+
        "where computadora_ip = ? and computadora_estado = 'Activo';",[id]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const saveComputadora = async(req,res) => {
    try{
        const {ip,sucursal} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_computadora` (`computadora_ip`, `sucursal_id`) VALUES (?, ?); ",[ip,sucursal]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};


const updateComputadora = async(req,res) => {
    try{
        const {id} = req.params;
        const {sucursal} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_computadora` SET `sucursal_id` = ? WHERE (`computadora_ip` = ?);",[sucursal,id]);
        if(result){
            res.send({"mensaje":"Se ha modificado exitosamente","Data":result});
        }else{
            res.status(500).send({"mensaje":"Ha ocurrido un error al intentar realizar la modificación"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};


export const methods = {
    getComputadora,saveComputadora,updateComputadora
}