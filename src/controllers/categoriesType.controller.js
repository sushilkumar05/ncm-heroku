const CategoriesTypeModel = require('../models/categoriesType.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class CategoriesTypeController {
    getAllCategoriesTypes = async (req, res, next) => {
        let CategoriesTypeList = await CategoriesTypeModel.find();
        if (!CategoriesTypeList.length) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: CategoriesTypeList,
            })
        }

        return res.send({
            success: true,
            message: 'Record List',
            Error: 'Record List',
            ResponsePacket: CategoriesTypeList,
        })
    }

    getCategoriesTypeById = async (req, res, next) => {
        const categoriesType = await CategoriesTypeModel.findOne({ id: req.params.id });
        if (!categoriesType) {
            return res.send({
                success: false,
                message: 'Record not found',
                ResponsePacket: {},
            })
        }

        return res.send({
            success: true,
            message: 'Record',
            ResponsePacket: categoriesType,
        })
    }

    createCategoriesType = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await CategoriesTypeModel.create(req.body);
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

    updateCategoriesType = async (req, res, next) => {
        // this.checkValidation(req, res);
        const result = await CategoriesTypeModel.update(req.body, req.params.id);
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

    deleteCategoriesType = async (req, res, next) => {
        const result = await CategoriesTypeModel.delete(req.params.id);
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

module.exports = new CategoriesTypeController;