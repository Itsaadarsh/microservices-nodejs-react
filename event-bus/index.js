const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const eventData = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  eventData.push(event);
  axios.post('http://posts-clusterip-ser:4000/events', event).catch(err => console.log(err.message));
  // axios.post('http://localhost:4001/events', event).catch(err => console.log(err.message));
  // axios.post('http://localhost:4002/events', event).catch(err => console.log(err.message));
  // axios.post('http://localhost:4003/events', event).catch(err => console.log(err.message));

  res.send({ status: 'Done' });
});

app.get('/events', (req, res) => {
  res.send(eventData);
});

app.listen(4005, () => {
  console.log('Listening on 4005 (EVENT-BUS)');
});
