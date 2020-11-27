const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const connectionStrings = require('./config/configValues.js')
const cors = require('cors');
const {getPayload} = require('./config/passport')
const {
    AuthenticationError,
} = require('apollo-server');



var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0,
    useCreateIndex: true
};

mongoose.connect(connectionStrings.mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`GraphQL MongoDB Connection Failed`);
    } else {
        console.log(`GraphQl - MongoDB Connected`);
    }
});




app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const loggingMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next()
  };


app.use(loggingMiddleware)
app.use("/graphql",graphqlHTTP(request => ({
    schema,
    graphiql: true,
    context: {
        headers: request.headers,
        //payload: getPayload((request.headers.authorization && request.headers.authorization.split(' ')[1]) || '')
        payload: {loggedIn: true}
    }
})));


app.listen(3001, ()=>{
    console.log("GraphQL server started on port 3001");
})