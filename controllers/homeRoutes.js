const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const formatDate = require('../utils/helpers'); // Import the formatDate helper

// Render the homepage with all posts
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
          attributes: ['text', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      isAuthenticated: req.session.loggedIn,
      formatDate: formatDate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render the single post page
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['text', 'user_id', 'date_created'],
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

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Route for rendering the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch data for the user's dashboard, e.g., their own posts
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id, // Filter by user ID
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['text', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      isAuthenticated: req.session.loggedIn,
      formatDate: formatDate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route for rendering the 404 error page
router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;