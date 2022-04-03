const express = require("express");

const Allapp = require("../models/allapp.model");

const router = express.Router();

router.post("", async(req,res)=>{
    try {

        const allapp = await Allapp.create(req.body);
        // const user = await User.create(req.body);

        return res.status(200).send(allapp);
        
    } catch (err) {
        console.log("error is : ", err);

        return res.status(500).json(err.massage);
    }
})


//---------------------------get all allapps----------------------------------------//

router.get("", async(req,res)=>{
    try {

        const allapp = await Allapp.find().lean().exec();
        // const user = await User.create(req.body);

        return res.status(200).send(allapp);
        
    } catch (err) {
        console.log("error is : ", err);

        return res.status(500).json(err.massage);
    }
})

module.exports = router;