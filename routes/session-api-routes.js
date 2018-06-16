//routes for sessions db

//dependencies
var db = require("../models");

//routes

module.exports = function (app) {

    //get all Sessions
    app.get("/api/sessions", function (req, res) {
        var query = {};
        if (req.query.player_id) {
            query.PlayerId = req.query.player_id;
        }

        db.Session.findAll({
            where: query,
            include: [db.Player]
        }).then(function (dbSession) {
            res.json(dbSession);
        });
    });

    //GET route to retrieve single Session
    app.get("/api/sessions/:id", function (req, res) {

        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Player]
        }).then(function (dbSession) {
            res.json(dbSession);
        });
    });

    //POST route to save new sessions
    app.post("/api/sessions", function (req, res) {
        db.Session.create(req.body).then(function (dbSession) {
            res.json(dbSession);
        });
    });

    //Delete route
    app.delete("/api/posts/:id", function (req, res) {
        db.Session.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbSession) {
            res.json(dbSession);
        });
    });

    //PUT route to update sessions
    app.put("/api/sessions", function (req, res) {
        db.Session.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbSession) {
            res.json(dbSession);
        });
    });


};