
require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.SQL_HOST,
        port :  process.env.SQL_PORT,
        user :  process.env.SQL_USER,
        password :  process.env.SQL_PWD,
        database : process.env.SQL_RESTAURANTDB
    }
});


module.exports = { reastaurantModel:knex }