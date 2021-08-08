const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const Promise = require("bluebird");

const Members = db.membersModel;
const Notes = db.noteModel;
const Board = db.boardModel;




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


/* board load */


router.get("/boardview/:noteId", async (req, res) => {
    try{
        Board.belongsTo(Notes,{
            targetKey:"id",
            foreignKey:"note_id",
        });
        const board = await Board.findAll(
            {
                where: { note_id: req.params.noteId },
                include:[
                    {
                        model:Notes,
                        attributes:["id"],
                    }
                ]
                // raw:true,
            }
            );
            console.log(board);
            res.status(200).json({ board });
    }
    catch(err){
        console.log(err);
    }
    

  });

  /* board upload */

  router.post("/boardUpload/:noteId" ,async(req,res)=>{

    try{
        console.log(req.body);
        const board = await Board.create({
            note_id:req.params.noteId,
            board_usename:req.body.board_usename,
            board_content:req.body.board_content,
        });
            res.status(201).json();

    }
    catch(err){
        console.log(err);
    }
    
});








module.exports = router;