const validateUser = (req, res, next) => {
    console.log(req.user.email);
    
 
    if (req.user.email !== req.query.username) {
        return res.status(401).json({ error: "Unauthorized" });        
    }
    next();
};

module.exports = validateUser;