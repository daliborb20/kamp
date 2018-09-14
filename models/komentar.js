var mongoose = require("mongoose");
var KomentarSema = mongoose.Schema({
     tekst: String,
     autor: {
         id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Korisnik"
         },
         username: String
     }
});

module.exports = mongoose.model("Komentar", KomentarSema);
