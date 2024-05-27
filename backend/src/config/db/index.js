const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://paminh25:paminh25@blog.xaaqgoh.mongodb.net/dental_clinic_dev');
        console.log('Connect successfully!!!');
    } catch(err) {
        console.log("Connect Failure!")
    }
}

module.exports = {connect}