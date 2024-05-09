function auth(req, res, next) {
    return (req, res, next) => {
      try {
        if (!req.headers.authorization) {
          throw new Error("Token tidak tersedia!");
        }
  
        //token
        const token = req.headers.authorization.split(" ")[1];
  
        if (token == "123") {
          req.user = { id: 1, username: "john_doe", role: "admin" };
        } else if (token == "456") {
          req.user = { id: 2, username: "jane_doe", role: "user" };
        }
  
        next();
      } catch (error) {
        res.json({
          message: error.message,
        });
      }
    };
  }
  
  module.exports = auth;