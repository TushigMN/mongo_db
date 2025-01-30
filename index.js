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
  const { title } = req.query;

  const movie = await collection.findOne({
    title: { $eq: title },
  });

  res.send(movie);
});

app.get("/task2", async (req, res) => {
  const { genre, page = 0, limit = 0 } = req.query;

  const movies = await collection
    .find({ genres: { $eq: genre } })
    .project({ title: 1, genres: 1 })
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .toArray();

  res.send(movies);
});

app.get("/task3", async (req, res) => {
  const { imdbId } = req.query;

  const movie = await collection.findOne({
    "imdb.id": { $eq: parseInt(imdbId) },
  });

  res.send(movie);
});

app.get("/task4", async (req, res) => {
  const { year = 1900, page = 0, limit = 0 } = req.query;

  const movies = await collection
    .find({ year: { $gt: parseInt(year) } })
    .skip((page - 1) * parseInt(limit))
    .toArray();

  res.send(movies);
});

app.get("/task5", async (req, res) => {
  const { ratings = [7.4, 6.5], page = 0, limit = 0 } = req.query;

  const movies = await collection
    .find({ "imdb.rating": { $in: ratings } })
    .skip((page - 1) * parseInt(limit))
    .toArray();

  res.send(movies);
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
