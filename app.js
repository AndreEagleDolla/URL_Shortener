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

//asks db for particular document to see if it exists; returns obejct with array  all objects in db and count of objects in db
async function queryDB(queryID) {
  let result = { allDocs: "", count: Number };
  try {
    await client.connect();
    const database = client.db("url_shortener");
    const collection = database.collection("urls");
    result.allDocs = await collection.find().toArray();
    result.count = result.allDocs.length;
  } finally {
    await client.close();
    return result;
  }
}

function shortenURL() {
  let slug = "";
  let finalURL = {
    _id: 1,
    fullURL: "",
    shortenedURL: "",
  };
  let possible = "ABCDEFGHIJKLMNOPQRTUVabcdefghijklmnopqrstuvwxys123456789";
  let baseURL = "cp.gg";

  //gets a 5 char slug by getting a possible char from possible string by calculating ranodom number from length of string
  for (x = 0; x < 5; x++) {
    slug += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  shortURL = baseURL + "/" + slug;
  finalURL.shortenedURL = shortURL;
  return finalURL;
}
