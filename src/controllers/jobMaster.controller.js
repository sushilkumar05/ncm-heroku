const JobMasterModel = require('../models/jobMaster.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class JobMasterController {
    getAllJobMasters = async (req, res, next) => {
        let JobMasterList = await JobMasterModel.find();
        if (!JobMasterList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: JobMasterList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: JobMasterList,
        })
    }

    getJobMasterById = async (req, res, next) => {
        const jobMaster = await JobMasterModel.findOne({ id: req.params.id });
        if (!jobMaster) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: jobMaster,
        })
    }

    createJobMaster = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await JobMasterModel.create(req.body);
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

    updateJobMaster = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await JobMasterModel.update(req.body, req.params.id);
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

    deleteJobMaster = async (req, res, next) => {
        const result = await JobMasterModel.delete(req.params.id);
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

module.exports = new JobMasterController;