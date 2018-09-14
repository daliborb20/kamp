var Komentar = require("../models/komentar")
var Kamp  = require("../models/kampovi");
var midlewareObjekt = {}

midlewareObjekt.proveriVlasnistvo = function(req, res, next){
     if (req.isAuthenticated()){
         Kamp.findById(req.params.id, function(errr, nadjenKamp){
            if (errr){
                req.flash("Greska", "Greska prilikom upisa");

                res.redirect("back");
        } else {
             if (nadjenKamp.autor.id.equals(req.user._id)) {
                 next();
        }
             else {
                 req.flash("Error", "Greska! Nemate autorizaciju!")

                 res.redirect("back")
        }
    }
   })
        
 } else {
     req.flash("Greska", "Morate biti ulogovani!!!!");
     res.redirect("back") 
 }
}


midlewareObjekt.proveriVlasnistvoKomentara = function(req,res, next){
    if (req.isAuthenticated()){
         Komentar.findById(req.params.komentar_id, function(errr, najdenKomentar){
            if (errr){
            res.redirect("back");
        } else {
             if (najdenKomentar.autor.id.equals(req.user._id)) {
                 next();
        }
             else {
                 req.flash("Error", "Morate biti ulogovani!")
                 res.redirect("back")
        }
    }
   })
        
 }  else {
     res.redirect("back") 
 }

}

midlewareObjekt.jeUlogovan = function(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    req.flash("Error", "Morate biti ulogovani")
    res.redirect("/login")
}


module.exports = midlewareObjekt
