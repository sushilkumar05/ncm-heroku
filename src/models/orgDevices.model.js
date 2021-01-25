const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils')

class OrgDevicesModel {
    tableName = 'orgDevices';
    tableNameDevices = 'devices'
    find = async (params = {}) => {
        // let sql = `SELECT * FROM ${this.tableName}`;
        const sql = `SELECT *,
        ${this.tableNameDevices}.deviceModel as model
        FROM ${this.tableName}
        INNER JOIN ${this.tableNameDevices} 
        ON ${this.tableName}.deviceId=${this.tableNameDevices}.id`

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

    create = async ({ deviceType,deviceId,deviceDescription,deviceModel,deviceCode,deviceLocation,deviceIP,deviceCredentials,deviceConnectionType,deviceStatus }) => {
        const sql = `INSERT INTO ${this.tableName}
        (deviceType,deviceId,deviceDescription,deviceModel,deviceCode,deviceLocation,deviceIP,deviceCredentials,deviceConnectionType,deviceStatus) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        console.log("Create Quesry>>>>>> ", sql)
        const result = await query(sql, [deviceType,deviceId,deviceDescription,deviceModel,deviceCode,deviceLocation,deviceIP,deviceCredentials,deviceConnectionType,deviceStatus]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE orgDevices SET ${columnSet} WHERE id = ?`;
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

module.exports = new OrgDevicesModel;