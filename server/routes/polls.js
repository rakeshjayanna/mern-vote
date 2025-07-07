const express = require('express');
const Poll = require('../models/Poll');
const { verifyToken, requireAdmin } = require('../middleware/adminAuth');
const router = express.Router();

// @route   GET /api/polls
// @desc    Get all polls (Public access for viewing)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: polls
    });
  } catch (error) {
    console.error('Get polls error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching polls'
    });
  }
});

// GET /api/polls/summary
router.get("/summary", async (req, res) => {
  try {
    const polls = await Poll.find(); // Fetch all candidate polls
    const summary = {};

    polls.forEach((poll) => {
      const candidate = poll.question; // candidate name is stored as the question
      const votes = poll.options[0]?.votes || 0; // only one candidate option

      summary[candidate] = (summary[candidate] || 0) + votes;
    });

    const result = Object.entries(summary).map(([candidate, votes]) => ({
      candidate,
      votes,
    }));

    res.json(result);
  } catch (err) {
    console.error("Summary route error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});



// @route   GET /api/polls/:id
// @desc    Get single poll
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found'
      });
    }

    res.json({
      success: true,
      data: poll
    });
  } catch (error) {
    console.error('Get poll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching poll'
    });
  }
});

// @route   POST /api/polls
// @desc    Create new poll (ADMIN ONLY)
// @access  Private (Admin)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { question, options } = req.body;

    // Validation
    if (!question || !options || !Array.isArray(options) || options.length !== 1) {
  return res.status(400).json({
    success: false,
    message: 'Only one candidate allowed per poll'
  });
}


    // Create poll options with vote count
    const pollOptions = options.map(option => ({
      text: option.trim(),
      votes: 0
    }));

    const newPoll = new Poll({
      question: question.trim(),
      options: pollOptions,
      createdBy: req.user._id
    });

    await newPoll.save();
    await newPoll.populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Poll created successfully',
      data: newPoll
    });

  } catch (error) {
    console.error('Create poll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating poll'
    });
  }
});

// @route   PUT /api/polls/:id
// @desc    Update poll (ADMIN ONLY)
// @access  Private (Admin)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { question, options } = req.body;

    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found'
      });
    }

    // Update poll
    if (question) poll.question = question.trim();
    if (options && Array.isArray(options) && options.length >= 2) {
      poll.options = options.map(option => ({
        text: option.trim(),
        votes: 0 // Reset votes when updating options
      }));
    }

    poll.updatedAt = new Date();
    await poll.save();
    await poll.populate('createdBy', 'username');

    res.json({
      success: true,
      message: 'Poll updated successfully',
      data: poll
    });

  } catch (error) {
    console.error('Update poll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating poll'
    });
  }
});

// @route   DELETE /api/polls/:id
// @desc    Delete poll (ADMIN ONLY)
// @access  Private (Admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({
        success: false,
        message: 'Poll not found'
      });
    }

    await Poll.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Poll deleted successfully'
    });

  } catch (error) {
    console.error('Delete poll error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting poll'
    });
  }
});


    


// @route   POST /api/polls/:id/vote
// @desc    Vote on a poll (Public access)
// @access  Public
router.post('/:id/vote', verifyToken, async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const pollId = req.params.id;
    const userId = req.user._id;

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }

    const hasVotedAnywhere = await Poll.findOne({ votedUsers: userId });
if (hasVotedAnywhere) {
  return res.status(403).json({ success: false, message: 'You have already voted' });
}

    if (
      typeof optionIndex !== 'number' ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({ success: false, message: 'Invalid option index' });
    }

    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    poll.votedUsers.push(userId);

    await poll.save();
    await poll.populate('createdBy', 'username');

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: poll
    });

  } catch (err) {
    console.error('Vote error:', err);
    res.status(500).json({ success: false, message: 'Server error while voting' });
  }
});




module.exports = router;