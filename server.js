const express = require('express')
const fs = require('fs');
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.send('This is a response from the server located at http://localhost:5000')
})

app.get('/posts', (req, res) => {
    var data = fs.readFileSync('data/posts.json', 'utf8');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.send(data);
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))
