const path = require('path');
const config = require(path.join(__dirname, 'config.json'));

module.exports = function (sequelize, DataTypes) {
    var KeywordType = sequelize.define("KeywordType", {
        Name: {
            type: DataTypes.STRING,
            field: 'name'
        }
    }, {
            underscored: true,
            timestamps: false,
            charset: config.Charset,
            collate: config.Collate,
            tableName: 'keyword_types',
            classMethods: {
                associate: function (models) {
                    KeywordType.hasMany(models.Keyword, {
                        underscored: true,
                        timestamps: false,
                    });
                }
            }
        });

    return KeywordType;
};