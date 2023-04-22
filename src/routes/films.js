const { Router } = require('express');
const {Film} = require('../db');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        let films = await Film.findAll();
        return res.status(200).json(films);
    }catch(err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let film = await Film.findOne({where:{episode_id: id}});
        if(film){
        return res.status(200).json(film);
        }
        return res.status(404).send('Film not found');
    }catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        let first = await Film.getAttributes();
        let required = Object.keys(first);
        required.shift();
        let movie = req.body;
        if(!Object.values(movie).includes(null) && required.every((e)=>movie.hasOwnProperty(e))){
        let film = await Film.findOne({where:{episode_id: movie.episode_id}});
        if(film){
            return res.status(200).json("Film already exists");
        }
            Film.create(movie);
            return res.status(200).json("Film created successfully");
        }
        return res.send("Incorrect parameters");
    }catch(err) {
        res.send(err);
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let first = await Film.getAttributes();
        let required = Object.keys(first);
        required.shift();
        let movie = req.body;
        if(!Object.values(movie).includes(null) && required.every((e)=>movie.hasOwnProperty(e))){
        let film = await Film.findOne({where:{episode_id: id}});
        if(film){
                let updated = await Film.update(movie,{where:{episode_id:id}});
                return res.status(200).json(updated);
            }
            return res.status(404).send("Film not found");
        }
        return res.send("Incorrect parameters");
    }catch(err) {
        res.send(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let film =  await Film.findOne({where:{episode_id:id}});
        if(film){
            await Film.destroy({where:{episode_id:id}});
            return res.status(200).json("Film deleted successfully")
        }
        return res.status(404).send("Film not found");
    }catch(err) {
        res.send(err);
    }
})

module.exports = router;