const Record = require('../models/recordModel')

exports.createRecord = async ( req, res ) => {
    const { value, content } = req.body
    try {
        const newRecord = new Record({value, content})
        const savedRecord = await newRecord.save()
        res.status(201).json(savedRecord)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getALlRecords = async ( req, res ) => {
    try {
        const records = await Record.find()
        res.json(records)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}