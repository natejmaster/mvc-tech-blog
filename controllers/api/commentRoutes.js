const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: ['title'],
        },
      ],
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single comment by ID
router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Post,
            attributes: ['title'],
          },
        ],
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'Comment not found' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;