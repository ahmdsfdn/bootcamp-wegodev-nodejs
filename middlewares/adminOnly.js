function adminOnly(req, res, next) {
    return (req, res, next) => {
      try {
        if (req.user.role !== "admin") {
          throw new Error("Akses ditolak!");
        }
  
        next();
      } catch (error) {
        res.json({
          message: error.message,
        });
      }
    };
  }
  
  module.exports = adminOnly;