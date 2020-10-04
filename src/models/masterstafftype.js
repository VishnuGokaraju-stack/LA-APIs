const mongoose = require('mongoose');

const staffemployeetypeSchema = mongoose.Schema({
  staffEmployeeType: {
    type: String,
    enum: ['Store Boy', 'Store Owner', 'Delivery Boy'],
  },
});

module.exports = mongoose.model('masterstafftype', staffemployeetypeSchema);
