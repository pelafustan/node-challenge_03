require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');

const db = require('./db');

const app = express();

const PORT = process.env.APP_PORT || 8080;

app.use(express.json());
app.use(cors());

app.post('/newPost', async (req, res) => {
    const { postTitle, postBody, postHeaderImage } = req.body;

    if (!postTitle || !postBody || !postHeaderImage) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const postId = nanoid();

    try {
        await db.query(
            'INSERT INTO posts (id, title, body, header_image) VALUES ($1, $2, $3, $4)',
            [postId, postTitle, postBody, postHeaderImage]
        );
        res.status(201).json({ message: 'Post created successfully!', postId: postId });
    } catch (err) {
        console.log('Error while inserting data:', err);
        res.status(500).json({ error: 'Something went wrong :c' });
    }
});

app.put('/posts/:id', async (req, res) => {
    const postId = req.params;
    const { postTitle, postBody, postHeaderImage } = req.body;

    if (!postTitle || !postBody || !postHeaderImage) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    try {
        await db.query(
            'UPDATE posts SET title=$2, body=$3, header_image=$4 WHERE id=$1',
            [postId, postTitle, postBody, postHeaderImage]
        );
        res.status(200).json({ message: 'Post updated successfully!', postId: postId });
    } catch (err) {
        console.log('Error while updating data:', err);
        res.status(500).json({ error: 'Something went wrong :c' });
    }

});

app.get('/posts', async (req, res) => {
    console.log(req);
    try {
        const result = await db.query('SELECT * FROM posts');
        res.status(200).json(result.rows);
    } catch (err) {
        console.log('Error fetching posts:', err);
        res.status(500).json({ error: 'Something went wrong :c' })
    }
});

app.listen(PORT, () => { console.log('Server running!') });
