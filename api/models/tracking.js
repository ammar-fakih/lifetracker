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

  static async fetchActivities(email) {
    const { id } = await this.fetchUserByEmail(email);

    const query1 = `
    SELECT    sum(duration) AS total_duration,
              avg(duration) AS avg_exercise_duration,
              to_char(avg(end_time - start_time), 'HH24') AS avg_sleep_time,
              avg(intensity) AS avg_intensity,
              to_char(sum(end_time - start_time), 'HH24') AS total_sleep_time
    FROM      exercises
    JOIN      sleep_logs ON sleep_logs.user_id = exercises.user_id
    WHERE     exercises.user_id = $1`;
    const result = await db.query(query1, [id]);

    return result.rows[0];
  }

  static async deleteLog(email, logId, type) {
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

    const query = `DELETE FROM ${dbName} WHERE id = $1 AND user_id = $2`;

    const result = await db.query(query, [logId, id]);

    return result.rows[0];
  }
}

module.exports = Tracking;
