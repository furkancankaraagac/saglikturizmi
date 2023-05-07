const express = require("express")
const router= express.Router()
const adminController=require("../controller/admin.controller")
const {verifyTokenAndDoctor,verifyTokenAndAdmin} = require ("../utils/verifyToken.js");


router.get("/docktors", verifyTokenAndAdmin,adminController.getAlldocktor)
router.get("/clients", verifyTokenAndAdmin,adminController.getAllclients)
router.post("/createclient", verifyTokenAndAdmin,adminController.createClient)
router.post("/createdocktor", verifyTokenAndAdmin,adminController.createdocktor)
router.put("/updatedoctor/:id", verifyTokenAndAdmin,adminController.updateusers)
router.delete("/deletedoctor/:id", verifyTokenAndAdmin,adminController.deleteusers)
router.post("/createhastane", verifyTokenAndAdmin,adminController.createhastane)
router.post("/updatehastane", verifyTokenAndAdmin,adminController.updatehastane)
//router.delete("/deletehastane", verifyTokenAndAdmin,adminController.deletehastane)
router.post("/createbranches", verifyTokenAndAdmin,adminController.createbranches)



module.exports=router