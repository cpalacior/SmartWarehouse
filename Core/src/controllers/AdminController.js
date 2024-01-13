const { Admin } = require('../models/models_core/Admin');
const bcrypt = require('bcrypt'); 
const utils = require('../utils/functions')
const jwt = require('jsonwebtoken')

require('dotenv').config();
const salt_rounds = 10 //Valor por defecto para generar la sal

// Retorna un lista con todos los administradores en la base de datos
const listAdmins = async(req,res) => {
    try{
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.send(error);
    }
}
// Retorna un administrador pasandole la id como parametro
const getAdmin = async(req,res) => {
    try{
        const id = req.header.id;
        const admin = await Admin.findByPk(id)
        if(!utils.ifNull404(res,admin)){
            res.send(admin)
        }
    }catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos un nuevo administrador
const createAdmin = async(req,res) => {
    try{
        password = req.body.password   
        req.body.password = await bcrypt.hash(password, salt_rounds) //Hashea la contraseña
        const admin = await Admin.create(req.body);
        res.json({'admin':admin})
    }
    catch (error) {
        res.status(409).send(error);
    }
}

//Se le pasa como JSON en un POST el email y password y devuelve verdadero y el token de autenticacion o falso, se encarga del hasheo
const authenticate = async(req,res) => {
    try{
        password = req.body.password
        email = req.body.email
        const admin = await Admin.findOne({where: {email: email}});
        const authentication = await bcrypt.compare(password,admin.password)
        if (authentication == true){
        const accessToken = jwt.sign({
            user:admin.name,
            id:admin.id
        },process.env.SECRET_TOKEN,{expiresIn:'4h'});
        res.json({"authentication":authentication,
                  "token":accessToken,
                  "adminId":admin.id,
                  "WarehouseId":admin.WarehouseId,
                });
        }
        else{
        res.json({"authentication":authentication});
        }
    }
    catch (error){
        res.json(error)
    }

}

// Actualiza datos de un admin(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateAdmin = async(req,res) =>{
    try{
        const id = req.header.id;
        if(req.body.password){
            const password = req.body.password
            req.body.password = await bcrypt.hash(password, salt_rounds) //Hashea la contraseña
        }
        const admin = await Admin.findByPk(id);
        if(!utils.ifNull404(res,admin)){
            await admin.update(req.body);
            res.json({'admin':admin})        
        }
    }
    catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError'){
            res.status(409).send(error);
        }
        else{
        res.send(error);
        }
    }
}

// Elimina un administrador pasandole un id por parametro
const deleteAdmin = async(req,res) => {
    try{
        const id = req.body.id;
        const admin = await Admin.findByPk(id);
        if(!utils.ifNull404(res,admin)){
            await admin.destroy();
            res.json({'deleted':true})        
        }
    }
    catch (error) {
        res.json({
            'error':error,
            'deleted': false
        });
    }
}


module.exports = {listAdmins,getAdmin, createAdmin,updateAdmin, deleteAdmin, authenticate};