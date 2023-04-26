const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Route to handle creating a new offer
app.post('/api/offers', (req, res) => {
  const { offer_title, offer_description, content, schedule, target, pricing } = req.body;

  // Validate the offer data
  if (!offer_title || !offer_description) {
    return res.status(400).json({ message: 'Offer title and description are required.' });
  }

  if (!content || !Array.isArray(content) || content.length === 0) {
    return res.status(400).json({ message: 'Offer content must be a non-empty array.' });
  }

  if (!schedule || typeof schedule !== 'object') {
    return res.status(400).json({ message: 'Offer schedule must be an object.' });
  }

  if (!pricing || !Array.isArray(pricing) || pricing.length === 0) {
    return res.status(400).json({ message: 'Offer pricing must be a non-empty array.' });
  }

  const offerId = uuid.v4();

  const newOffer = {
    offer_id: offerId,
    offer_title,
    offer_description,
    content,
    schedule,
    target,
    pricing
  };

  // Save the new offer to the data store
  // Example using an in-memory array
  offers.push(newOffer);

  // Return a success response
  res.status(201).json({ message: 'Offer created successfully.', offer: newOffer });
});

// Example data store using an in-memory array
const offers = [];

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
