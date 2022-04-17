const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj = {
        title:'vffvvbryvr',
        description:'uyfeyvfuevfute'
    };
    res.json(obj);
})

module.exports = router