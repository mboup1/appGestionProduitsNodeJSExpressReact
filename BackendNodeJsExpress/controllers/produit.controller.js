const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const Produit = require('../models/Produit');
const catchAsync = require('../helpers/catchAsync');

//Créer un produit
const create = async (req, res) => {
    const produit = await Produit.create(req.body);
    res.send(produit);

};

// Récuperer tous les produits
const getAll = catchAsync( async (req, res) => {
    const produits = await Produit.find();
    res.send(produits);
});

// Récuperer un produit
const getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        new mongoose.Types.ObjectId(id);
        
    } catch (e) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send("Format de l'ID invalide"); 
    }
    
    const produit = await Produit.findById(req.params.id);
    if (produit) {
        res.send(produit)
    } else {
        res.status(StatusCodes.NOT_FOUND)
            .send("Produit introuvable")        
    };
});

//Mettre a jour un document
const updateById = catchAsync( async (req, res) => {
    
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body);

    if (produit) {
        res.send(produit)
    } else {
        res.status(StatusCodes.NOT_FOUND)
            .send("Produit introuvable")
    };
});


//Supprimer produit:
const deleteById = catchAsync( async (req, res) => {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (produit) {
        res.send(produit)
    } else {
        res.status(StatusCodes.NOT_FOUND)
            .send("Produit introuvable")
    };
});


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,

};