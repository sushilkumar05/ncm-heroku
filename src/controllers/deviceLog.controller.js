const DeviceLogModel = require('../models/deviceLog.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class DeviceLogController {
    getAllDeviceLogs = async (req, res, next) => {
        let DeviceLogList = await DeviceLogModel.find();
        if (!DeviceLogList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: DeviceLogList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: DeviceLogList,
        })
    }

    getDeviceLogById = async (req, res, next) => {
        const deviceLog = await DeviceLogModel.findOne({ id: req.params.id });
        if (!deviceLog) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: deviceLog,
        })
    }

    createDeviceLog = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await DeviceLogModel.create(req.body);
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

    updateDeviceLog = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await DeviceLogModel.update(req.body, req.params.id);
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

    deleteDeviceLog = async (req, res, next) => {
        const result = await DeviceLogModel.delete(req.params.id);
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

module.exports = new DeviceLogController;