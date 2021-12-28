const express = require('express');
const app = express();
const nopedb = require("nope.db");
const db = new nopedb({
    path: "./db/dummy.json",
    seperator: ".",
    spaces: 2
});

module.exports = {
    getFilm : (req, res) => {
        let film = db.get('data');
        return res.json({
            message : "Success GET Film",
            data : film
        })
    },

    searchFilm : (req, res) => {
        const key = req.params.key;

        let film = db.get('data');

        let newData = film.filter(item => {
            if(key === ""){
                return item;
            } else if(item.title.toLowerCase().includes(key.toLowerCase())){
                return item;
            } return null;
        })
        
        console.log(newData);

        return res.json({
            message : "Success Search Film",
            data : newData
        })

    },

    addFilm : (req, res) => {
        db.push('data', req.body);
        let newData = db.get('data')
        return res.json({
            message : "Success Add Film",
            data : newData
        })
    },

    deleteFilm : (req, res) => {
        const deleteData = req.body;
        let film = db.get('data');

        let checkFilm = film.map((item, index) => {
            if(JSON.stringify(item) === JSON.stringify(deleteData)){
                film.splice(index,1)
            }
        })

        if(checkFilm.length === film.length){
            return res.json({
                message : "Nothing To Delete",
                status : "err"
            })
        }

        let newData = db.set('data', film);

        return res.json({
            message : "Success Delete Film",
            data : newData
        })
    },
}