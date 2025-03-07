const Review = require('./models/Review');

exports.submitReview = async (req, res) => {
    const { studentName, reviewText } = req.body;
    try {
        const newReview = new Review({ studentName, reviewText });
        await newReview.save();
        res.status(201).json({ message: 'Review submitted', review: newReview });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};