const Service = require('../models/serviceModel');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createService = async (req, res) => {
    const { service, price, note } = req.body;
    try {
        const newService = new Service({ service, price, note });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Update profile
exports.updateService = async (req, res) => {
    const { service, price, note } = req.body;
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { service, price, note },
            { new: true }
        );
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
