const { Router } = require('express');
const films = require('./films');
const planets = require('./planets');
const starships = require('./starships');

const router = Router();

router.use('/films', films);
router.use('/planets', planets);
router.use('/starships', starships);

module.exports = router;