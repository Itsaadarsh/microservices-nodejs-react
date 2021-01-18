const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  try {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        status: 'pending',
        postId: req.params.id,
      },
    });

    res.status(201).send(comments);
  } catch (err) {
    console.log(err);
  }
});

app.post('/events', async (req, res) => {
  console.log('COMMENTED');

  const { type, data } = req.body;
  if (type == 'CommentModerated') {
    const updateComment = commentsByPostId[data.postId].find(comment => comment.id === data.id);
    updateComment.status = data.status;
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { ...updateComment, postId: data.postId },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001 (COMMENTS)');
});
