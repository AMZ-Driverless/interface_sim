const express = require('express');
const router = express.Router();
const Commit = require('../../models/Commit');

router.post('/', async (req, res) => {
  try {
    const { message, author, commitId } = req.body;

    const existingCommit = await Commit.findOne({ commitId });

    if (!existingCommit) {
      const newCommit = new Commit({
        message,
        author,
        commitId,
      });
      await newCommit.save();
      res.status(201).json({ message: 'Commit saved to MongoDB' });
    } else {
      res.status(200).json({ message: 'Commit already exists in MongoDB' });
    }
  } catch (error) {
    console.error('Error saving commit to MongoDB:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
