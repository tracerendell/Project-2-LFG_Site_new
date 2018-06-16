module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        game_playing: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Session.associate = function(models) {
        //we are saying that a Session should belong to a Player
        //a Session can't be created without a Player due to the foreign key constraint
        Session.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Session;
};