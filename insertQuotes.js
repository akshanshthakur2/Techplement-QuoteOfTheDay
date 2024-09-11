import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';


mongoose.connect('mongodb://localhost:27017/quoteApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const quoteSchema = new mongoose.Schema({
  text: String,
  author: String
});

const Quote = mongoose.model('Quote', quoteSchema);

async function insertQuotes() {
  await Quote.deleteMany({});
  const quotes = [];
  for (let i = 0; i < 100; i++) {
    quotes.push({ text: faker.lorem.sentence(), author: faker.person.fullName() });
  }
  await Quote.insertMany(quotes);
  console.log('Inserted 100 random quotes.');
  mongoose.connection.close();
}

insertQuotes();
