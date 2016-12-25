module.exports = function (sequelize, DataTypes) {
    var Keyword = sequelize.define("Keyword", {
        Name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        Regex: {
            type: DataTypes.TEXT,
            field: 'regex'
        }
    }, {
            underscored: true,
            timestamps: false,
            tableName: 'keywords',
            classMethods: {
                associate: function (models) {
                    Keyword.belongsToMany(models.Emoji, {
                        underscored: true,
                        timestamps: false,
                        through: 'keywords_emojis',
                    });
                    Keyword.belongsTo(models.KeywordType, {
                        underscored: true,
                        timestamps: false,
                    });
                    Keyword.belongsTo(models.User, {
                        underscored: true,
                        timestamps: false,
                    });
                }
            }
        });

    return Keyword;
};