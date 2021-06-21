const mongoose = require('mongoose');
const dotenv = require('dotenv');
////  Environment Variables ////
dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env); // Deafault node applications environmental

// Connecting Atlas DB with mongoose
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((/* con */) => {
    // console.log(con.connections);
    console.log('DB connenction sucessful!');
  });

//// Creating a Simple Tour Model ////
// Schema => blueprint
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
// Model of schema
const Tour = mongoose.model('Tour', tourSchema);

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
