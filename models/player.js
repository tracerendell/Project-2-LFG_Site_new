module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Player", {

        //giving the Player model a name of type STRING
        name: DataTypes.STRING
    });

    Player.associate = function(models) {
        //Associating Player with Games
        //When a Player is deleted, also delete any associated Games
        Player.hasMany(models.Games, {
            onDelete: "cascade"
        });
    };

    return Player;
};