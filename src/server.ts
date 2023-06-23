// imports
import express from 'express';

// rest object
const app = express();
const PORT = 8080;

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1></h1>');
});

app.listen(PORT, () => {
  console.log(`Application is running in port number ${PORT}`);
});
