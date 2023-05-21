const express = require("express")
const router= express.Router()
const adminController=require("../controller/hastane.controller")
const {verifyTokenAndHastane} = require ("../utils/verifyToken.js");
const hastaneController = require("../controller/hastane.controller");

//aa
router.get("/docktors", verifyTokenAndHastane,hastaneController.getAlldocktor)
router.get("/kullanıcılar", verifyTokenAndHastane,hastaneController.getAllclients)
router.post("/createclient", verifyTokenAndHastane,hastaneController.createClient)
router.post("/createdocktor", verifyTokenAndHastane,hastaneController.createdocktor)
router.put("/update/:id", verifyTokenAndHastane,adminController.updateusers)
router.post("/createbranches", verifyTokenAndHastane,hastaneController.createbranches)


module.exports=router