/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - username
 *       - passsword
 *       - email
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *   Users:
 *     type: array
 *     items:
 *       $ref: '#/definitions/User'
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      reset_password_token: {
        type: DataTypes.STRING
      },
      reset_password_expires: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: Date.now()
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: Date.now()
      }
    },
    {
      underscored: false,
      timestamps: false
    }
  );
  /*method for fetching user details */
  User.fetchDetails = userId =>
    User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password", "reset_password_token", "reset_password_expires"]
      }
    });
  /*user associatons*/
  User.associate = models => {
    User.hasMany(models.contact);
  };

  return User;
};
