import {getConnection} from '../database/database'


const getClientes = async(req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from tbl_cliente;");
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const save = async(req,res) => {
    try{
        const {nombre,email,telefono} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_cliente` (`cliente_nombre`, `cliente_email`"+
        " ,`cliente_telefono`) "+
        "VALUES (?, ?, ?); ",[nombre,email,telefono]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const saveUser = async(req,res) => {
    try{
        const {usuario,id} = req.body;
        console.log(usuario);
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_cliente_user` (`usuario_cliente_email`, `cliente_id`) "+
        "VALUES (?, ?); ",[usuario,id]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const update = async(req,res) => {
    try{
        const {dni} = req.params;
        const {nombre,sucursal,sexo,cargo,departamento,nacimiento} = req.body;
        const connection = await getConnection();
        const result = await connection.query("UPDATE `tbl_empleado` SET  `empleado_nombre` = ? , `sucursal_id` = ? ,"+
        "`empleado_sexo` = ?,`cargo_id` = ?,`departamento_id` = ?, `empleado_url_foto` = ? ,`empleado_fecha_nacimiento` = ? "+
        " WHERE (`empleado_dni` = ?); ",[,nombre,sucursal,sexo,cargo,departamento,nacimiento,dni]);
        if(result){
            res.send({"mensaje":"Se ha guardado exitosamente","Data":result});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

export const methods = {
    save,update,getClientes,saveUser
}