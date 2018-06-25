
module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
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

    Group.associate = function(models) {
        //we are saying that a Session should belong to a Player
        //a Session can't be created without a Player due to the foreign key constraint
        Group.belongsTo(models.Player, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Group;
};