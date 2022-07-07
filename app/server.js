const config = require('./helper/config');
const router =require('./services/route');
const errorHandler = require('./helper/error-handler');
const tablesExist = require('./services/application').tablesExist;

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.get('/', (req, res) => {
  res.send('Welcome to Airtribe');
});

const PORT = process.env.NODE_DOCKER_PORT || config.server.port;

app.listen(config.server.port, config.server.host, function(){
  console.log(`Running on http://${config.server.host}:${PORT}}`);
  tablesExist();
  console.log("Table check done");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", router);

app.use(errorHandler);