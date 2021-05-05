var {MongoClient} = require("mongodb");
var express = require('express');
var app = express();
var fs = require("fs");
const reactDom = require("react-dom");

app.use(express.json()) 

app.get('/', async function (req, res) {
    const uri = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect();
const a  = await displayEntriesGet(client)
console.log(a)
    res.send(a)
 })

async function main() {
    const uri = "mongodb://adminxt:testtest123@health-tracker-cluster-shard-00-00.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-01.uafx8.mongodb.net:27017,health-tracker-cluster-shard-00-02.uafx8.mongodb.net:27017/test?replicaSet=atlas-114xl3-shard-0&ssl=true&authSource=admin"
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        await client.connect();
        await listDatabases(client);

        //Collection creation data and execution
        // await createEntry(client,
        //     {
        //         firstname: "fghyfgjhftgh",
        //         surname: "suurrnm",
        //         animal: "guinea pig",
        //         owner: "John Jane",
        //         address: "delete address",
        //         contactnumber : "555 333 999",
        //         records:
        //         [{
        //             examination: "check up",
        //             description: "tender back left leg, xray",
        //             medication: "loxicom"
        //         }]
        //     }
        // );

        //Updates an entry
        await updateEntryByID(client, 'Bean', { surname: "Bean"});

        //Updates multiple entries
        await updateMultipleEntries(client, '6 rose street, venus', { address: "6 rose street, pluto"});

        //Deletes an entry
        await deleteEntry(client, 'deleteme');

        //Deletes multiple entries
        await deleteMultipleEntries(client, 'delete address');

        //Displays all entries in the collection
        await displayEntries(client);
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close();
    }
}

//Lists databases
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//Creates a collection
async function createEntry(client, newListing){
    const result = await client.db("health-tracker").collection("patients").insertOne(newListing);
    console.log(`New entry created with the following id: ${result.insertedId}`);
}

//Displays all entries
async function displayEntries(client) {
    const collectionSelect = client.db("health-tracker").collection("patients").find()
    const results = await collectionSelect.toArray();
    if (results.length > 0) {
        console.log(`Found entries:`);
        results.forEach((result, i) => {
            console.log();
            console.log(`id: ${result._id}`);
            console.log(`first name: ${result.firstname}`);
            console.log(`surname: ${result.surname}`);
            console.log(`animal: ${result.animal}`);
            console.log(`owner: ${result.owner}`);
            console.log(`address: ${result.address}`);
            console.log(`contact number: ${result.contactnumber}`);
        });
    }
    else {
        console.log(`No entries`);
    }
}

//Displays Entries (GET)
async function displayEntriesGet(client) {
    const db = client.db("health-tracker")
    const res = await db.collection("patients").find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      });

    // const res = [{a: 'HELLO'}]
    // const res = results.map((el)=> {
    //     return {
    //         name: el.firstname
    //     }
    // })
    // results.forEach((result) => {
    //     res.push({
    //         name: `${result.firstname} ${result.surname}`,
    //         animal: result.animal
    //     })
       
    //     // console.log();
    //     // console.log(`id: ${result._id}`);
    //     // console.log(`first name: ${result.firstname}`);
    //     // console.log(`surname: ${result.surname}`);
    //     // console.log(`animal: ${result.animal}`);
    //     // console.log(`owner: ${result.owner}`);
    //     // console.log(`address: ${result.address}`);
    //     // console.log(`contact number: ${result.contactnumber}`);
    // });

    return res
}

//Updates ONE entry
async function updateEntryByID(client, idOfEntry, updatedEntry) {
    const result = await client.db("health-tracker").collection("patients")
                        .updateOne({ surname: idOfEntry }, { $set: updatedEntry });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//Updates MULTIPLE entries
async function updateMultipleEntries(client, addressOfEntry, updatedEntry) {
    const result = await client.db("health-tracker").collection("patients")
                        .updateMany({ address: addressOfEntry}, { $set: updatedEntry });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//Delete ONE entry
async function deleteEntry(client, nameOfPet) {
    const result = await client.db("health-tracker").collection("patients")
            .deleteOne({ surname: nameOfPet });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

//Delete MANY entries
async function deleteMultipleEntries(client, addressOfEntry) {
    const result = await client.db("health-tracker").collection("patients")
        .deleteMany({ "address": addressOfEntry });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at port party http://%s:%s", host, port)
   //main().catch(console.error);
})