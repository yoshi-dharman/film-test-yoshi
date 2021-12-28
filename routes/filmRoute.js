const express = require("express");
const router = express.Router();

const { 
    getFilm, 
    searchFilm, 
    addFilm, 
    deleteFilm 
} = require('../controllers/filmControllers');

router.get("/film", getFilm);
router.get("/film/:key", searchFilm);
router.post("/film/", addFilm);
router.delete("/film", deleteFilm);

module.exports = router