const OrganizationModel = require('../models/organization.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class OrganizationController {
    getAllOrganizations = async (req, res, next) => {
        let OrganizationList = await OrganizationModel.find();
        if (!OrganizationList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: OrganizationList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: OrganizationList,
        })
    }

    getOrganizationById = async (req, res, next) => {
        const organization = await OrganizationModel.findOne({ id: req.params.id });
        if (!organization) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: organization,
        })
    }

    createOrganization = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await OrganizationModel.create(req.body);
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

    updateOrganization = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await OrganizationModel.update(req.body, req.params.id);
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

    deleteOrganization = async (req, res, next) => {
        const result = await OrganizationModel.delete(req.params.id);
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

module.exports = new OrganizationController;