const mongoose = require('mongoose');

const staffemployeetypeSchema = mongoose.Schema({
  staffEmployeeType: {
    type: String,
    enum: ['Delivery Staff', 'Store Staff', 'Owner'],
  },
});

module.exports = mongoose.model('masterstafftype', staffemployeetypeSchema);
