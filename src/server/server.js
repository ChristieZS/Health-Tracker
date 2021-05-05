var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var fs = require("fs");
const reactDom = require("react-dom");

app.use(express.json()) 

app.get('/', async function (req, res) {
    const uri = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect();
    res.send(await displayEntriesGet(client))
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

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at port party http://%s:%s", host, port)
})