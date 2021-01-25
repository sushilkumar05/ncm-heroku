const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils')

class JobLogModel {
    tableName = 'jobLog';
    tableNameJobMaster = 'jobMaster'
    find = async (params = {}) => {
        // let sql = `SELECT * FROM ${this.tableName}`;
        const sql = `SELECT *,
        ${this.tableNameJobMaster}.jobName
        FROM ${this.tableName}
        INNER JOIN ${this.tableNameJobMaster} 
        ON ${this.tableName}.jobId=${this.tableNameJobMaster}.id`

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

    create = async ({ jobLogDateTime,jobLogMessage,jobId }) => {
        const sql = `INSERT INTO ${this.tableName}
        (jobLogDateTime,jobLogMessage,jobId) VALUES (?,?,?)`;

        console.log("Create Quesry>>>>>> ", sql)
        const result = await query(sql, [jobLogDateTime,jobLogMessage,jobId]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE jobLog SET ${columnSet} WHERE id = ?`;
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

module.exports = new JobLogModel;