const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserService = require("../services/User.Service");

const UserModel = require("../models/User");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  await UserModel.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

    // create new user
    const userData = {firstName: firstName, lastName: lastName, email: email, password: password}
    
    try {
        const newUser = await UserService.createNewUser(userData);
        if (newUser) {
            return res.status(201).json({message: "User created successfully"})
        }
    } catch (err) {
        console.log(err);
        next(err);
    }


};

const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      const user = await UserService.getUserByEmail(email);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // create token
      const tokenPayload ={id: user.id, email: user.email};
  
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: '10m'});
  
      return res.status(200).json({token: token});
  
    } catch (err) {
      next(err);
    }
  };
module.exports = { register, login};
