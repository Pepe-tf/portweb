// Middleware to detect mobile devices
function isMobileDevice(req, res, next) {
    const userAgent = req.headers['user-agent'];
    if (/android|iphone|ipad|mobile/i.test(userAgent)) {
      res.render('notSupportedForMobile'); // Render notSupportedForMobile.ejs
    } else {
      next(); // Continue to the next middleware/route handler
    }
  }
  
  // Apply the middleware globally (before your routes) or to specific routes
  app.use(isMobileDevice);