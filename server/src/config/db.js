const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://paminh25:paminh25@clinic.yxhgxbl.mongodb.net/dental_clinic', {
      // Các tùy chọn kết nối mới
      useNewUrlParser: true, // Nếu sử dụng phiên bản driver cũ hơn 4.0.0
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error.message);
    process.exit(1); // Thoát với mã lỗi
  }
};

module.exports = connectDB;
