const express = require('express');
const router = express.Router();
const {createBrand,getBrands} = require("../controllers/brandcontroller");

router.post('/add', createBrand);
router.get('/', getBrands);

module.exports = router;
