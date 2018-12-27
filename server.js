const express = require('express')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const app = express()
const port = 5000

const dbUser = process.env.MONGO_USER
const dbPass = process.env.MONGO_PASS
const dbName = "better-piazza"
const dbURI = "mongodb://" + dbUser + ":" + dbPass + "@ds037488.mlab.com:37488/" + dbName
const collectionName = "posts"

app.get('/header', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.send('This is a response from the server located at http://localhost:5000')
})

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName)
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null)
    callback(docs)
  })
}

app.get('/posts', (req, res) => {
    MongoClient.connect(dbURI, function(err, client) {
        assert.equal(null, err)

        var db = client.db(dbName)

        console.log(new Date())
        db.collection(collectionName).find({}).toArray(function(err, result) {
            if (err) throw err
            console.log(new Date())
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            res.send(result)
            client.close()
        }) 
    })
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
