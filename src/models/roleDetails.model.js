const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils')

class RoleDetailsModel {
    
    tableName = 'roleDetails';
    tableNameRoleEntity = 'roleEntity';

    find = async (params) => {
        const sql = `SELECT ${this.tableName}.*,
        ${this.tableNameRoleEntity}.entityName,
        ${this.tableNameRoleEntity}.id as roleEntityId
        FROM ${this.tableName}
        RIGHT JOIN ${this.tableNameRoleEntity} 
        ON ${this.tableName}.roleEntityId=${this.tableNameRoleEntity}.id
        AND ${this.tableName}.roleId = ${params.id}`

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

    create = async ({ roleId, roleEntityId, entityRead, entityAdd, entityUpdate, entityPrint, entityExport, entityDelete }) => {
        const sql = `INSERT INTO ${this.tableName}
        (roleId,roleEntityId,entityRead,entityAdd,entityUpdate,entityPrint,entityExport,entityDelete) VALUES (?,?,?,?,?,?,?,?)`;

        console.log("Create Quesry>>>>>> ", sql)
        const result = await query(sql, [roleId, roleEntityId, entityRead, entityAdd, entityUpdate, entityPrint, entityExport, entityDelete]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE roleDetails SET ${columnSet} WHERE id = ?`;
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

module.exports = new RoleDetailsModel;