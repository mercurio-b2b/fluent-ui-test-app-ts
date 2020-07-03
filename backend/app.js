var express = require('express');
var cors = require('cors');
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("./app/routes/user.routes.js")(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});