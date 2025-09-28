const contact = require('../models/contact');

exports.createContact = async (req, res) => {
    try {
        const newContact = new contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error });
    }
};
