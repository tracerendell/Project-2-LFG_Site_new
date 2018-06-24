//routes for groupList db

//dependencies
var db = require("../models");

//routes

module.exports = function (app) {

    //get all Groups
    app.get("/api/groupList", function (req, res) {
        var query = {};
        if (req.query.player_id) {
            query.PlayerId = req.query.player_id;
        }

        db.Group.findAll({
            where: query,
            include: [db.Player]
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    //GET route to retrieve single group
    app.get("/api/groupList/:id", function (req, res) {

        db.Post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Player]
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    //POST route to save new groups
    app.post("/api/groupList", function (req, res) {
        db.Group.create({
            name: req.body.name,
            platform: req.body.platform,
            game_playing: req.body.game_playing,
            profileId: req.user.id
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    //Delete route
    app.delete("/api/groupList/:id", function (req, res) {
        db.Group.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    //PUT route to update groups
    app.put("/api/groupList", function (req, res) {
        db.Group.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });


};