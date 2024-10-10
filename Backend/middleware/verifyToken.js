
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers['authorization'];
  console.log('authHeader: ', authHeader);
  // Check if the header exists and starts with "Bearer"
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract the token (everything after "Bearer ")
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, tokenVerified) => {
      if (err) {
        // If the token is invalid or expired
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      // If the token is valid, save the decoded token info to the request object
      req.userTokenData = tokenVerified;
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    // If no token is provided in the header
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }
};


module.exports = verifyToken;