const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        'id',
        'title',
        'text',
        'user_id',
        'date_created',
        [sequelize.fn('COUNT', sequelize.col('comments.id')), 'comment_count'],
      ],
      group: ['post.id', 'user.id'],
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          attributes: [],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'title',
        'text',
        'user_id',
        'date_created',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
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
