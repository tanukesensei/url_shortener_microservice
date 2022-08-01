require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const isUrl = require('is-url');

// Basic Configuration
const port = process.env.PORT || 3000;

const urlToShort = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:id', (req, res) => {
  const {id} = req.params;
  res.redirect( urlToShort[parseInt(id) - 1] );
});

app.post('/api/shorturl', (req, res) => {
  const {url} = req.body
  console.log(url)
  
  if(!isUrl(url)){
    res.json({ error: 'invalid url' });
  }
    urlToShort.push(url);
    res.json({ original_url: url, short_url: urlToShort.length });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
