const { Router } = require('express');
const {Film} = require('../db');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        let films = await Film.findAll();   //Traer todas las peliculas de la base de datos
        return res.status(200).json(films);  //Enviar los datos por headers
    }catch(err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;     //Definir el id por params
        let film = await Film.findOne({where:{episode_id: id}});    //Traer pelicula de la base de datos
        if(film){       
        return res.status(200).json(film);      //Si la pelicula existe, enviarla por headers
        }
        return res.status(404).send('Film not found');      //Si no existe, enviar mensaje de error
    }catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res, next) => {
    try {

        let attributes = await Film.getAttributes();     //Traer los nombres de los atributos del modelo Film
        let required = Object.keys(attributes);      //Converir el objeto attributes en un arreglo con sus keys
        let movie = req.body;       //Definir la pelicula a crear por body

        if(!Object.values(movie).includes(null) && required.every((e)=>movie.hasOwnProperty(e))){

        let film = await Film.findOne({where:{episode_id: movie.episode_id}});      //Si los datos enviados por body son correctos, traer pelicula de la base de datos

        if(film){
            return res.status(200).json("Film already exists");     //Si la pelicula existe, enviar mensaje de error
        }
            Film.create(movie);     //Si no existe, crear la pelicula en la base de datos
            return res.status(200).json("Film created successfully");      //Enviar el mensaje de creación
        }
        return res.send("Incorrect parameters");    //Si los datos enviados por body son incorrectos, enviar el mensaje de error
    }
    catch(err) {
        res.send(err);
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;     //Definir el id por params
        let attributes = await Film.getAttributes();    //Traer los nombres de los atributos del modelo Film
        let required = Object.keys(attributes);     //Converir el objeto attributes en un arreglo con sus keys
        let movie = req.body;     //Definir la pelicula a actualizar por body

        if(!Object.values(movie).includes(null) && required.every((e)=>movie.hasOwnProperty(e))){

        let film = await Film.findOne({where:{episode_id: id}});    //Si los datos enviados por body son correctos, traer pelicula de la base de datos
        
        if(film){
                let updated = await Film.update(movie,{where:{episode_id:id}});     //Si la pelicula existe, actualizarla en la base de datos
                return res.status(200).json(movie);       //Enviar la pelicula atualizada por headers
            }
            return res.status(404).send("Film not found");  //Si la pelicula no existe, enviar mensaje de error
        }
        return res.send("Incorrect parameters");    //Si los datos enviados por body son incorrectos, enviar el mensaje de error
    }
    catch(err) {
        res.send(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;     //Definir el id por params
        let film =  await Film.findOne({where:{episode_id:id}});    //Traer pelicula de la base de datos

        if(film){
            await Film.destroy({where:{episode_id:id}});    //Si la pelicula existe, eliminarla de la base de datos
            return res.status(200).json("Film deleted successfully");   //Enviar el mensaje de eliminación 
        }
        return res.status(404).send("Film not found");      //Si la pelicula no existe, enviar el mensaje de error
    }catch(err) {
        res.send(err);
    }
})

module.exports = router;