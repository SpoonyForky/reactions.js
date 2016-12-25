const path = require('path');
const config = require(path.join(__dirname, 'config.json'));

module.exports = function (sequelize, DataTypes) {
    var EmojiType = sequelize.define("EmojiType", {
        Name: {
            type: DataTypes.STRING,
            field: 'name'
        }
    }, {
            underscored: true,
            timestamps: false,
            charset: config.Charset,
            collate: config.Collate,
            tableName: 'emoji_types',
            classMethods: {
                associate: function (models) {
                    EmojiType.hasMany(models.Emoji, {
                        underscored: true,
                        timestamps: false,
                    });
                }
            }
        });

    return EmojiType;
};