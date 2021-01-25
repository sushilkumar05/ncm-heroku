const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class UserModel {
    tableName = 'users';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        console.log("columnSet:", columnSet)

        // sql += ` WHERE ${columnSet}`;
        // return await query(sql, [...values]);
        return await query(sql);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ username, password, usersFirstName, usersLastName, email, role = Role.SuperUser, phone, website, addressId, salutation }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, password, usersFirstName, usersLastName, email, role, phone, website, addressId, salutation) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        console.log("Create Quesry>>>>>> ", sql)
        const result = await query(sql, [username, password, usersFirstName, usersLastName, email, role, phone, website, addressId, salutation]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE users SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;