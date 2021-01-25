const RoleEntityModel = require('../models/roleEntity.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class RoleEntityController {
    getAllRoleEntitys = async (req, res, next) => {
        let RoleEntityList = await RoleEntityModel.find();
        if (!RoleEntityList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: RoleEntityList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: RoleEntityList,
        })
    }

    getRoleEntityById = async (req, res, next) => {
        const roleEntity = await RoleEntityModel.findOne({ id: req.params.id });
        if (!roleEntity) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: roleEntity,
        })
    }

    createRoleEntity = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await RoleEntityModel.create(req.body);
        if (!result) {
            return res.send({
                success: false,
                message: 'Something went wrong',
                Error: 'Something went wrong',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record Created Successfully.',
            Error: null,
            ResponsePacket: result,
        })
    }

    updateRoleEntity = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await RoleEntityModel.update(req.body, req.params.id);
        if (!result) {
            return res.send({
                success: false,
                message: 'Something went wrong',
                Error: 'Something went wrong',
                ResponsePacket: {},
            })
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Record not found' :
            affectedRows && changedRows ? 'Record updated successfully' : 'Updated faild';

        return res.send({
            success: true,
            message: message,
            ResponsePacket: info,
        })
    }

    deleteRoleEntity = async (req, res, next) => {
        const result = await RoleEntityModel.delete(req.params.id);
        if (!result) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }
        return res.send({
            success: true,
            message: 'Record has been deleted',
            ResponsePacket: {},
        })
    }

    checkValidation = (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send({
                success: false,
                message: 'Validation faild',
                Error: 'Validation faild',
                ResponsePacket: {},
            })
        }
    }
}

module.exports = new RoleEntityController;