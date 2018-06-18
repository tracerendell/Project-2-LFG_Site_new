// routes to send users to html pages

//dependencies
var path = require("path");

//Routes
module.exports = function(app) {

    //index route loads view.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/sessions.html"));
    });

    //cms route loads cms.html
    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    //sessions route loads sessions.html
    app.get("/sessions", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/sessions.html"));
    });

    //player route loads player-manager.html
    app.get("/players", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/player-manager.html"));
    });

};