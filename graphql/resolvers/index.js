const bcrypt = require('bcrypt');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return { ...event._doc, date: new Date(event._doc.date).toISOString() };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);

    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate('creator');

      return events.map(event => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  users: async () => {
    try {
      const users = await User.find().populate('createdEvents');
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
  createEvent: async args => {
    try {
      const { title, description, price, date } = args.eventInput;

      const event = new Event({
        title: title,
        description: description,
        price: price,
        date: new Date(date),
        creator: '5d5780681d3b5f2540ec2f6d'
      });
      let createdEvent;

      const result = await event.save();

      createdEvent = { ...result._doc, _id: result._doc._id.toString() };

      const creator = await User.findById('5d5780681d3b5f2540ec2f6d');
      if (!creator) {
        throw new Error('User is not exists.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error('User exists already.');
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
