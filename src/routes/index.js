const { Router } = require('express');
const films = require('./films');
const planets = require('./planets');
const starships = require('./starships');

const router = Router();    //Defino el router

router.use('/films', films);    //Defino la ruta films
router.use('/planets', planets);    //Defino la ruta planets
router.use('/starships', starships);    //Defino la ruta starships

module.exports = router;    //Exporto el router