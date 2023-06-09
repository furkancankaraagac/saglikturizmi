const express = require("express")
const router= express.Router()
const docktorController=require("../controller/doctor.controller")
const {verifyTokenAndDoctor} = require ("../utils/verifyToken.js");

//aa

router.post("/hakkimda", verifyTokenAndDoctor,docktorController.getdocktorinfo)
router.post("/hastalarim",verifyTokenAndDoctor, docktorController.getdocktorsclient)
router.post("/updateinfo", verifyTokenAndDoctor,docktorController.updatedocktorinfo)
router.post("/mesajlarim", verifyTokenAndDoctor,docktorController.doktormesajlarim)
router.post("/mesajgonder", verifyTokenAndDoctor,docktorController.docktor_mesaj_gonder)
router.post("/operasyonekle", verifyTokenAndDoctor,docktorController.createdocktoroperations)


module.exports=router