import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quoteApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Quote schema
const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
});

// Create a model from the schema
const Quote = mongoose.model('Quote', quoteSchema);

// API route to fetch all quotes
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).send('Error fetching quotes');
  }
});

// Add this route in your server.js
app.get('/quote-of-the-day', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random);
    res.json(randomQuote);
  } catch (error) {
    res.status(500).send('Error fetching random quote');
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
