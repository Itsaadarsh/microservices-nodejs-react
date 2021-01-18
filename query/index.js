const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors());

const posts = {}

app.get('/posts', (req,res) => {
    res.send(posts)
})

app.post('/events', (req,res) => {
    const {type,data} = req.body
    console.log(req.body);
    if(post.type === 'PostCreated'){
        posts[post.id] = {id: post.id, title: post.title, comment: []}
    }
    
    if(post.type === 'CommentCreated'){
        posts.comment.push({id: post.id, content: post.content, postId: post.postId})
    }

    res.send({})

})

app.listen(4002, () => {
    console.log('Listening on 4002 (QUERY)');
})