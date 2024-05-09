function globalMiddleware(req, res, next) {
    return (req, res, next) => {
      try {
        //sanity check
        // if (req.body.name) {
        //   //remove quotes
        //   req.body.name = req.body.name.replace(/:/g, "");
        // }
  
        for (const key in req.body) {
          if (req.body[key]) {
            req.body[key] = req.body[key].replace(/:/g, "");
          }
        }
  
        next();
      } catch (error) {
        res.json({
          message: error.message,
        });
      }
    };
  }
  
  module.exports = globalMiddleware;