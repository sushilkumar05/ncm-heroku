const ReportModel = require('../models/report.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class ReportsController {
    getAllReports = async (req, res, next) => {
        let ReportsList = await ReportModel.find();
        if (!ReportsList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: ReportsList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: ReportsList,
        })
    }

    getReportById = async (req, res, next) => {
        const reports = await ReportModel.findOne({ id: req.params.id });
        if (!reports) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: reports,
        })
    }

    createReport = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await ReportModel.create(req.body);
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

    updateReport = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await ReportModel.update(req.body, req.params.id);
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

    deleteReport = async (req, res, next) => {
        const result = await ReportModel.delete(req.params.id);
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

module.exports = new ReportsController;