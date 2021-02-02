const RoleDetailsModel = require('../models/roleDetails.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class RoleDetailsController {
    getAllRoleDetails = async (req, res, next) => {
        let RoleDetailsList = await RoleDetailsModel.find();
        if (!RoleDetailsList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: RoleDetailsList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: RoleDetailsList,
        })
    }

    getRoleDetailsById = async (req, res, next) => {
        const roleDetails = await RoleDetailsModel.find({ id: req.params.id });
        if (!roleDetails) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: [],
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: roleDetails,
        })
    }

    createRoleDetails = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await RoleDetailsModel.create(req.body);
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

    updateRoleDetails = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await RoleDetailsModel.update(req.body, req.params.id);
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

    deleteRoleDetails = async (req, res, next) => {
        const result = await RoleDetailsModel.delete(req.params.id);
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

module.exports = new RoleDetailsController;