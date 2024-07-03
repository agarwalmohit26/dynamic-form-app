const express = require('express');
const { createForm, submitForm, getForms } = require('../controllers/formController');

const router = express.Router();

router.post('/create', createForm);
router.post('/submit', submitForm);
router.get('/', getForms);

module.exports = router;
