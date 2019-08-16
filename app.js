const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const data = args.eventInput;
        const event = {
          _id: Math.random().toString(),
          title: data.title,
          description: data.description,
          price: data.price,
          date: data.date
        };

        events.push(event);

        return event;
      }
    },
    graphiql: true
  })
);

app.listen((PORT = 5000 || process.env.PORT), () =>
  console.log(`Listening on port ${PORT}`)
);
