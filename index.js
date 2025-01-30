import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

const uri =
  "mongodb+srv://mtushig01:LctrXsKjbYRCWZRz@cluster0.c7ofh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const db = await client.db("sample_mflix");
const collection = await db.collection("movies");

app.get("/task1", async (req, res) => {
  // select movies.id from movies limit 10

  const movie = await collection.findOne({
    title: { $eq: "The Great Train Robbery" },
  });

  res.send(movie);
});

app.listen(port, async () => {
  await client
    .connect()
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));

  console.log(`Example app listening on port ${port}`);
});
