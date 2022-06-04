const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const assignOne = require('./routes/assign01');
const swaggerUi = require('swagger-ui-express');
const docRoute = require('./routes/api-docs');
require('dotenv/config');


const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/assign01', assignOne);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docRoute));

mongoose.connect(
  process.env.MONGODB_URI,{ UseNewUrlParser: true },
  () => console.log('connected to DB...')
);

app.listen(port);