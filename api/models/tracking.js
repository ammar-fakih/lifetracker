const db = require('../db');
const bcrypt = require('bcrypt');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

class Tracking {
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError('No email provided');
    }

    const query = `SELECT * FROM users WHERE email = $1`;

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }

  /**
   * @param {string} email
   * @param {object} info - to be logged in the database
   * @param {string} type - enum ('sleep_logs', 'nutrition_logs', 'exercises')
   */
  static async addToLog(email, data, type) {
    console.log(email);
    let requiredFields;
    const { id } = await this.fetchUserByEmail(email);

    if (type === 'sleep_logs') {
      requiredFields = ['startTime', 'endTime'];
    } else if (type === 'nutrition_logs') {
      requiredFields = ['name', 'category', 'quantity', 'calories', 'image_url'];
    } else if (type === 'exercises') {
      requiredFields = ['name', 'category', 'duration', 'intensity'];
    } else {
      throw new BadRequestError('Invalid type');
    }

    if (Object.keys(data).length > requiredFields.length) {
      throw new BadRequestError('Too many fields');
    }

    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing required field: ${field}`);
      }
    });

    const query = `INSERT INTO ${type} (user_id, ${Object.keys(data)})
    VALUES ($1,${Object.keys(data).map((key, id) => `$${id + 2}`)})
    RETURNING *`;

    console.log(query)

    const result = await db.query(query, [id, ...Object.values(data)]);

    return result.rows[0];
  }
}

module.exports = Tracking;
