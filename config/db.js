const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://eko123:eko123@cluster0.p7vg66f.mongodb.net/tasks-api?retryWrites=true&w=majority"
    );
    console.log("DB Connected...", conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
