const express = require('express');
const router = express.Router();
const app = require("./application");

// POST - create course
router.post('/course', async function(req, res, next) {
    try {
      res.json(await app.createCourse(req.body));
    } catch (err) {
      console.error(`Error while creating course `, err.message);
      next(err);
    }
  });

// UPDATE course details
router.put('/course/:id', async function(req, res, next) {
  try {
    res.json(await app.updateCourse(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating course `, err.message);
    next(err);
  }
});

// POST - create lead
router.post('/lead', async function(req, res, next) {
  try {
    res.json(await app.createLead(req.body));
  } catch (err) {
    console.error(`Error while creating lead `, err.message);
    next(err);
  }
});

// UPDATE lead status
router.put('/lead/:id', async function(req, res, next) {
  try {
      var stat=req.body.status;
      if (!(leadStatus.includes(stat))){
          res.status(400).json({ error: 'Invalid status' });
      } else {
          res.json(await app.updateLeadStatus(req.params.id, stat));
      }
  } catch (err) {
    console.error(`Error while updating lead status `, err.message);
    next(err);
  }
});

// Search lead info
router.post('/search/', async function(req,res,next){
    try{
        res.json(await app.searchLead(req.params));
    }
    catch (err) {
        console.error(`Error while fetching lead `, err.message);
        next(err);
      }
});

// ADD lead comment
router.put('/lead/:id', async function(req, res, next) {
    try {
        const comment=req.body.comments;
        if (!(comment)){
            res.status(400).json({ error: 'Comments missing' });
        } else {
            res.json(await app.updateLeadComment(req.params.id, comment));
        }
    } catch (err) {
      console.error(`Error while adding lead comment `, err.message);
      next(err);
    }
});

module.exports=router;