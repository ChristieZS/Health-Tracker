var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var fs = require("fs");
const reactDom = require("react-dom");
var bodyParser = require('body-parser')
var cors = require('cors');
const fetch = require("node-fetch");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())
// app.use(cors({ origin: true, credentials: true }));


app.get('/get', async function (req, res) {
    const uri = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect();
    res.send(await displayEntriesGet(client))
})  

app.post('/post', async function (req, res) {
    const animalName = req.body.name
    if(!animalName){
        res.send('Need to provide a cute animal name')
        return
    }
    await insertEntries(animalName)

    console.log(req.body)
    res.sendStatus(200)
})

app.post('/add', async function (req, res) {
    res.send('into /add')

    var url = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("health-tracker");
        var myobj = req.body;
        dbo.collection("patients").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted with... ");
            console.log(req.body);
            db.close();
        });
    });
    
    console.log("end /add")
})


app.get('/view', async function (req, res) {
    const url = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("health-tracker");
        dbo.collection("patients").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
        });
    });

    console.log("end /view")
})


//Displays Entries (GET)
async function displayEntriesGet(client) {
    
    var url = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("health-tracker");
      dbo.collection("patients").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);    
        db.close();
        return result
      });
    });
}

async function insertEntries(animalName) {
    var url = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("health-tracker");
        var myobj = { firstname: animalName, address: "93 Rainbow Avenue" };
        dbo.collection("patients").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at port party http://%s:%s", host, port)
})