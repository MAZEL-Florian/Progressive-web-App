require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./src/models/Post');

const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.APP_PORT || 8081; 
const dbUrl = process.env.MONGO_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connecté à MongoDB.'))
    .catch(err => console.error('Impossible de se connecter à MongoDB :', err));

app.use(express.json());

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).send({ message: 'Le titre et le contenu sont requis.' });
        }
        
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du post:', error);
        res.status(500).send({ message: 'Erreur lors de la sauvegarde du post', error: error.message });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
