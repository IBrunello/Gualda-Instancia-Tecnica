const { Router } = require('express');
const {Starship} = require('../db');

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        let starships = await Starship.findAll();
        return res.status(200).json(starships);
    }catch(err) {
        res.send(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let starship = await Starship.findOne({where:{id: id}});
        if(starship){
        return res.status(200).json(starship);
        }
        return res.status(404).send('Ship not found');
    }catch(err) {
        res.send(err);
    }
})

router.post('/', async(req, res, next) => {
    try {
        let first = await Starship.getAttributes();
        let required = Object.keys(first);
        required.shift();
        let ship = req.body;
        if(!Object.values(ship).includes(null) && required.every((e)=>ship.hasOwnProperty(e))){
            console.log(ship);
            let starship = await Starship.findOne({where:{name: ship.name}});
            if(starship){
                return res.status(200).json("Ship already exists");
            }
            Starship.create(ship);
            return res.status(200).json("Ship created successfully");
        }
        return res.send("Incorrect parameters");
    }catch(err) {
        res.send(err);
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let first = await Starship.getAttributes();
        let required = Object.keys(first);
        required.shift();
        let ship = req.body;
        if(!Object.values(ship).includes(null) && required.every((e)=>ship.hasOwnProperty(e))){
        let starship = await Starship.findOne({where:{id: id}});
        if(starship){
                let updated = await Starship.update(ship,{where:{id:id}});
                return res.status(200).json(updated);
            }
            return res.status(404).send("Ship not found");
        }
        return res.send("Incorrect parameters");
    }catch(err) {
        res.send(err);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let starship =  await Starship.findOne({where:{id:id}});
        if(starship){
            await Starship.destroy({where:{id:id}});
            return res.status(200).json("Ship deleted successfully")
        }
        return res.status(404).send("Ship not found");
    }catch(err) {
        res.send(err);
    }
})

module.exports = router;