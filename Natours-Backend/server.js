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

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
