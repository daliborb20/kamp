var mongoose = require("mongoose");
var pasportLocalMongoose = require("passport-local-mongoose")
var KorisnickaSema = new mongoose.Schema({
    username: String,
    password: String
})

KorisnickaSema.plugin(pasportLocalMongoose)//dodaje odredjene metode korisniku
module.exports = mongoose.model("Korisnik", KorisnickaSema);