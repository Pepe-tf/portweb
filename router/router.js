const express = require('express');
const router = express.Router();

// Error route
router.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the console

  // Render the error page
  res.status(500).render('error', { message: 'Something went wrong!' });
});

// Define a route that renders the home page
router.get('/', (req, res) => {
  console.log(`${req.logMessage} 🏠 Home page requested`);
  res.render('index');
});

// Define a route that renders the about page
router.get('/about', (req, res) => {
  console.log(`${req.logMessage} 📖 About page requested`);
  res.render('about');
});

// Redirect from /elina to the home page
router.get('/elina', (req, res) => {
  console.log(`${req.logMessage} 🔄 Redirecting to the home page from /elina`);
  res.redirect('/');
});

// Redirect from /elina to the home page
router.get('/bots', (req, res) => {
  console.log(`${req.logMessage} 🤖 Bots page requested`);
  res.render('bots');
});

// Define a route that renders the blog page
router.get('/blog', (req, res) => {
  console.log(`${req.logMessage} 📝 Blog page requested`);
  res.render('blog');
});

// Redirect from /contact to the home page
router.get('/contact', (req, res) => {
  console.log(`${req.logMessage} 🔄 Redirecting to the home page from /contact`);
  res.redirect('/');
});

// Define a route that renders the cat page
router.get('/cat', (req, res) => {
  console.log(`${req.logMessage} 😺 Cat page requested`);
  res.render('cat');
});

module.exports = router;
