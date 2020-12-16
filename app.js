const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function insertURL(documentToInsert) {
  try {
    await client.connect();
    const database = client.db("url_shortener");
    const collection = database.collection("urls");
    await collection.insertOne(documentToInsert);
    console.log("Inserted new document");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function queryDB(queryID) {
  try {
    await client.connect();
    const database = client.db("url_shortener");
    const collection = database.collection("urls");
    let result = await collection.findOne({
      _id: 2,
    });

    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return;
}

function shortenURL() {
  let slug = "";
  let finalURL = {
    _id: 2,
    fullURL: "i'm not",
    shortenedURL: "gay",
  };
  let possible = "ABCDEFGHIJKLMNOPQRTUVabcdefghijklmnopqrstuvwxys123456789";
  let baseURL = "cp.gg";

  //gets a 5 char slug by getting a possible char from possible string by calculating ranodom number from length of string
  for (x = 0; x < 5; x++) {
    slug += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  shortURL = baseURL + "/" + slug;
  return finalURL;
}

function main() {
  let finalURL = shortenURL();
  console.log(finalURL);
  insertURL(finalURL);
  queryDB(1);
  return;
}

main();
