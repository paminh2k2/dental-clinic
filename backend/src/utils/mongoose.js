const { mongo } = require("mongoose")

module.exports = {
    multipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: (mongoose) =>{
        return mongoose ? mongoose.toObject() : mongoose
    }
}