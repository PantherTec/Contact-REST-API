/* eslint consistent-return: 0 */
import HTTPStatus from "http-status";

const { contact: Contact } = require("../../db/models");

class ContactController {
  static errorResponse(err, res) {
    const error = err.mapped
      ? Object.values(err.mapped())
      : `an error occurred ${err}`;
    res
      .status(HTTPStatus.BAD_REQUEST)
      .json(Object.assign({}, { success: false }, { error }));
  }
  /**
   * @swagger
   * /api/contacts:
   *   get:
   *     description: Retrieve the logged in user's full list of contacts
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         type: object
   *         description: list contacts success
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Contact'
   *       50x:
   *         description: listing contacts failed
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       401:
   *         description: Listing contacts failed
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */

  static async index(req, res) {
    const fetchContacts = userId => Contact.getByUserId(userId);
    try {
      const contactList = await fetchContacts(req.userId);
      if (contactList) {
        res.status(201).json({
          success: true,
          data: contactList
        });
      } else {
        res
          .status(401)
          .json({ success: false, data: "this user doesn't have any contact" });
      }
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   get:
   *     description: show one of the logged in user's contact
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         type: object
   *         description: contact was succesfully fetched
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Contact'
   *       50x:
   *         description: error while fetching contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       401:
   *         description: error while fetching contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async show(req, res) {
    try {
      const fetchDetails = (userId, contactId) =>
        Contact.getContact(userId, contactId);
      const contact = await fetchDetails(req.userId, req.params.id);
      if (contact) {
        res.status(201).json({
          success: true,
          data: contact
        });
      } else {
        res
          .status(401)
          .json({ success: false, data: "this contact doesnt exist" });
      }
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }

  /**
   * @swagger
   * /api/contacts:
   *   post:
   *     description: Create a new contact
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: contacts
   *         description: Contact object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Contact'
   *     responses:
   *       200:
   *         type: object
   *         description: create was succesfully created
   *         required:
   *           -success
   *           -data
   *         properties:
   *          success:
   *            type: boolean
   *            default: true
   *          data:
   *           $ref: '#/definitions/Contact'
   *       50x:
   *         description: create contact error
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       401:
   *           description: create contact error
   *           schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async create(req, res) {
    try {
      const contact = await Contact.createContact({
        name: req.body.name,
        number: req.body.number,
        userId: req.userId
      });
      res.status(200).json({ success: true, data: contact });
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }

  static async stared(req, res) {
    try {
      const getStaredContacts = (userId, isStared) =>
        Contact.getStared(userId, isStared);
      const staredContacts = await getStaredContacts(req.userId, true);
      if (staredContacts) {
        return res.status(200).json({
          success: true,
          data: staredContacts
        });
      }
      return res.status(200).json({
        success: false,
        message: "user does not have any stared contact"
      });
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}/star:
   *   put:
   *     description: star contact
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     parameters:
   *         - name: id
   *           description: id of contact
   *           required: true
   *           in: path
   *     responses:
   *       200:
   *         type: object
   *         description: star contact was succesful
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Contact'
   *       50x:
   *         description: error while starring contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       400:
   *         description: error while starring contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async star(req, res) {
    try {
      const contact = await Contact.updateContact(req.userId, req.params.id, {
        isStared: true
      });
      if (contact) {
        res.status(201).json({
          success: true,
          data: contact
        });
      } else {
        res
          .status(401)
          .json({ success: false, data: "failed to update contact" });
      }
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   delete:
   *     description: delete a contact
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id of the contact
   *         required: true
   *         type: number
   *         in: path
   *     responses:
   *       200:
   *         type: object
   *         description: contact was successfully deleted
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Contact'
   *       50x:
   *         description: error while updating contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       400:
   *         description: error while updating contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async delete(req, res) {
    try {
      const deleteContact = (userId, contactId) =>
        Contact.delete(userId, contactId);
      await deleteContact(req.userId, req.params.id);
      res.status(202).json({ success: true, data: `contact has been deleted` });
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }

  /**
   * @swagger
   * /api/contacts/{id}:
   *   put:
   *     description: edit contact
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: id of the contact
   *         required: true
   *         type: number
   *         in: path
   *     responses:
   *       200:
   *         type: object
   *         description: contact update was succesful
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Contact'
   *       50x:
   *         description: error while updating contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       400:
   *         description: error while updating contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async update(req, res) {
    try {
      const updateContact = await Contact.updateContact(
        req.userId,
        req.params.id,
        req.body
      );
      if (updateContact) {
        res.status(201).json({
          success: true,
          data: updateContact
        });
      } else {
        res
          .status(401)
          .json({ success: false, data: "contact failed to update" });
      }
    } catch (error) {
      ContactController.errorResponse(error, res);
    }
  }
}
export default ContactController;
