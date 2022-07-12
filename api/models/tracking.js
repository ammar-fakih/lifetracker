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
    let dbName;
    const { id } = await this.fetchUserByEmail(email);

    if (type === 'sleep') {
      dbName = 'sleep_logs';
      requiredFields = ['start_time', 'end_time'];
    } else if (type === 'nutrition') {
      dbName = 'nutrition_logs';
      requiredFields = [
        'name',
        'category',
        'quantity',
        'calories',
        'image_url',
      ];
    } else if (type === 'exercise') {
      dbName = 'exercises';
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

    const query = `
    INSERT INTO   ${dbName} (user_id, ${Object.keys(data)})
    VALUES        ($1,${Object.keys(data).map((key, id) => `$${id + 2}`)})
    RETURNING     *
    `;

    console.log(query);

    const result = await db.query(query, [id, ...Object.values(data)]);

    return result.rows[0];
  }

  static async fetchLogs(email, type) {
    switch (type) {
      case 'sleep':
        var dbName = 'sleep_logs';
        break;
      case 'nutrition':
        var dbName = 'nutrition_logs';
        break;
      case 'exercise':
        var dbName = 'exercises';
        break;
      default:
        throw new BadRequestError('Invalid type');
    }
    const { id } = await this.fetchUserByEmail(email);

    const query = `SELECT * FROM ${dbName} WHERE user_id = $1`;

    const result = await db.query(query, [id]);

    return result.rows;
  }
}

module.exports = Tracking;
