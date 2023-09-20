const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('comments.id')), 'comment_count'],
          ],
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('comments.id')), 'comment_count'],
          ],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
