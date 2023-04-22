const { Router } = require('express');
const {Planet} = require('../db');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        let planets = await Planet.findAll();
        return res.status(200).json(planets);
    }catch(err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let planet = await Planet.findOne({where:{id: id}});
        if(planet){
        return res.status(200).json(planet);
        }
        return res.status(404).send('Planet not found');
    }catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        let first = await Planet.getAttributes();
        let required = Object.keys(first);
        required.shift();
        let body = req.body;
        if(!Object.values(body).includes(null) && required.every((e)=>body.hasOwnProperty(e))){
        let planet = await Planet.findOne({where:{id: body.id}});
        if(planet){
            return res.status(200).json("Planet already exists");
        }
            Planet.create(body);
            return res.status(200).json("Planet created successfully");
        }
        return res.send("Incorrect parameters");
    }catch(err) {
        res.send(err);
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let first = await Planet.getAttributes();
        let required = Object.keys(first);
        required.shift();
        let body = req.body;
        if(!Object.values(body).includes(null) && required.every((e)=>body.hasOwnProperty(e))){
        let planet = await Planet.findOne({where:{id: id}});
        if(planet){
                let updated = await Planet.update(body,{where:{id:id}});
                return res.status(200).json(body);
            }
            return res.status(404).send("Planet not found");
        }
        return res.send("Incorrect parameters");
    }catch(err) {
        res.send(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let planet =  await Planet.findOne({where:{id:id}});
        if(planet){
            await Planet.destroy({where:{id:id}});
            return res.status(200).json("Planet deleted successfully")
        }
        return res.status(404).send("Planet not found");
    }catch(err) {
        res.send(err);
    }
})

module.exports = router;