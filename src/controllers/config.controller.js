const ConfigModel = require('../models/config.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class ConfigController {
    getAllConfigs = async (req, res, next) => {
        let ConfigList = await ConfigModel.find();
        if (!ConfigList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: ConfigList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: ConfigList,
        })
    }

    getConfigById = async (req, res, next) => {
        const config = await ConfigModel.findOne({ id: req.params.id });
        if (!config) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: config,
        })
    }

    createConfig = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await ConfigModel.create(req.body);
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

    updateConfig = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await ConfigModel.update(req.body, req.params.id);
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

    deleteConfig = async (req, res, next) => {
        const result = await ConfigModel.delete(req.params.id);
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

module.exports = new ConfigController;