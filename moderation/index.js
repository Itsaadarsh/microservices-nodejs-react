const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log(data);
  if (type == 'CommentCreated') {
    const status = data.content.includes('fuck') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-ser:4005/events', {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003 (MODERATION)');
});
