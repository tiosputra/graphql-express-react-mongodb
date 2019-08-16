const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        schema {
            query:
            mutation: 
        }
    `),
    rootValue: {}
  })
);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
