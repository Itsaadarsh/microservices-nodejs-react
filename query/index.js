const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    posts[data.id] = { id: data.id, title: data.title, comment: [] };
  }

  if (type === 'CommentCreated') {
    posts[data.postId].comment.push({
      id: data.id,
      content: data.content,
      status: data.status,
    });
  }

  if (type === 'CommentUpdated') {
    const updateComment = posts[data.postId].comment.find(com => com.id === data.id);
    updateComment.status = data.status;
    updateComment.content = data.content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002 (QUERY)');
  const res = await axios.get('http://event-bus-ser:4005/events');
  res.data.forEach(event => {
    console.log(`HANDLING ${event.type}`);
    handleEvents(event.type, event.data);
  });
});
