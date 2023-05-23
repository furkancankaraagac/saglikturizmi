const express = require("express")
const router= express.Router()
const adminController=require("../controller/hastane.controller")
const {verifyTokenAndHastane} = require ("../utils/verifyToken.js");
const hastaneController = require("../controller/hastane.controller");

//aa
router.get("/docktors", verifyTokenAndHastane,hastaneController.getAlldocktor)
router.post("/kullanicilar", verifyTokenAndHastane,hastaneController.getAllclients)
router.post("/createdocktor", verifyTokenAndHastane,hastaneController.createdocktor)
router.put("/updateuser", verifyTokenAndHastane,adminController.updateusers)
router.put("/updatedocktor", verifyTokenAndHastane,adminController.updatedocktors)
router.post("/createbranches", verifyTokenAndHastane,hastaneController.createbranches)
router.put("/updatebranches", verifyTokenAndHastane,hastaneController.updatebranches)
router.post("/branches", verifyTokenAndHastane,hastaneController.gethospitalbranches)
router.put("/updatehastane", verifyTokenAndHastane,hastaneController.updatehastane)


module.exports=router