const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { events } = require("./merge");

module.exports = {
  users: async () => {
    try {
      const users = await User.find().populate("createdEvents");
      return users.map(user => {
        return {
          ...user._doc,
          createdEvents: events.bind(this, user._doc.createdEvents)
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await newUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
