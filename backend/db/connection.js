const mongoose = require("mongoose");

const databaseconnection = async (url) => {
  try {
    const connection = await mongoose.connect(url, { autoIndex: true });
    return console.log(
      "Database connected ! host : ",
      connection.connection.host
    );
  } catch (error) {
    console.log("Error connecting to MongoDb database: " + error.message);
    process.exit(1);
  }
};

module.exports = databaseconnection;
