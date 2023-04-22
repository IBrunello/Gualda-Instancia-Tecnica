const server = require('./src/app.js');
const { conn, Film, Planet, Starship } = require('./src/db.js');
const films  = require('./src/data/films.js');
const planets = require('./src/data/planets.js');
const starships  = require('./src/data/starships.js');

conn.sync({ force:true}).then(() => {
  server.listen(3001, () => {
    
    Film.bulkCreate(films);
    Planet.bulkCreate(planets);
    Starship.bulkCreate(starships);

    console.log('Server listening at http://localhost:3001'); // eslint-disable-line no-console
  });
});
