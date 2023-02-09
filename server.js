/** @format */

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const app = express();
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Hello world",
    fields: () => {},
  }),
});
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
  })
);

app.listen(5000, () => console.log("server running"));
