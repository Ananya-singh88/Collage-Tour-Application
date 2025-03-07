const Student = require('./models/Student');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const student = await Student.findOne({ username, password });
        if (student) {
            res.status(200).json({ message: 'Login successful', student });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};