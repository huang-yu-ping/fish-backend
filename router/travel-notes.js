const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const Promise = require("bluebird");

const Members = db.membersModel;
const Notes = db.noteModel;




/* list */
router.get("/", async (req, res) => {
    try{
        Notes.belongsTo(Members,{
            targetKey:"id",
            foreignKey:"member_id",
        });
        const notes = await Notes.findAll(
            // { where: { id: req.member.id } }
            {
                include:[
                    {
                        model:Members,
                        attributes:["name"],
                    }
                ]
                // raw:true,
            }
            );
            console.log(notes);
            res.status(200).json({ notes });
    }
    catch(err){
        console.log(err);
    }

  });


/* top rank */
router.get("/top", async (req, res) => {
    
        const notes = await Notes.findAll({
            order:[["favorite","DESC"]],
            limit:5,
        });
            console.log(notes);
            res.status(200).json({ notes });
    

  });




  /* Single show */

  router.get("/single/:noteId", async (req, res) => {
    try{
        Notes.belongsTo(Members,{
            targetKey:"id",
            foreignKey:"member_id",
        });
        const notes = await Notes.findOne(
            {
                where: { id: req.params.noteId },
                include:[
                    {
                        model:Members,
                        attributes:["name","image"],
                    }
                ]
                // raw:true,
            }
            );
            console.log(notes);
            res.status(200).json({ notes });
    }
    catch(err){
        console.log(err);
    }

  });


/* note upload */

router.post("/upload",auth,async(req,res)=>{

    try{
        console.log(req.body);
        const notes = await Notes.create({
            member_id:req.member.id,
            note_name:req.body.note_name,
            note_content:req.body.note_content,
        });
            // console.log(notes);
            res.status(201).json();

    }
    catch(err){
        console.log(err);
    }
    
});













module.exports = router;