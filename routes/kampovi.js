var express = require("express")
var router = express.Router(); 
var Kamp = require("../models/kampovi");
var middleware = require("../middleware")//ako zahtevate ime direktorijuma koji sadrzi index.js

//=======================================================prikazivanje svih kampova root
router.get("/", function(req, res){
    //izvuci sve kampove iz baze podataka !!!!!!   
    Kamp.find({}, function(err, sviKampovi){
         if (err){
              console.log("Doslo je do GRESKE!!!!!");
         } else {
            res.render("kampovi/kampovi", {lokacije: sviKampovi });
         }
    })
 })
//prikazi FORMU NOVIH ZA UNOS NOVIH KAMPOVA
router.get("/nov",middleware.jeUlogovan, function(req, res){
    res.render("kampovi/novi.ejs")
})
///stvaranje novih kampova
router.post("/", middleware.jeUlogovan, function(req,res){
    var imeKampa = req.body.imeKampa;
    var cenaKampa = req.body.cenaKampa;
    var urlSlike = req.body.urlSlike;
    var opisKampa = req.body.opisKampa;
    var autor = {
        id: req.user._id,
        username: req.user.username
    }
    var noviObjekat = {
        ime: imeKampa,
        cena: cenaKampa,
        slika: urlSlike,
        opis: opisKampa,
        autor: autor
    }

    Kamp.create(noviObjekat, function(err, kamp){
         if (err){
              console.log("Greska prilikom upisa")
         } else { 
             console.log("Uspesno upisano u bazu")
             console.log(imeKampa)
             console.log(urlSlike)
             console.log(opisKampa)
             console.log(req.user.username)
             res.redirect("/kampovi")
         }
    })
})
//prikazi informacije o jednom kampu
router.get("/:id", function(req, res){
    Kamp.findById(req.params.id).populate("komentars").exec(function(err, nadjen){
        if (err){
             console.log("GRESKA PRI ID-u");
        } else {
             console.log(nadjen);
             res.render("kampovi/show", {slanina: nadjen});
        }
    })
})
//editovanje kampova
router.get("/:id/edit", middleware.proveriVlasnistvo,  function(req, res){
     Kamp.findById(req.params.id, function(err, kampomat){
          res.render("kampovi/edit", {edit: kampomat})
     });
});

//update-ovanje kampov
router.put("/:id", middleware.proveriVlasnistvo, function(req, res){
    var imeKampaPut = req.body.ime_kampa;
    var cenaKampaPut = req.body.cena_kampa;
    var urlSlikePut = req.body.url_slike;
    var opisKampaPut = req.body.opis_kampa
    var autorPut = {
         id: req.user._id,
         username: req.user.username
    }
    var noviObjekatPut = {
         ime: imeKampaPut,
         cena: cenaKampaPut,
         slika: urlSlikePut,
         opis: opisKampaPut,
         autor: autorPut
    }
    Kamp.findByIdAndUpdate(req.params.id, noviObjekatPut, function(err, upd){
        if (err){
            res.redirect("/kampovi")
        } else {
            res.redirect("/kampovi/" + req.params.id);
        }
    })
})
//brisanje komentara+++++++++++++++++++++++++++++++++++=
router.delete("/:id", middleware.proveriVlasnistvo, function(req, res){
    Kamp.findByIdAndRemove(req.params.id, function(err, brisanje){
         if (err){
              res.redirect("/kampovi");
         } else{
              res.redirect("/kampovi")
         }
    })
})



module.exports = router;
