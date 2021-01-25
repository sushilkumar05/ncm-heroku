const OrgDevicesModel = require('../models/orgDevices.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class OrgDevicesController {
    getAllOrgDevicess = async (req, res, next) => {
        let OrgDevicesList = await OrgDevicesModel.find();
        if (!OrgDevicesList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: OrgDevicesList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: OrgDevicesList,
        })
    }

    getOrgDevicesById = async (req, res, next) => {
        const orgDevices = await OrgDevicesModel.findOne({ id: req.params.id });
        if (!orgDevices) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: orgDevices,
        })
    }

    createOrgDevices = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await OrgDevicesModel.create(req.body);
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

    updateOrgDevices = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await OrgDevicesModel.update(req.body, req.params.id);
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

    deleteOrgDevices = async (req, res, next) => {
        const result = await OrgDevicesModel.delete(req.params.id);
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

module.exports = new OrgDevicesController;