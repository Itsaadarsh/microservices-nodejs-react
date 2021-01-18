const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
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

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002 (QUERY)');
});
