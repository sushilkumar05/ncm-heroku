const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils')

class DashboardModel {
    tableUsers = 'users';
    tableVendor = 'vendor';
    tableDevices = 'devices';
    tableOrganization = 'organization';

    find = async (params = {}) => {
        // let sql = `SELECT * FROM ${this.tableName}`;

        let sql =
            `SELECT "users" tablename, COUNT(*) rows FROM ${this.tableUsers} 
        UNION 
        SELECT "vendor" tablename, COUNT(*) rows FROM ${this.tableVendor} 
        UNION 
        SELECT "Devices" tablename, COUNT(*) rows FROM ${this.tableDevices} 
        UNION 
        SELECT "organization" tablename, COUNT(*) rows FROM ${this.tableOrganization}`;


        console.log("sql>>>", sql)

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

    create = async ({ dashboardName, dashboardStatus, phoneCode, flag }) => {
        const sql = `INSERT INTO ${this.tableName}
        (dashboardName, dashboardStatus, phoneCode, flag) VALUES (?,?,?,?)`;

        console.log("Create Quesry>>>>>> ", sql)
        const result = await query(sql, [dashboardName, dashboardStatus, phoneCode, flag]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE dashboard SET ${columnSet} WHERE id = ?`;
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

module.exports = new DashboardModel;