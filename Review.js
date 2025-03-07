const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    reviewText: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);