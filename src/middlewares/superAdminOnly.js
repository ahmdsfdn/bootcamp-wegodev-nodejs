function superAdminOnly(req, res, next) {
  return (req, res, next) => {
    try {
      if (req.user.role !== "Super Admin") {
        throw new Error("Akses ditolak!");
      }

      next();
    } catch (error) {
      res.json({
        code: 401,
        message: error.message,
      });
    }
  };
}

module.exports = superAdminOnly;
