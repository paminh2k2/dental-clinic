const Revenue = require('../models/revenueModel')

// Create revenue
exports.createRevenue = async ( req, res ) => {
    const { date, data } = req.body
    try {
        const existingRevenue = await Revenue.findOne({ date })
        if( existingRevenue ) {
            const length = existingRevenue.length
            if( length < data.day ) {
                existingRevenue.dataSet = [...existingRevenue.dataSet, data]
            } else {
                existingRevenue.dataSet[ length - 1 ].total += data.total
            }
            const updatedRevenue = await existingRevenue.save()
            res.status(200).json(updatedRevenue)
        } else {
            const newRevenue = new Revenue({ date, dataSet })
            const savedRevenue = await newRevenue.save()
            res.status(201).json(savedRevenue)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Get all revenue
exports.getAllRevenues = async ( req, res ) => {
    try {
        const revenues = await Revenue.find()
        res.json(revenues)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}