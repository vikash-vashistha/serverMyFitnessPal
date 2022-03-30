const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://vikash:spiderman@cluster0.bxhyu.mongodb.net/myFitnessPalDatabase?retryWrites=true&w=majority"
  );
}