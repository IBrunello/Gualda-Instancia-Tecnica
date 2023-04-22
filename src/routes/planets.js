const { Router } = require('express');
const {Planet} = require('../db');

const router = Router();

router.get('/', async(req, res, next) => {
    try {

        let planets = await Planet.findAll();   //Traer todos los planetas de la base de datos
        return res.status(200).json(planets);   //Enviar los datos por headers

    }
    catch(err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {

        let id = req.params.id;     //Defino la id por headers
        let planet = await Planet.findOne({where:{id: id}});    //Traer el planeta de la base de datos

        if(planet){
            return res.status(200).json(planet);    //Si el planeta existe, enviarlo por headers
        }
        return res.status(404).send('Planet not found');    //Si no existe, enviar el mensaje de error
    }
    catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        let first = await Planet.getAttributes();    //Traer los nombres de los atributos del modelo Planet
        let required = Object.keys(first);      //Convertir el objeto de los atributos en un arreglo con sus keys
        required.shift();       //Eliminar el primer indice del arreglo, el atributo id
        let body = req.body;    //Definir el planeta a crear por body

        if(!Object.values(body).includes(null) && required.every((e)=>body.hasOwnProperty(e))){

            let planet = await Planet.findOne({where:{id: body.id}});   //Si los parametros por body son correctos, traer el planeta de la base de datos

            if(planet){
                return res.status(200).json("Planet already exists");   //Si el planeta existe, enviar el mensaje de error
            }
            Planet.create(body);        //Si el planeta no existe, crearlo en la base de datos
            return res.status(200).json("Planet created successfully");     //Enviar el mensaje de creación
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
        let first = await Planet.getAttributes();       //Traer los nombres de los atributos de la base de datos
        let required = Object.keys(first);      //Convertir el objeto de los atributos en un arreglo con sus keys
        required.shift();       //Eliminar el primer indice del arreglo, el atributo id
        let body = req.body;    //Definir el planeta a actualizar por body

        if(!Object.values(body).includes(null) && required.every((e)=>body.hasOwnProperty(e))){

            let planet = await Planet.findOne({where:{id: id}});    //Si los parametros por body son correctos, traer el planeta de la base de datos

            if(planet){
                let updated = await Planet.update(body,{where:{id:id}});    //Si el planeta existe, actualizarlo
                return res.status(200).json(body);      //Enviar lel planeta actualizado 
            }
            return res.status(404).send("Planet not found");    //Si el planeta no existe, enviar el mensaje de error
        }
        return res.send("Incorrect parameters");    //Si los parametros por body son incorrectos, enviar el mensaje de error
    }catch(err) {
        res.send(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;     //Definir el id por params
        let planet =  await Planet.findOne({where:{id:id}});    //Traer el planeta de la base de datos

        if(planet){
            await Planet.destroy({where:{id:id}});      //Si el planeta existe, eliminarlo de la base de datos
            return res.status(200).json("Planet deleted successfully");     //Enviar el mensaje de eliminación
        }
        return res.status(404).send("Planet not found");    //Si el planeta no existe, enviar el mensaje de error
    }catch(err) {
        res.send(err);
    }
})

module.exports = router;