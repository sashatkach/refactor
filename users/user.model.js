module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validated: {
                isAlpha: true,
                len: [1, 255]
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validated: {
                isAlpha: true,
                len: [1, 255]
            }
        },

        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1, 255]
            }
        }
    })
}