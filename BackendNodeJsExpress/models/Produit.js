//Ce fichier permet de connecter express de node.js avec mongodb 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ajouter les informations (CRUD) à créer - lire - modifier - supprimer 
const produitSchema = new Schema({
    name: String,
    price: String,
    date: String,
    description: String,
});

module.exports = mongoose.model('Produit', produitSchema);