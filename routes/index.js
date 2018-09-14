var express = require("express");
var router = express.Router();
var pasos = require("passport")
var Korisnik = require("../models/korisnik");


//===========================================rute
router.get("/", function(req, res){
    res.render("uzemljenje");
})

router.get("/view", function(req,res){
    res.render("kampovi/prikazi");
})

//====================================registracija==========================================================
router.get("/registracija", function(req,res){
    res.render("registracija")
})
router.post("/registracija", function(req,res){
    Korisnik.register(new Korisnik({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            req.flash("Error", err.message)

            return res.render("registracija")
        }
        pasos.authenticate("local")(req,res, function(){
            req.flash("Success", "Uspesno ste ulogovani")
            res.redirect("/kampovi");
        })
    })
})

//================================================== //login
router.get("/login", function(req,res){
    res.render("login");
})

//midelweare
router.post("/login", pasos.authenticate("local", {
    successRedirect: "/kampovi", failureRedirect:"/login"}), function(req, res){

})
//================================================== //----------------------logout---------------------
router.get("/logout", function(req,res){
    req.logout()
    req.flash("Success", "Izlogovani ste!!!")
    res.redirect("/kampovi")
})

//proverava da li je korisnik ulogovan
function jeUlogovan(req, res, next){
    if (req.isAuthenticated()){

        return next()
    }

    res.redirect("/login")
}

module.exports = router;
