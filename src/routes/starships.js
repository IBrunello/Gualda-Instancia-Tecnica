const { Router } = require('express');
const {Starship} = require('../db');

const router = Router();

router.get('/', async(req, res, next) => {
    try {

        let starships = await Starship.findAll();   //Traer todas las naves de la base de datos
        return res.status(200).json(starships);   //Enviar los datos por headers

    }
    catch(err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {

        let id = req.params.id;     //Defino la id por headers
        let starship = await Starship.findOne({where:{id: id}});    //Traer la nave de la base de datos

        if(starship){
            return res.status(200).json(starship);    //Si la nave existe, enviarlo por headers
        }
        return res.status(404).send('Starship not found');    //Si no existe, enviar el mensaje de error
    }
    catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        let first = await Starship.getAttributes();    //Traer los nombres de los atributos del modelo Starhip
        let required = Object.keys(first);      //Convertir el objeto de los atributos en un arreglo con sus keys
        required.shift();       //Eliminar el primer indice del arreglo, el atributo id
        let body = req.body;    //Definir la nave a crear por body

        if(!Object.values(body).includes(null) && required.every((e)=>body.hasOwnProperty(e))){

            let starship = await Starship.findOne({where:{id: body.id}});   //Si los parametros por body son correctos, traer la nave de la base de datos

            if(starship){
                return res.status(200).json("Starship already exists");   //Si la nave existe, enviar el mensaje de error
            }
            Starship.create(body);        //Si la nave no existe, crearlo en la base de datos
            return res.status(200).json("Starship created successfully");     //Enviar el mensaje de creación
        }
        return res.send("Incorrect parameters");    //Si los parametros por body son incorrectos, enviar el mensaje de error
    }
    catch(err) {
        res.send(err);
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;     //Definir el id por params
        let first = await Starship.getAttributes();       //Traer los nombres de los atributos de la base de datos
        let required = Object.keys(first);      //Convertir el objeto de los atributos en un arreglo con sus keys
        required.shift();       //Eliminar el primer indice del arreglo, el atributo id
        let body = req.body;    //Definir la nave a actualizar por body

        if(!Object.values(body).includes(null) && required.every((e)=>body.hasOwnProperty(e))){

            let planet = await Starship.findOne({where:{id: id}});    //Si los parametros por body son correctos, traer la nave de la base de datos

            if(planet){
                let updated = await Starship.update(body,{where:{id:id}});    //Si la nave existe, actualizarlo
                return res.status(200).json(body);      //Enviar el mensaje de actualización
            }
            return res.status(404).send("Starship not found");    //Si la nave no existe, enviar el mensaje de error
        }
        return res.send("Incorrect parameters");    //Si los parametros por body son incorrectos, enviar el mensaje de error
    }catch(err) {
        res.send(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;     //Definir el id por params
        let starship =  await Starship.findOne({where:{id:id}});    //Traer la nave de la base de datos

        if(starship){
            await Starship.destroy({where:{id:id}});      //Si la nave existe, eliminarlo de la base de datos
            return res.status(200).json("Starship deleted successfully");     //Enviar el mensaje de eliminación
        }
        return res.status(404).send("Starship not found");    //Si la nave no existe, enviar el mensaje de error
    }catch(err) {
        res.send(err);
    }
})

module.exports = router;