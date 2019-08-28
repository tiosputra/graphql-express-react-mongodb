const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("creator");

      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const { title, description, price, date } = args.eventInput;

      const event = new Event({
        title: title,
        description: description,
        price: price,
        date: new Date(date),
        creator: "5d6159cdd66873518b4e4f85"
      });
      let createdEvent;

      const result = await event.save();

      createdEvent = transformEvent(result);

      const creator = await User.findById("5d6159cdd66873518b4e4f85");
      if (!creator) {
        throw new Error("User is not exists.");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
