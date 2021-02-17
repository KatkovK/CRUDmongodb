const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoClient = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});

let dbClient;

mongoClient.connect((err, client) => {
  if (err) { throw err}
  dbClient = client;
  app.locals.collection = client.db('testdb').collection('users');

  app.listen(8080, () => console.log('start server 8080'));

});

app.get('/users', (req, res) => {
  const collection = req.app.locals.collection;
  collection.find().toArray((err, data) => {
     if (err) {
       res.status(404).send('Not found');
      }
      res.send(data);
  });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const collection = req.app.locals.collection;

    collection.findOneAndDelete({_id: objId(id)}, (err, result) => {
      if (err) {
        res.status(404).send('Not found');
       }

       res.send(result);
    });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const collection = req.app.locals.collection;

    collection.findOneAndUpdate(
      {_id: objId(id)},
      {
        $set: {
          name: body.name,
          age: body.age
        }
      },
      {
        returnOriginal: false
      },
       (err, user) => {
      if (err) {
        res.status(404).send('Not found');
       }

       res.send(user);
    });
});

app.post('/users/add', (req, res) => {
  const body = req.body;
  const collection = req.app.locals.collection;

  collection.insertOne(body, (err, result) => {
    if (err) {
      res.status(404).send('Not found');
     }

     res.send(result.ops);
  });
});

process.on('SIGINT', () => {
   dbCclient.close();
   process.exit();
});

