const usersResolver = require("./users");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");

const rootResolver = {
  ...usersResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;
