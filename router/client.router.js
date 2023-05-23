const express = require("express")
const router= express.Router()
const clientController=require("../controller/client.controller")
const {verifyTokenAndClient} = require ("../utils/verifyToken.js");
//aa


router.get("/doktorlarim",verifyTokenAndClient,clientController.doktorlarım)
router.get("/mesajlarim",verifyTokenAndClient,clientController.mesajlarim)
router.post("/mesajgonder",verifyTokenAndClient,clientController.mesaj_gonder)
router.post("/doktorayorumyap",verifyTokenAndClient,clientController.doktorayorumyap)

module.exports=router