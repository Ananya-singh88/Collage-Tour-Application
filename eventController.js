const Event = require('./models/Event');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.addEvent = async (req, res) => {
    const { name, date, location, participants } = req.body;
    try {
        const newEvent = new Event({ name, date, location, participants });
        await newEvent.save();
        res.status(201).json({ message: 'Event added', event: newEvent });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, location, participants } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, { name, date, location, participants }, { new: true });
        res.status(200).json({ message: 'Event updated', event: updatedEvent });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};