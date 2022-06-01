const express = require('express');
const router = express.Router();
const service = require("../service/CoachService.js")


// Create

router.post("/coaches", (req, res) => {
    
    let newCoacher = service.AddCoacher(req.body);
    res.status(200).send(newCoacher);
});


// Read All
router.get("/coaches", (req, res) => {
    const lista = service.GetAllcoaches();
    if ((lista != undefined) && (lista.length != 0))
        res.status(200).send(lista);                     
    else
        res.status(204).send("No coaches found");              
});

// Update
router.put("/coaches/:id", (req, res) => {        

    let id = req.params.id;               
    nume = req.body.name;
    imagine = req.body.img;

    let ok = service.Update(id,nume,imagine);
    if(ok==true)
        res.status(200).send("Update success");
    else
        res.status(204).send("Update failed");
    
});

// Delete
router.delete("/coaches/:id", (req, res) => {

    let id = req.params.id;
    let ok = service.Delete(id);
    if(ok==true)
        res.status(200).send("Coacher deleted");
    else
        res.status(204).send("Coacher not found");

});




module.exports=router;