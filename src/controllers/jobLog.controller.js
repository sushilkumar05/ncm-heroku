const JobLogModel = require('../models/jobLog.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class JobLogController {
    getAllJobLogs = async (req, res, next) => {
        let JobLogList = await JobLogModel.find();
        if (!JobLogList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: JobLogList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: JobLogList,
        })
    }

    getJobLogById = async (req, res, next) => {
        const jobLog = await JobLogModel.findOne({ id: req.params.id });
        if (!jobLog) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: jobLog,
        })
    }

    createJobLog = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await JobLogModel.create(req.body);
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

    updateJobLog = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await JobLogModel.update(req.body, req.params.id);
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

    deleteJobLog = async (req, res, next) => {
        const result = await JobLogModel.delete(req.params.id);
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

module.exports = new JobLogController;