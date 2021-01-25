const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils')

class StateModel {
    tableName = 'state';
    tableNameCountry = 'country';

    find = async (params = {}) => {
        // let sql = `SELECT * FROM ${this.tableName}`;
        const sql = `SELECT *,
            ${this.tableNameCountry}.countryName 
            FROM ${this.tableName}
            INNER JOIN ${this.tableNameCountry} 
            ON state.countryId=${this.tableNameCountry}.id`

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)

        // sql += ` WHERE ${columnSet}`;
        // return await query(sql, [...values]);
        const result = await query(sql);
        console.log("result>>>", result)
        return result
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ stateName, stateStatus, countryId }) => {
        const sql = `INSERT INTO ${this.tableName}
        (stateName, stateStatus, countryId) VALUES (?,?,?)`;

        console.log("Create Quesry>>>>>> ", sql)
        const result = await query(sql, [stateName, stateStatus, countryId]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE state SET ${columnSet} WHERE id = ?`;
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

module.exports = new StateModel;