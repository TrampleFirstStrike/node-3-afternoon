const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

//This is your Middleware!
const checkforSession = require('./middlewares/checkForSession');

//These are your Controllers!
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use( bodyParser.json() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
 }));
 app.use( checkforSession );
 app.use( express.static( `${__dirname}/build` ) );

 //This is Swag
 app.get('/api/swag', swag_controller.read);

 //Authorizations
 app.post( '/api/login', auth_controller.login );
 app.post( '/api/register', auth_controller.register );
 app.post( '/api/signout', auth_controller.signout );
 app.get( '/api/user', auth_controller.getUser );

//Cart Shit
app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart/checkout', cart_controller.checkout );
app.delete('/api/cart', cart_controller.delete );

//Search Shit
app.get( '/api/search', search_controller.search );

 const port = process.env.PORT || 3000;
 app.listen( port, () => { console.log(`server listening on port ${port}.`); } );