const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect('mongodb://127.0.0.1:27017/eventbooking', { useNewUrlParser: true })
  .then(() => {
    app.listen((PORT = 5000 || process.env.PORT), () =>
      console.log(`Listening on port ${PORT}`)
    );
  })
  .catch(err => {
    console.log(err);
  });
