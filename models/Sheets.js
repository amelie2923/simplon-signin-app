const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const SheetsSchema = mongoose.Schema({
    learner: {
      type: Array
    },
    date: {
      type: Array
    },
    former: {
      type: Array
    },
    templateId: {
      type: ObjectId,
      require: true, 
      ref: 'templates'
  },
}, { timestamps: true });

module.exports = mongoose.model('Sheets', SheetsSchema);