const path = require('path');
const config = require(path.join(__dirname, 'config.json'));

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        Name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        Email: {
            type: DataTypes.STRING,
            field: 'email'
        },
    }, {
            underscored: true,
            timestamps: false,
            charset: config.Charset,
            collate: config.Collate,
            tableName: 'users',
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Emoji, {
                        underscored: true,
                        timestamps: false,
                    });
                    User.hasMany(models.Keyword, {
                        underscored: true,
                        timestamps: false,
                    });
                }
            }
        });

    return User;
};