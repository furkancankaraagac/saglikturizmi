const express = require("express")
const router= express.Router()
const adminController=require("../controller/admin.controller")
const {verifyTokenAndDoctor,verifyTokenAndAdmin} = require ("../utils/verifyToken.js");


router.post("/createhastane", verifyTokenAndAdmin,adminController.createhastane)
router.post("/updatehastane", verifyTokenAndAdmin,adminController.updatehastane)
//router.delete("/deletehastane", verifyTokenAndAdmin,adminController.deletehastane)
router.post("/deletedocktor", verifyTokenAndAdmin,adminController.deletedoctor)



module.exports=router