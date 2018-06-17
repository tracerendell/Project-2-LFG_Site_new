// server.js file is initial starting point for Node server

//dependencies
var express = require("express");
var bodyParser = require("body-parser");

//set up express
var app = express();
var PORT = process.env.PORT || 8080;

//require models for syncing
var db = require("./models");

//parsing stuff
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.use(express.static("public"));
//routes
require("./routes/html-routes.js")(app);
require("./routes/player-api-routes.js")(app);
require("./routes/session-api-routes")(app);

//sync models and start express app
db.sequelize.sync({})
.then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});