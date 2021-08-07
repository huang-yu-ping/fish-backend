const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const Promise = require("bluebird");

const Members = db.membersModel;
const Notes = db.noteModel;




//抓取個人資料
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


/* top */
router.get("/top", async (req, res) => {
    
        const notes = await Notes.findAll({
            order:[["favorite","DESC"]],
            limit:5,
        });
            console.log(notes);
            res.status(200).json({ notes });
    

  });


  module.exports = router;