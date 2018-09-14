var mongoose = require("mongoose");

//uspostavljanje seme
var kampSema = new mongoose.Schema({
    ime: String,
    cena: String,
    slika: String,
    opis: String,
    autor: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Korisnik"

        },
        username: String
    },
    komentars:[
         {
              type:mongoose.Schema.Types.ObjectId,
              ref: "Komentar"
         }
    ]
})
//stvaranje modela
module.exports = mongoose.model("Kamp", kampSema);

