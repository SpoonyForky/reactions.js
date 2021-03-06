const path = require('path');
const config = require(path.join(__dirname, 'config.json'));

module.exports = function (sequelize, DataTypes) {
    var Emoji = sequelize.define("Emoji", {
        Name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        Code: {
            type: DataTypes.TEXT,
            field: 'code'
        }
    }, {
            underscored: true,
            timestamps: false,
            charset: config.Charset,
            collate: config.Collate,
            tableName: 'emojis',
            classMethods: {
                associate: function (models) {
                    Emoji.belongsToMany(models.Keyword, {
                        through: 'keywords_emojis',
                        underscored: true,
                        timestamps: false,
                    });
                    Emoji.belongsTo(models.EmojiType, {
                        underscored: true,
                        timestamps: false,
                    });
                    Emoji.belongsTo(models.User, {
                        underscored: true,
                        timestamps: false,
                    });
                }
            }
        });

    return Emoji;
};