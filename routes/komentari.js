var express = require("express");
var router = express.Router({mergeParams: true});
var Kamp  = require("../models/kampovi");
var Komentar = require("../models/komentar");
var middleware = require("../middleware")//ako zahtevate ime direktorijuma koji sadrzi index.js

//unos novog komentara
router.get("/nov",middleware.jeUlogovan, function(req, res){
    if(req.isAuthenticated()){
        
         
    } else {
        console.log("MOrate biti ulogovani")
        res.send("MORate biti ulogovani")
    }
    Kamp.findById(req.params.id,function(err,kampovi){
         if (err){
              console.log("GRESKA NOVI")
         } else {
              res.render("komentari/nov", {kampovi:kampovi})
         }
    })
})
//upis komentara u bazu
router.post("/", middleware.jeUlogovan,  function(req,res){
     Kamp.findById(req.params.id,function(err, kampovi){
          if (err){
               console.log("ERR");
               res.redirect("/kampovi");
          } else {
              Komentar.create(req.body.komentar, function(err, komentarus){
                   if(err){
                        req.flash("Error", "Greska prilikom upisa u bazu")
                        console.log("Greska Komentarus");
                   }else{
                        komentarus.autor.id = req.user._id;
                        komentarus.autor.username = req.user.username;
                        komentarus.save()
                        kampovi.komentars.push(komentarus);
                        kampovi.save()
                        req.flash("Success", "Uspesno stvoren komentar");
                        res.redirect("/kampovi/" + kampovi._id);
                      
                   }
              })
          }
     })
})

//forma za editovanje komentara
router.get("/:komentar_id/edit", middleware.proveriVlasnistvoKomentara, function(req, res){
    //u sledecoj liniji id je iz ^linije
    Komentar.findById(req.params.komentar_id, function(err, nadjenKomentarus){
         if(err) {
              res.redirect("back")
         } else{  
              res.render("komentari/edit", {kampovi_id: req.params.id, komm: nadjenKomentarus});

    }
   })
})
//komentari update ruta --- put
router.put("/:komentar_id", middleware.proveriVlasnistvoKomentara,function(req, res){
    Komentar.findByIdAndUpdate(req.params.komentar_id, req.body.komentar, function(greska, updKomentar){
         if (greska){
              res.redirect("back");
         } else{
              res.redirect("/kampovi/" + req.params.id);
         }
    })
})

//brisanje komentara
router.delete("/:komentar_id", middleware.proveriVlasnistvoKomentara, function(req, res){
    Komentar.findByIdAndDelete(req.params.komentar_id, function(err){
         if (err){
             res.redirect("back")
         } else {
              req.flash("Success", "Komentar uspesno obrisan")
              res.redirect("/kampovi/" + req.params.id)
         }
    })
})

module.exports = router;
