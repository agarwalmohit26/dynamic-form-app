const Form = require('../models/Form');
const Response = require('../models/Response');

// Create a new form
const createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create form' });
  }
};

// Submit form responses
const submitForm = async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

// Get all forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get forms' });
  }
};

module.exports = { createForm, submitForm, getForms };
