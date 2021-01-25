const UserRolesMappingModel = require('../models/userRolesMapping.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserRolesMappingController {
    getAllUserRolesMappings = async (req, res, next) => {
        let UserRolesMappingList = await UserRolesMappingModel.find();
        if (!UserRolesMappingList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: UserRolesMappingList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: UserRolesMappingList,
        })
    }

    getUserRolesMappingById = async (req, res, next) => {
        const userRolesMapping = await UserRolesMappingModel.findOne({ id: req.params.id });
        if (!userRolesMapping) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: userRolesMapping,
        })
    }

    createUserRolesMapping = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await UserRolesMappingModel.create(req.body);
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

    updateUserRolesMapping = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await UserRolesMappingModel.update(req.body, req.params.id);
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

    deleteUserRolesMapping = async (req, res, next) => {
        const result = await UserRolesMappingModel.delete(req.params.id);
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

module.exports = new UserRolesMappingController;