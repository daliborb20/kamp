var mongoose = require("mongoose");
var Kamp = require("./models/kampovi.js");
var Komentar = require("./models/komentar.js"); 
var podaci = [
    {ime:'Ljubovijska regata', slika:'http://www.turistickaorganizacijaljubovija.rs/drinskaRegata/17.jpg', opis:'Ovo je prica o nama, nase lsike stare'},
    {ime:'Ljubovijska regata 2', slika:'http://www.manifestacije.com/krojacpanel/php/class/myphp/myImage.class.php?ID=195', opis:'Onaj peder is from seria'},
    {ime:'Ljubovijska regata 3', slika: 'https://i.ytimg.com/vi/dFfShum5y8Y/maxresdefault.jpg', opis:'S ovom cu da plasim svoju decu'}
]

//==================funkcija seeed===================
function seedDB(){
     Kamp.remove({}, function(err){
        if(err){
         console.log("Greska prlikom brisanja")
      }else{
           console.log("Baza obrisana ")
          //=====================================dodavanje novih kampova======================
           podaci.forEach(function(seed){
                     Kamp.create(seed, function(err,data){
                          if(err){
                               console.log("Greska");
                          }else{
                               console.log("Uspesno seedovano");
                               Komentar.create({
                                    tekst: 'Budvanska revijera',
                                    autor: 'Homer, Homer Simpson'
                               }, function(err, koment){
                                   if(err){
                                        console.log("Greska prilikom stvaranja komentara");
                                   }else{
                                        data.komentars.push(koment);
                                        data.save();
                                        console.log("Komentar uspesno stvoren");
                                   }
                               })
                          }
                     })
                         
                })
               

      }
    })
    }
module.exports = seedDB;
