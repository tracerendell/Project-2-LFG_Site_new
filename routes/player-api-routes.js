var db = require("../models");

module.exports = function(app) {
    app.get("/api/players", function(req, res) {

        db.Player.findAll({
            include: [db.Group]
        }).then(function(dbPlayer) {
            res.json(dbPlayer);
        });
    });

    app.get("/api/players/:id", function(req, res) {

        db.Player.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Group]
        }).then(function(dbPlayer) {
            res.json(dbPlayer);
        });
    });

    app.post("/api/players", function(req, res) {
        db.Player.create(req.body).then(function(dbPlayer) {
            res.json(dbPlayer);
        });
    });

    app.delete("/api/players/:id", function(req, res) {
        db.Player.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbPlayer) {
            res.json(dbPlayer);
        });
    });

};