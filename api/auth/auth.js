const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    try {
      if (!token) {
        res.status(401).json({
          success: false,
          message: "No token, Authorization denied",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = decoded;
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: "Access denied",
          });
        }
        next();
      }
    } catch (error) {}
  };
};

module.exports = { authMiddleware };
