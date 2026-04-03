const express = require('express');
const router = express.Router();
const User = require('../models/user');

// create a user
router.post('/', async (req, res) => {
    try {
      const { jobId, jobrole, company, experience, location, salary } = req.body;
      const user = new User({ jobId, jobrole, company, experience, location, salary });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;