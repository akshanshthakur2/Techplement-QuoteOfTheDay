import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/quoteApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).send('Error fetching quotes');
  }
});

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


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
