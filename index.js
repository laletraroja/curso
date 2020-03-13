const express = require ('express');
const mongoose = require ('mongoose');
require ('./models/User');//este require va antes delde passport o da error!!
require ('./services/passport');  //No le asigna nada porque no devuelve nada
require ('./models/Survey');
const cookieSession = require ('cookie-session');
const passport = require ('passport');
const keys = require ('./config/keys');
const bodyParser = require("body-parser");
// 1 const authRoutes = require ('./rotes/authRoutes');

mongoose.connect(keys.mongoURI);
const app = express();
app.use (bodyParser.json());
app.use (
  cookieSession ({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use (passport.initialize());
app.use (passport.session());

// 2 authRoutes(app);
require ('./routes/authRoutes')(app);  //3!!!
require ('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  //express servirá production assests main.js or main.css

  app.use (express.static('client/build'));

  //express servirá servirá index.html si no reconoce la ruta
  const path = require('path');
  app.get('*', (req,res)=> {
    res.sendFile (path.resolve(__dirname,'client','build','index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen (PORT);
