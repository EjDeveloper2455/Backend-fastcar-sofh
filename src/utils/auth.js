import { json } from 'express';
import {getConnection} from '../database/database'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'EjSOFTFASTCAR';

//Middelware para verificar la autenticacion del token
exports.authenticate = async (req, res, next) => {
    //Se verifica que se llegue un token de autenticacion
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).send('El Token es necesario para esta operación');
        return;
    }
    //Se verifica que el token que llega sea del tipo Bearer Token
    const [type, token] = authHeader.split(' ');
    if(type !== 'Bearer'){
        res.status(401).send('Tipo de Autorizacion no valida');
        return;
    }
    
    try{
        //Se decodifica el token
        const decoded = jwt.verify(token, SECRET_KEY);
        
        const {user} = decoded;

        /*Se establece la conexion y consulta para verificar que el usuario 
        que se llega exista en la base de datos*/
        const connection = await getConnection();
        var userData = [];
         if(user.Rol == 'Cliente') userData = await connection.query("call sp_login_cliente(?)",[user.Email]);
         else userData = await connection.query("call sp_login(?)",[user.Email]);

        if(userData[0].length>0){
            //Si se encuentra el usuario en la base de datos pasa a la siguiente operacion
            var verificarDate = 1;
            //Si el usuario no es un cliente se verifica que su token no este vencido
            if(user.Rol != 'Cliente'){
                //Se extrae la fecha del token
                var fechaToken = new Date(user.Expira);

                fechaToken = fechaToken.getFullYear()+"-"+(fechaToken.getMonth() + 1)+
                "-"+fechaToken.getDate()+" "+fechaToken.getHours()+":"+fechaToken.getMinutes()+":"+fechaToken.getSeconds();
                //Se hace la consulta a la base de datos con la fecha extraida del token
                const fecha = await connection.query("select verificar_expiracion(?) as verificar;",[fechaToken]);
                verificarDate = fecha[0].verificar;
            }
            if(verificarDate == 1)next();
            else{
                res.status(401).send('Su sesion ha expirado');
            }
        }else{
            res.status(401).send('No tienes permiso para realizar esta operación');
            return;
        }
    }catch(err){
        res.status(401).send('Token Inválido');
        return;
    }
}

const getUser = async (req,res) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("Select * from tbl_usuario");
        res.json(result);
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getClienteUser = async (req,res) =>{
    try{
        const {usuario,correo} = req.params;
        const connection = await getConnection();
        const result = await connection.query("Select usuario_cliente_email as email from "+
        "tbl_usuario_cliente where usuario_cliente_email = ?",[usuario]);

        const result2 = await connection.query("Select usuario_cliente_email as email from "+
        "tbl_usuario_cliente where usuario_correo = ?",[correo]);
        var respuesta = {"res":"no"}
        if(result.length > 0)respuesta.res = 'usuario';
        else if(result2.length > 0)respuesta.res = 'correo';
     res.json(respuesta);
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getUserNombre = async (req,res) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("Select usuario_email as nombre from tbl_usuario");
        res.json(result);
    }catch(err){
        res.status(500).send(err.message);
    }
};

const signUp = async (req,res) =>{
    try{
        var {email,password,rol} = req.body;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_usuario` (`usuario_email`, `usuario_password`, `usuario_rol`) VALUES (?, ?, ?); ",[email,password,rol]);
        if(result){
            const payload = {email: email.email,role: rol};
            
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({email,rol,token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const signUpCliente = async (req,res) =>{
    try{
        var {usuario,email,password,rol,nombre,telefono} = req.body;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `tbl_usuario_cliente` (`usuario_cliente_email`,`usuario_correo`,`usuario_cliente_password`, `usuario_cliente_rol`) VALUES (?, ?, ?, ?); ",[usuario,email,password,rol]);
        const result2 = await connection.query("INSERT INTO `tbl_cliente` (`cliente_nombre`, `cliente_email`"+
        " ,`cliente_telefono`,`cliente_foto_dni`,`cliente_foto_licencia`) "+
        "VALUES (?, ?, ?,'Sin foto','Sin foto'); ",[nombre,email,telefono]);
        
        if(result2){
            const id = result2.insertId;
            const result3 = await connection.query("INSERT INTO `tbl_cliente_user` (`usuario_cliente_email`, `cliente_id`) "+
            "VALUES (?, ?); ",[usuario,id]);
        }
        if(result){
            const payload = {usuario: usuario,email: email,role: rol};
            
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({email,usuario,rol,token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
};

const login = async(req, res) =>{
    try{
        const {email,password} = req.body;
        const connection = await getConnection();
        const result = await connection.query("call sp_login(?)",[email]);
        console.log(result);
        if(result[0][0].length == 0){
            res.status(401).send('Credenciales incorrecta');
            return;
        }
        //console.log(password);
        const isMatch = await bcrypt.compare(password, result[0][0].password);
        if(!isMatch){
            res.status(401).send('Credenciales incorrecta');
        }else{
            const user = {"Email": result[0][0].email,"Rol": result[0][0].rol,"Nombre": result[0][0].nombre,
             "Expira": result[0][0].expiracion};
            const payload = {user};
            
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({user, token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send("login: Hubo un error: " + err);
    }
}

const loginCliente = async(req, res) =>{
    try{
        const {email,password} = req.body;
        const connection = await getConnection();
        const result = await connection.query("call sp_login_cliente(?)",[email]);
        console.log(result);
        if(result[0][0].length == 0){
            res.status(401).send('Credenciales incorrecta');
            return;
        }
        //console.log(password);
        const isMatch = await bcrypt.compare(password, result[0][0].password);
        if(!isMatch){
            res.status(401).send('Credenciales incorrecta');
        }else{
            const user = {"Email": result[0][0].email,"Correo": result[0][0].correo,"Rol": result[0][0].rol,
            "id":result[0][0].ID,"Nombre": result[0][0].nombre, "Expira": result[0][0].expiracion,
            "foto_dni":result[0][0].foto_dni,"foto_licencia":result[0][0].foto_licencia};
            const payload = {user};
            
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({user, token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send("login: Hubo un error: " + err);
    }
}

const decodificarToken = async(req, res) =>{
    try {
        const {token} = req.params;
        const decodedToken = jwt.verify(token, SECRET_KEY); 
        res.json(decodedToken);
      } catch (error) {
        res.status(500).send('Error al decodificar el token:'+ error.message);
      }
}


export const methods = {
    signUp,getUser,login,loginCliente,signUpCliente,getUserNombre,getClienteUser,decodificarToken
}
