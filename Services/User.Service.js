const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");

async function createNewUser(user) {
  const { firstName, lastName, email, password } = user;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return savedUser;

  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
    try {
        const user = await UserModel.findOne({ email }).exec();
        return user;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createNewUser,
    getUserByEmail

};
