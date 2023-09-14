const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const produitRoutes = require('./routes/produit.routes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/produits');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

app.use('/produits', produitRoutes);

app.use((req, res) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .status(StatusCodes.NOT_FOUND).send('Page non trouvé');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Erreur interne du serveur");

})

app.listen(8080, () => {
    console.log('Application lancée sur le port 8080');
});

