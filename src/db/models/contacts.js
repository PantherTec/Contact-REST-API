/**
 * @swagger
 * definitions:
 *   Contact:
 *     type: object
 *     required:
 *       - name
 *       - number
 *       - isStared
 *       - userId
 *     properties:
 *       name:
 *         type: string
 *       number:
 *         type: string
 *       isStared:
 *         type: boolean
 *       userId:
 *         type: integer
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *   Contacts:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Contact'
 */
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("contact", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    isStared: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },

    createdAt: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING,
      defaultValue: Date.now()
    },

    updatedAt: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING,
      defaultValue: Date.now()
    }
  });
  /*function for getting all contacts*/
  Contact.getAll = () => Contact.findAll();
  /**function for getting a contacts by user id*/
  Contact.getByUserId = userId =>
    Contact.findAll({
      where: {
        userId
      }
    });
  /* function for getting a specific contact*/
  Contact.getContact = (userId, contactId) =>
    Contact.findOne({
      where: {
        userId,
        id: contactId
      }
    });
  /*for creating a contact*/
  Contact.createContact = params =>
    Contact.create(params).then(contact => contact);

  Contact.updateContact = (userId, id, data) =>
    Contact.update(data, {
      where: {
        userId,
        id
      }
    }).then(() => Contact.findOne({ where: { id } }));

  Contact.details = contactId =>
    Contact.findOne({
      where: {
        id: contactId
      }
    });
  /*get all stared contacts*/
  Contact.getStared = (userId, isStared) =>
    Contact.findAll({
      where: {
        userId,
        isStared
      }
    });
  /*delete a contact*/
  Contact.delete = (userId, contactId) =>
    Contact.findOne({
      where: {
        userId,
        id: contactId
      }
    }).then(() => Contact.destroy({ where: { id: contactId } }));
  /**conatct association*/
  Contact.associate = models => {
    Contact.belongsTo(models.user, { as: "user" });
  };
  return Contact;
};
