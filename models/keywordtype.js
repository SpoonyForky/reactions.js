module.exports = function (sequelize, DataTypes) {
    var KeywordType = sequelize.define("KeywordType", {
        Name: {
            type: DataTypes.STRING,
            field: 'name'
        }
    }, {
            underscored: true,
            timestamps: false,
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