//uspostavljanje varijabli
var express = require("express");
var app = express();
var parser = require("body-parser")
var mungos = require("mongoose");
var pasos = require("passport");
var LocalStrategie = require("passport-local");
var Kamp = require("./models/kampovi.js");
var seedDB = require("./seeds.js");
var Komentar = require("./models/komentar.js");
var Korisnik = require("./models/korisnik")
var overRide = require("method-override");
//========================================iz drugih fajlova===refactoring
var ruteKomentara = require("./routes/komentari");
var ruteKapova = require("./routes/kampovi");
var authRute = require("./routes/index");
var flash = require("connect-flash");


//=============================================brisanje svega iz baze====================
//seedDB();

//povezivanje sa bazom
mungos.connect("mongodb://localhost/kamp")

//ne znam za sta je ovo????  ----  body parser jeste za slanje podataka iz <form>-e
app.use(parser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
console.log(__dirname + "/public")
//korisiti podrazumevani fajl kao ejs
app.set("view engine", "ejs");
//=============================================express sessija===============
app.use(require("express-session")(
     {
         secret: "use i u svoje kljuse",
         resave: false,
         saveUninitialized: false
     }
))
//koriscenje flash modula    
app.use(flash());
//=================================pasos
app.use(pasos.initialize());
app.use(pasos.session());
pasos.use(new LocalStrategie(Korisnik.authenticate()));
pasos.serializeUser(Korisnik.serializeUser());
pasos.deserializeUser(Korisnik.deserializeUser());

app.use(overRide("_method"));
app.use(function(req,res, next){
    res.locals.trenutniKorisnik = req.user;
    res.locals.greska = req.flash("Error");
    res.locals.uspeh = req.flash("Success");
    next()
})
//==========================================upotrebljavanje kreiranih ruta ---refaktorovanih
app.use("/kampovi", ruteKapova)
app.use("/kampovi/:id/komentari", ruteKomentara);
app.use(authRute)

app.listen(4000, function(){
    console.log("YelpServer has started...");
})
