const express = require("express")
const router= express.Router()
const adminController=require("../controller/hastane.controller")
const {verifyTokenAndHastane} = require ("../utils/verifyToken.js");
const hastaneController = require("../controller/hastane.controller");

//aa
router.get("/docktors", verifyTokenAndHastane,hastaneController.getAlldocktor)
router.get("/clients", verifyTokenAndHastane,hastaneController.getAllclients)
router.post("/createclient", verifyTokenAndHastane,hastaneController.createClient)
router.post("/createdocktor", verifyTokenAndHastane,hastaneController.createdocktor)
router.put("/mesajlarim", verifyTokenAndHastane,hastaneController.hastanemesajlarim)
router.post("/mesajgonder", verifyTokenAndHastane,hastaneController.hastane_mesaj_gonder)
router.post("/tummesajlar", verifyTokenAndHastane,hastaneController.hastanetümmesajlar)

module.exports=router