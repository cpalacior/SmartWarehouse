const { Router } = require('express');
const Product = require('../models/models_ai/Product');
const Section = require('../models/models_ai/Section');
const Slot = require('../models/models_ai/Slot');

const router = Router();


const create = async(req,res) => {
    //res.json(req.body)
    const slot = Slot(req.body);
    slot.save()
        .then((data) => res.json(data))
        .catch((err)=> res.send(err));
}

module.exports = {create};